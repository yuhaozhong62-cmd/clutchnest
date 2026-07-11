import type { Metadata } from "next";
import { AgentsMapExplorer } from "@/components/AgentsMapExplorer";

export const metadata: Metadata = {
  title: "英雄与地图 / Agents & Maps",
  description: "选择英雄和地图，查看 Valorant 点位、控图思路与实战打法。",
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
        <AgentsMapExplorer />
      </div>
    </div>
  );
}
