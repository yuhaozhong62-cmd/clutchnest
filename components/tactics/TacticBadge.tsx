import type { TacticDifficulty, TacticSide, TacticUtilityType } from "@/lib/data/tactics/types";
import { tacticUtilityLabels } from "@/lib/data/tactics/cypher/ascent";

export const sideLabels: Record<TacticSide, string> = { defense: "防守", attack: "进攻" };
export const difficultyLabels: Record<TacticDifficulty, string> = { easy: "简单", medium: "中等", advanced: "进阶" };

export function TacticBadge({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-sm border px-2 py-1 text-[11px] font-semibold ${accent ? "border-valorant/60 bg-valorant/10 text-white" : "border-white/10 bg-black/40 text-zinc-400"}`}>
      {children}
    </span>
  );
}

export function UtilityBadges({ utilities }: { utilities: TacticUtilityType[] }) {
  return <>{utilities.map((utility) => <TacticBadge key={utility}>{tacticUtilityLabels[utility]}</TacticBadge>)}</>;
}
