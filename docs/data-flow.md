# RevelApp 管理ポータル データフロー v0.1

Next.js 管理UIと WordPress(REST API) の連携を定義するためのメモです。  
今後の実装フェーズでは、ここに記載したエンドポイントと型を基準にしてデータ取得処理を組み込みます。

## 全体アーキテクチャ

```
利用施設のブラウザ
        │
        ▼
Next.js (App Router, SSR)
        │ fetch
        ▼
WordPress (wp-json/revel/v1/* エンドポイント)
        │
        ▼
WP DB (標準テーブル + カスタムテーブル)
```

- WordPress 側で施設アカウント認証 / facility_id 付与
- Next.js は SSR(Server Component)から facility_id 付きで WP API を呼び出す
- レスポンスは TypeScript で定義した型にマッピング → 各ページへ供給

## エンドポイント案

| ページ | HTTP Method | WP Endpoint (例) | 説明 |
| ------ | ----------- | ---------------- | ---- |
| ホーム | GET | `/wp-json/revel/v1/home-summary?facility_id={id}` | 契約状況、利用状況サマリー、イベント、動画URL |
| 利用者一覧 | GET | `/wp-json/revel/v1/members?facility_id={id}` | 利用者マスタ、モニタリング設定、ステータス |
| 体調グラフ | GET | `/wp-json/revel/v1/health-stats?facility_id={id}&year=2024&month=11&member_id=xxx` | カード指標、実施カレンダー、コメント、グラフ系列 |
| 工賃 | GET | `/wp-json/revel/v1/rewards?facility_id={id}&period=2024-Q3` | KPI、推移グラフ、利用者別工賃、明細リンク |
| ご契約情報 | GET | `/wp-json/revel/v1/contract?facility_id={id}` | 基本情報 / 連絡先 / プラン情報 |
| サポート | GET | `/wp-json/revel/v1/settings/support-links` | サポート記事のリンク一覧 (WP固定ページ) |

> 施設アカウントでログイン後、`facility_id` と `token` を Next.js 側に伝える。Next.js では `cookies()` or `headers()` を通じて API 呼び出しが可能になる想定。

## データ構造

型定義は `types/portal.ts` にまとめる。主な型:

- `HomeData`
- `MemberRecord`
- `HealthGraphData`
- `RewardData`
- `ContractData`
- `SupportLink`

Mock データは `mocks/*.json` ＋ `lib/mocks/index.ts` に分離済み。`NEXT_PUBLIC_USE_MOCKS=false` に切り替えると `lib/apiClient.ts` から WordPress REST API へ `fetch` します。

## データフロー例: ホーム → 利用者一覧

1. `app/page.tsx` (`HomePage`) で `const data = await getHomeData()` を実行
2. `getHomeData()` は `lib/dataSources.ts` 内で WordPress API へアクセス (現状は mock)
3. 取得結果を `HomeData` 型でバリデーション → UI へ渡す
4. 利用者一覧画面でも同様に `getMembersData()` を通じて `MemberRecord[]` を取得

## 環境変数 / モード切り替え

`.env.local` サンプル:

```
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_WP_API_BASE=https://example.com/wp-json/revel/v1
NEXT_PUBLIC_FACILITY_ID=facility_demo
NEXT_PUBLIC_DEFAULT_YEAR=2024
NEXT_PUBLIC_DEFAULT_MONTH=11
NEXT_PUBLIC_DEFAULT_MEMBER_ID=member_001
NEXT_PUBLIC_DEFAULT_PERIOD=2024-Q3
WP_API_TOKEN=application_password_or_jwt
```

- `NEXT_PUBLIC_USE_MOCKS=true` … `mocks/*.json` をそのままUIへ渡す
- `NEXT_PUBLIC_USE_MOCKS=false` … `lib/apiClient.ts` が WordPress REST API へ `fetch` (Cookie / `WP_API_TOKEN` 対応)
- Facility ID は `NEXT_PUBLIC_FACILITY_ID` あるいはサーバーサイドの `FACILITY_ID` に設定

## WordPress カスタム REST API 例

```php
add_action( 'rest_api_init', function () {
  register_rest_route(
    'revel/v1',
    '/home-summary',
    [
      'methods'  => WP_REST_Server::READABLE,
      'callback' => 'revel_home_summary',
      'permission_callback' => 'revel_require_facility_user',
    ]
  );
});

function revel_require_facility_user( $request ) {
  if ( ! is_user_logged_in() ) {
    return new WP_Error( 'unauthorized', 'ログインが必要です', [ 'status' => 401 ] );
  }
  $facility_id = get_user_meta( get_current_user_id(), 'facility_id', true );
  if ( empty( $facility_id ) ) {
    return new WP_Error( 'no_facility', 'facility_id が設定されていません', [ 'status' => 403 ] );
  }
  if ( $request->get_param( 'facility_id' ) && $facility_id !== $request->get_param( 'facility_id' ) ) {
    return new WP_Error( 'forbidden', 'facility_id が一致しません', [ 'status' => 403 ] );
  }
  return true;
}

function revel_home_summary( WP_REST_Request $request ) {
  $facility_id = get_user_meta( get_current_user_id(), 'facility_id', true );
  $response = [
    'statCards' => [
      [
        'label' => 'ご契約期間',
        'value' => get_field( 'contract_period', 'facility_' . $facility_id ),
        'note'  => '更新タイミング：毎年4月（自動更新）',
      ],
      // ...
    ],
    // timeline / manualVideos なども CPT やカスタムテーブルから変換
  ];
  return rest_ensure_response( $response );
}
```

`members`, `health-stats`, `rewards`, `contract`, `settings/support-links` も同じ要領で `register_rest_route`。  
施設ごとのアクセス制御は `permission_callback` で facility_id を検証し、必要に応じて `$wpdb` でカスタムテーブルを参照する。

## 今後のTODO

- API レスポンスのバリデーション (zod または io-ts) を導入
- 認証トークン / Cookie フローの決定（Application Password, JWT, Nonce 等）
- グラフライブラリ（Chart.js）導入時に、APIの配列構造を確定
