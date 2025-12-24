"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "利用者一覧", href: "/members" },
  { label: "体調の見える化", href: "/health-graph" },
  { label: "工賃", href: "/rewards" },
  { label: "ご契約情報", href: "/contract" },
  { label: "変更申請", href: "/change-request" },
  { label: "サポート", href: "/support" }
];

const baseClasses =
  "nav-button px-4 py-2 rounded-xl text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-slate-100 flex flex-col py-8 px-6 h-screen sticky top-0">
      <div className="flex items-center gap-2 mb-10">
        <div className="h-10 w-10 rounded-2xl bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-semibold">
          R
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">RevelApp</p>
          <p className="text-lg font-semibold">管理コンソール</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">メニュー</p>
      <nav className="flex flex-col gap-1 text-sm" aria-label="主要メニュー">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const activeClasses = isActive ? "bg-white/10 text-white font-semibold" : "text-slate-100/80 hover:bg-white/5";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${baseClasses} ${activeClasses}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-10 border-t border-white/10 space-y-1 text-sm">
        <p className="text-xs text-slate-400">現在のプラン</p>
        <p className="font-semibold">フォーカスプラン</p>
        <p className="text-xs text-slate-500">利用者 18 / 25 人</p>
      </div>
    </aside>
  );
};
