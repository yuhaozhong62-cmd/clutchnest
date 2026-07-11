import type { Metadata } from "next";
import { CrosshairLibrary } from "@/components/CrosshairLibrary";

export const metadata: Metadata = {
  title: "准星库 / Crosshair Library",
  description: "浏览 HAO 实测准星与 ClutchNest 最近核验的职业选手准星参考。",
  alternates: { canonical: "/crosshairs" },
  openGraph: { url: "/crosshairs" }
};

export default function CrosshairsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-valorant">准星分享 / Crosshairs</p>
        <h1 className="mt-4 text-5xl font-black text-white">准星库</h1>
        <p className="mt-2 text-lg text-zinc-500">Crosshair Library</p>
        <p className="mt-5 text-base leading-8 text-zinc-300">
          这里会收集 HAO 实测准星与最近核验的职业选手公开设置，包括使用分析、适合人群、优点和缺点。
        </p>
        <p className="mt-2 text-sm leading-7 text-zinc-600">
          HAO-tested crosshairs and recently verified professional references with practical analysis.
        </p>
      </div>
      <CrosshairLibrary />
    </div>
  );
}
