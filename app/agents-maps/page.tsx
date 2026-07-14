import type { Metadata } from "next";
import { Suspense } from "react";
import { AgentsMapExplorer } from "@/components/AgentsMapExplorer";

export const metadata: Metadata = {
  title: "英雄与地图 / Agents & Maps",
  description: "查看当前 Valorant 竞技地图池、英雄策略、互动地图指南与 HAO 的游戏理解。",
  alternates: { canonical: "/agents-maps" },
  openGraph: { url: "/agents-maps" }
};

export default function AgentsMapsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-black text-white sm:text-5xl">英雄与地图</h1>
        <p className="mt-2 text-sm text-zinc-600">Agents & Maps</p>
        <p className="mt-5 text-base leading-8 text-zinc-300">
          选择英雄，再选择地图，查看这个英雄在不同地图上的点位、控图思路和实战打法。
        </p>
        <p className="mt-2 text-sm leading-7 text-zinc-600">
          Choose an agent and a map to view strategy notes, utility points and game sense.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="min-h-64 border border-white/10 p-6 text-sm text-zinc-600">正在载入英雄与地图…</div>}><AgentsMapExplorer /></Suspense>
      </div>
      <p className="mt-16 border-t border-white/10 pt-6 text-xs leading-6 text-zinc-600">
        地图名称与地图图像素材归 Riot Games 所有。ClutchNest 是独立的非商业玩家项目。
        <span className="mt-1 block text-zinc-700">Map names and imagery are property of Riot Games. ClutchNest is an independent, non-commercial fan project.</span>
      </p>
    </div>
  );
}
