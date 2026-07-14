import type { Metadata } from "next";
import { Suspense } from "react";
import { CrosshairLibrary } from "@/components/CrosshairLibrary";

export const metadata: Metadata = {
  title: "EDG 现役选手准星代码",
  description: "查看并复制 ZmjjKK、CHICHOO、nobody、Smoggy、Jieni7 等 EDG 现役选手近期可验证的 VALORANT 准星代码。",
  alternates: { canonical: "/crosshairs" },
  openGraph: { url: "/crosshairs" }
};

export default function CrosshairsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-black text-white sm:text-5xl">准星库</h1>
        <p className="mt-2 text-sm text-zinc-600">Crosshair Library</p>
        <p className="mt-5 text-base leading-8 text-zinc-300">
          这里会收集 HAO 实测准星与最近核验的职业选手公开设置，包括使用分析、适合人群、优点和缺点。
        </p>
        <p className="mt-2 text-sm leading-7 text-zinc-600">
          HAO-tested crosshairs and recently verified professional references with practical analysis.
        </p>
      </div>
      <Suspense fallback={<div className="mt-10 min-h-64 border-y border-white/10 py-10 text-sm text-zinc-600">正在载入准星数据…</div>}>
        <CrosshairLibrary />
      </Suspense>
    </div>
  );
}
