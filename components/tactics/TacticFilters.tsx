import type { TacticDifficulty, TacticSide, TacticUtilityType } from "@/lib/data/tactics/types";
import { cypherAscentAreas, tacticUtilityLabels } from "@/lib/data/tactics/cypher/ascent";

export type TacticFilterState = {
  side: "all" | TacticSide;
  area: "all" | string;
  utility: "all" | TacticUtilityType;
  difficulty: "all" | TacticDifficulty;
};

export const defaultTacticFilters: TacticFilterState = { side: "all", area: "all", utility: "all", difficulty: "all" };

export function TacticFilters({ filters, resultCount, onChange, onReset }: { filters: TacticFilterState; resultCount: number; onChange: (next: TacticFilterState) => void; onReset: () => void }) {
  return (
    <section aria-label="战术筛选" className="border-y border-white/10 py-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">筛选战术</p>
          <p className="mt-1 text-xs text-zinc-600">Filter tactics · 当前 {resultCount} 条</p>
        </div>
        <button type="button" onClick={onReset} className="self-start text-xs font-semibold text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 xl:self-auto">重置筛选</button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <fieldset>
          <legend className="mb-2 text-[11px] text-zinc-600">阵营</legend>
          <div className="grid grid-cols-3 gap-1 rounded-md border border-white/10 bg-black/40 p-1">
            {([['all', '全部'], ['defense', '防守'], ['attack', '进攻']] as const).map(([value, label]) => (
              <button key={value} type="button" aria-pressed={filters.side === value} onClick={() => onChange({ ...filters, side: value })} className={`min-h-9 rounded-sm px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${filters.side === value ? "bg-white text-black" : "text-zinc-500 hover:bg-white/5 hover:text-white"}`}>{label}</button>
            ))}
          </div>
        </fieldset>
        <FilterSelect label="区域" value={filters.area} onChange={(area) => onChange({ ...filters, area })} options={cypherAscentAreas.map((area) => ({ value: area, label: area }))} />
        <FilterSelect label="道具类型" value={filters.utility} onChange={(utility) => onChange({ ...filters, utility: utility as TacticFilterState['utility'] })} options={Object.entries(tacticUtilityLabels).map(([value, label]) => ({ value, label }))} />
        <FilterSelect label="难度" value={filters.difficulty} onChange={(difficulty) => onChange({ ...filters, difficulty: difficulty as TacticFilterState['difficulty'] })} options={[{ value: 'easy', label: '简单' }, { value: 'medium', label: '中等' }, { value: 'advanced', label: '进阶' }]} />
      </div>
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] text-zinc-600">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-md border border-white/10 bg-black px-3 text-sm text-zinc-300 outline-none transition hover:border-white/25 focus:border-white/35 focus:ring-2 focus:ring-white/10">
        <option value="all">全部</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
