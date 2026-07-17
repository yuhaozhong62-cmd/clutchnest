import type { Metadata } from "next";
import { Suspense } from "react";
import { AgentsMapExplorer } from "@/components/AgentsMapExplorer";
import { agents, maps } from "@/lib/data/agentsMaps";

export const metadata: Metadata = {
  title: "英雄与地图 / Agents & Maps",
  description: "查看当前 Valorant 竞技地图池、英雄策略、互动地图指南与 HAO 的游戏理解。",
  alternates: { canonical: "/agents-maps" },
  openGraph: { url: "/agents-maps" }
};

export default function AgentsMapsPage() {
  return (
    <div className="site-container page-shell">
      <div className="page-header max-w-[46rem] pb-10 sm:pb-12">
        <h1 className="page-title">英雄与地图</h1>
        <p className="mt-2 page-kicker">Agents & Maps</p>
        <p className="mt-5 max-w-[42rem] page-lead">
          选择英雄，再选择地图，查看这个英雄在不同地图上的点位、控图思路和实战打法。
        </p>
        <p className="mt-2 support-copy">
          Choose an agent and a map to view strategy notes, utility points and game sense.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500" aria-label={`已收录 ${agents.length} 位英雄和 ${maps.length} 张当前地图`}>
          <span>{agents.length} 位已发布英雄</span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span>{maps.length} 张当前地图</span>
        </div>
        <ol className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-4 text-xs text-zinc-500" aria-label="浏览顺序">
          <li><span className="mr-2 font-mono text-valorant/80">01</span>选择英雄</li>
          <li><span className="mr-2 font-mono text-valorant/80">02</span>选择地图</li>
          <li><span className="mr-2 font-mono text-valorant/80">03</span>查看点位</li>
        </ol>
      </div>
      <div>
        <Suspense fallback={<div className="min-h-64 border-y border-white/10 py-8 text-sm text-zinc-600">正在载入英雄与地图…</div>}><AgentsMapExplorer /></Suspense>
      </div>
      <p className="mt-16 border-t border-white/10 pt-6 text-xs leading-6 text-zinc-600">
        地图名称与地图图像素材归 Riot Games 所有。ClutchNest 是独立的非商业玩家项目。
        <span className="mt-1 block text-zinc-700">Map names and imagery are property of Riot Games. ClutchNest is an independent, non-commercial fan project.</span>
      </p>
    </div>
  );
}
