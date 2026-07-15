import type { Metadata } from "next";
import { Suspense } from "react";
import { CypherAscentExperience } from "@/components/tactics/CypherAscentExperience";

export const metadata: Metadata = {
  title: "保安 × 空岛战术库",
  description: "HAO 整理的 Cypher × Ascent 中文战术库：防守布置、信息控制、防绕后、回防和包后残局思路。",
  alternates: { canonical: "/agents/cypher/ascent" },
  openGraph: {
    title: "保安 × 空岛战术库｜ClutchNest",
    description: "12 条经过筛选的 Cypher × Ascent 进攻与防守战术。",
    url: "/agents/cypher/ascent"
  }
};

export default function CypherAscentPage() {
  return (
    <Suspense fallback={<div className="site-container min-h-[70vh] py-20 text-sm text-zinc-500">正在加载战术地图…</div>}>
      <CypherAscentExperience />
    </Suspense>
  );
}
