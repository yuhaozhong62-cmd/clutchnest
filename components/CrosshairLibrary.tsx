"use client";

import { useMemo, useState } from "react";
import { CrosshairCard } from "@/components/CrosshairCard";
import { crosshairFilters, publishedCrosshairs, type CrosshairFilterId } from "@/lib/data/crosshairs";

export function CrosshairLibrary() {
  const [activeFilter, setActiveFilter] = useState<CrosshairFilterId>("all");
  const filteredCrosshairs = useMemo(() => {
    if (activeFilter === "all") return publishedCrosshairs;
    return publishedCrosshairs.filter((crosshair) =>
      activeFilter === crosshair.contentType || crosshair.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="mt-10">
      <section className="rounded-lg border border-white/10 bg-panel/70 p-5 shadow-glow">
        <p className="text-xs uppercase tracking-[0.3em] text-valorant">准星选择 / Crosshair Guide</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">如何选择准星？</h2>
        <p className="mt-1 text-sm text-zinc-600">How to choose a crosshair?</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">
          准星没有绝对最强，重点是适合你的视觉习惯、定位方式和英雄打法。
          我会从清晰度、遮挡程度、爆头手感和实战稳定性几个角度来评价每个准星。
        </p>
      </section>

      <section className="mt-5 border-l-2 border-valorant bg-white/[0.025] px-5 py-4">
        <p className="text-sm leading-7 text-zinc-300">
          职业选手可能随时更换准星。这里展示的是 ClutchNest 最近核验的公开设置，并不代表选手永久使用此代码。
        </p>
        <p className="mt-1 text-xs leading-6 text-zinc-600">
          Professional players may change their crosshairs at any time. These entries reflect the latest settings verified by ClutchNest.
        </p>
      </section>

      <div className="mt-6 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-panel/70 p-3">
        {crosshairFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-md border px-3 py-2 text-left text-xs transition duration-300 ${
              activeFilter === filter.id
                ? "border-white bg-white text-black"
                : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/30 hover:text-white"
            }`}
          >
            <span className="font-semibold">{filter.labelCn}</span>
            <span className="ml-2 opacity-60">{filter.labelEn}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {filteredCrosshairs.map((crosshair) => (
          <CrosshairCard key={crosshair.id} crosshair={crosshair} />
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-white/10 bg-black/40 p-5 text-sm leading-7 text-zinc-400">
        <p className="text-zinc-300">更多 HAO 实测内容与职业选手公开设置会持续更新。</p>
        <p className="text-xs text-zinc-600">More HAO-tested content and verified pro references will be added over time.</p>
      </div>
    </div>
  );
}
