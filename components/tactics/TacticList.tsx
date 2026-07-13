import type { CypherTactic } from "@/lib/data/tactics/types";
import { difficultyLabels, sideLabels, TacticBadge } from "@/components/tactics/TacticBadge";

export function TacticList({ tactics, selectedSlug, onSelect }: { tactics: CypherTactic[]; selectedSlug?: string; onSelect: (tactic: CypherTactic, trigger: HTMLButtonElement) => void }) {
  return (
    <section aria-labelledby="tactic-list-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id="tactic-list-title" className="text-lg font-semibold text-white">战术列表</h2>
          <p className="mt-1 text-xs text-zinc-600">选择一条战术，在地图上查看执行顺序。</p>
        </div>
        <span className="text-xs tabular-nums text-zinc-600">{String(tactics.length).padStart(2, '0')}</span>
      </div>

      {tactics.length ? (
        <div className="mt-4 max-h-[34rem] space-y-2 overflow-y-auto pr-1">
          {tactics.map((tactic, index) => (
            <button
              key={tactic.id}
              type="button"
              aria-pressed={selectedSlug === tactic.slug}
              onClick={(event) => onSelect(tactic, event.currentTarget)}
              className={`group w-full rounded-md border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${selectedSlug === tactic.slug ? "border-valorant/70 bg-valorant/[0.08]" : "border-white/10 bg-panel/40 hover:border-white/25 hover:bg-white/[0.025]"}`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xs tabular-nums text-zinc-700">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">{tactic.titleZh}</span>
                  <span className="mt-1 block text-[11px] text-zinc-600">{tactic.titleEn}</span>
                  <span className="mt-3 block text-xs leading-5 text-zinc-400">{tactic.shortDescriptionZh}</span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    <TacticBadge accent>{sideLabels[tactic.side]}</TacticBadge>
                    <TacticBadge>{tactic.area}</TacticBadge>
                    <TacticBadge>{difficultyLabels[tactic.difficulty]}</TacticBadge>
                  </span>
                </span>
                <span aria-hidden="true" className="text-zinc-700 transition group-hover:translate-x-0.5 group-hover:text-white">→</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-white/10 p-6 text-sm text-zinc-600">没有符合当前筛选条件的战术。</div>
      )}
    </section>
  );
}
