"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CypherTactic } from "@/lib/data/tactics/types";
import { cypherAscentResearchQueue, publishedCypherAscentTactics } from "@/lib/data/tactics/cypher/ascent";
import { TacticDetail } from "@/components/tactics/TacticDetail";
import { defaultTacticFilters, TacticFilters, type TacticFilterState } from "@/components/tactics/TacticFilters";
import { TacticList } from "@/components/tactics/TacticList";
import { TacticalMap } from "@/components/tactics/TacticalMap";

export function CypherAscentExperience() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TacticFilterState>(defaultTacticFilters);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousSlugRef = useRef<string | null>(null);
  const tacticSlug = searchParams.get("tactic");
  const selectedTactic = publishedCypherAscentTactics.find((tactic) => tactic.slug === tacticSlug);

  const filteredTactics = useMemo(() => publishedCypherAscentTactics.filter((tactic) => {
    if (filters.side !== "all" && tactic.side !== filters.side) return false;
    if (filters.area !== "all" && tactic.area !== filters.area) return false;
    if (filters.utility !== "all" && !tactic.utilityTypes.includes(filters.utility)) return false;
    if (filters.difficulty !== "all" && tactic.difficulty !== filters.difficulty) return false;
    return true;
  }), [filters]);

  const navigationTactics = filteredTactics.length ? filteredTactics : publishedCypherAscentTactics;
  const selectedIndex = selectedTactic ? navigationTactics.findIndex((tactic) => tactic.slug === selectedTactic.slug) : -1;

  useEffect(() => {
    const previous = previousSlugRef.current;
    if (previous && !tacticSlug && lastTriggerRef.current) {
      window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
    }
    previousSlugRef.current = tacticSlug;
  }, [tacticSlug]);

  useEffect(() => {
    if (!selectedTactic) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeDetail();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  function openTactic(tactic: CypherTactic, trigger: HTMLButtonElement, scrollToMap = false) {
    lastTriggerRef.current = trigger;
    const params = new URLSearchParams(searchParams.toString());
    params.set("tactic", tactic.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    if (scrollToMap) {
      window.requestAnimationFrame(() => mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function closeDetail() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tactic");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function moveDetail(direction: -1 | 1) {
    if (!selectedTactic) return;
    const current = selectedIndex >= 0 ? selectedIndex : 0;
    const next = navigationTactics[(current + direction + navigationTactics.length) % navigationTactics.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("tactic", next.slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-[90rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      <Link href="/agents-maps" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">← 返回英雄与地图</Link>

      <header className="mt-8 border-b border-white/[0.08] pb-8 sm:pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-valorant">英雄与地图 · 战术库</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">保安 × 空岛</h1>
            <p className="mt-2 text-sm text-zinc-500">Cypher × Ascent</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">用摄像头建立信息，用陷阱线守住通道，再根据对手的反应调整站位。这里记录的是可解释的战术框架，不是脱离版本的像素收藏。</p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">Chinese-first tactical notes, researched and organized by HAO.</p>
          </div>
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 text-center lg:w-[25rem]">
            <Stat value={String(publishedCypherAscentTactics.length)} label="公开战术" />
            <Stat value="13.00" label="核验版本" />
            <Stat value={String(cypherAscentResearchQueue.length)} label="待验证" />
          </dl>
        </div>
      </header>

      <div className="mt-6 rounded-sm border-l-2 border-valorant bg-white/[0.02] px-4 py-3 text-xs leading-6 text-zinc-500">
        页面只公开区域与执行逻辑可确认的战术。所有精确附着面、线高和单向视野仍需 HAO 在当前客户端实机复测。
      </div>

      <div className="mt-7"><TacticFilters filters={filters} resultCount={filteredTactics.length} onChange={setFilters} onReset={() => setFilters(defaultTacticFilters)} /></div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_27rem]">
        <div ref={mapSectionRef} className="scroll-mt-24"><TacticalMap tactics={filteredTactics} selectedSlug={selectedTactic?.slug} onSelect={(tactic, trigger) => openTactic(tactic, trigger)} /></div>

        <aside className="lg:sticky lg:top-24 lg:row-span-2 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
          {selectedTactic ? (
            <TacticDetail tactic={selectedTactic} index={selectedIndex >= 0 ? selectedIndex : 0} total={navigationTactics.length} onClose={closeDetail} onPrevious={() => moveDetail(-1)} onNext={() => moveDetail(1)} />
          ) : (
            <div className="hidden rounded-md border border-white/10 bg-panel/40 p-6 lg:block">
              <p className="text-xs font-semibold text-valorant">互动说明</p>
              <h2 className="mt-3 text-xl font-semibold text-white">选择一个地图标记</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">点击地图编号或下方战术列表，查看放置区域、执行步骤、信息处理和 HAO 的实战评价。</p>
              <div className="mt-6 border-t border-white/10 pt-4 text-xs leading-6 text-zinc-600">
                <p>键盘：Tab 定位，Enter / Space 打开</p>
                <p>详情：Esc 关闭，浏览器返回键恢复上一步</p>
              </div>
            </div>
          )}
        </aside>

        <div><TacticList tactics={filteredTactics} selectedSlug={selectedTactic?.slug} onSelect={(tactic, trigger) => openTactic(tactic, trigger, true)} /></div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-[#0a0b0d] px-3 py-4"><dt className="text-lg font-semibold text-white">{value}</dt><dd className="mt-1 text-[10px] text-zinc-500">{label}</dd></div>;
}
