import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "RevelApp 管理画面",
  description: "RevelApp施設向けの管理ポータル UI"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ja">
    <body className="bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 h-screen p-8 space-y-16 overflow-y-auto">{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
