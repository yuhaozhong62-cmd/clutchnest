"use client";

import { useMemo, useState } from "react";
import { CrosshairCard } from "@/components/CrosshairCard";
import { crosshairFilters, publishedCrosshairs, type CrosshairFilterId } from "@/lib/data/crosshairs";

const primaryFilterIds: CrosshairFilterId[] = ["all", "hao-tested", "pro-reference", "dot", "cross"];
const secondaryFilterIds: CrosshairFilterId[] = ["minimal", "headshot", "high-visibility"];

export function CrosshairLibrary() {
  const [activeFilter, setActiveFilter] = useState<CrosshairFilterId>("all");
  const [moreOpen, setMoreOpen] = useState(false);
  const filteredCrosshairs = useMemo(() => {
    if (activeFilter === "all") return publishedCrosshairs;
    return publishedCrosshairs.filter((crosshair) =>
      activeFilter === crosshair.contentType || crosshair.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  const filters = new Map(crosshairFilters.map((filter) => [filter.id, filter]));

  return (
    <div className="mt-10">
      <section className="max-w-3xl border-l-2 border-valorant pl-5">
        <h2 className="text-xl font-semibold text-white">如何选择准星？</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          准星没有绝对最强。优先考虑清晰度、遮挡程度，以及它是否符合你的定位与射击习惯。
        </p>
      </section>

      <section className="mt-10 border-y border-white/10 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {primaryFilterIds.map((id) => {
              const filter = filters.get(id)!;
              const label = id === "pro-reference" ? "职业选手" : filter.labelCn;
              return <FilterButton key={id} id={id} label={label} active={activeFilter === id} onSelect={setActiveFilter} />;
            })}
          </div>
          <p className="shrink-0 text-sm text-zinc-500">{filteredCrosshairs.length} 个准星</p>
        </div>

        <div className="mt-3">
          <button
            type="button"
            aria-expanded={moreOpen}
            aria-controls="secondary-crosshair-filters"
            onClick={() => setMoreOpen((value) => !value)}
            className="rounded-md px-1 py-2 text-sm text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            更多筛选 <span className="ml-1" aria-hidden="true">{moreOpen ? "−" : "+"}</span>
          </button>
          {moreOpen ? (
            <div id="secondary-crosshair-filters" className="mt-2 flex flex-wrap gap-2">
              {secondaryFilterIds.map((id) => {
                const filter = filters.get(id)!;
                const label = id === "minimal" ? "极简" : filter.labelCn;
                return <FilterButton key={id} id={id} label={label} active={activeFilter === id} onSelect={setActiveFilter} />;
              })}
            </div>
          ) : <div id="secondary-crosshair-filters" />}
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {filteredCrosshairs.map((crosshair) => <CrosshairCard key={crosshair.id} crosshair={crosshair} />)}
      </div>

      <p className="mt-10 text-sm text-zinc-500">更多 HAO 实测内容与职业选手公开设置会持续更新。</p>
    </div>
  );
}

function FilterButton({ id, label, active, onSelect }: { id: CrosshairFilterId; label: string; active: boolean; onSelect: (id: CrosshairFilterId) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`rounded-md border px-3 py-2 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${active ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-400 hover:border-white/30 hover:text-white"}`}
    >
      {label}
    </button>
  );
}
