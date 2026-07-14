"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { agents, lineupPoints, maps, type LineupPoint, type ValorantMap } from "@/lib/data/agentsMaps";
import type { ValorantAgent } from "@/lib/data/agents";

type MobileStep = "agent" | "map" | "point" | "strategy";
type AgentFilter = "all" | "sentinel";

export function AgentsMapExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialAgentId = agents.some((agent) => agent.id === searchParams.get("agent")) ? searchParams.get("agent")! : agents[0].id;
  const initialMapId = maps.some((map) => map.id === searchParams.get("map")) ? searchParams.get("map")! : maps[0].id;
  const initialPoint = lineupPoints.find((point) => point.id === searchParams.get("point") && point.agentId === initialAgentId && point.mapId === initialMapId)
    ?? lineupPoints.find((point) => point.agentId === initialAgentId && point.mapId === initialMapId);
  const [agentId, setAgentId] = useState(initialAgentId);
  const [mapId, setMapId] = useState(initialMapId);
  const [selectedId, setSelectedId] = useState(initialPoint?.id ?? "");
  const [mobileStep, setMobileStep] = useState<MobileStep>("agent");
  const [agentFilter, setAgentFilter] = useState<AgentFilter>("all");

  const points = useMemo(
    () => lineupPoints.filter((point) => point.agentId === agentId && point.mapId === mapId),
    [agentId, mapId]
  );
  const visibleAgents = useMemo(
    () => agents.filter((agent) => agentFilter === "all" || agent.role === agentFilter),
    [agentFilter]
  );
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[0];
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];
  const selectedMap = maps.find((map) => map.id === mapId) ?? maps[0];
  const sentinelCount = agents.filter((agent) => agent.role === "sentinel").length;
  const tacticalGuideHref = agentId === "cypher" && mapId === "ascent" ? "/agents/cypher/ascent" : undefined;

  useEffect(() => {
    const nextAgentId = agents.some((agent) => agent.id === searchParams.get("agent")) ? searchParams.get("agent")! : agents[0].id;
    const nextMapId = maps.some((map) => map.id === searchParams.get("map")) ? searchParams.get("map")! : maps[0].id;
    const nextPoint = lineupPoints.find((point) => point.id === searchParams.get("point") && point.agentId === nextAgentId && point.mapId === nextMapId)
      ?? lineupPoints.find((point) => point.agentId === nextAgentId && point.mapId === nextMapId);
    setAgentId(nextAgentId);
    setMapId(nextMapId);
    setSelectedId(nextPoint?.id ?? "");
  }, [searchParams]);

  function updateUrl(updates: { agent?: string; map?: string; point?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function selectAgent(nextId: string, advance = false) {
    setAgentId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === nextId && point.mapId === mapId);
    setSelectedId(nextPoint?.id ?? "");
    updateUrl({ agent: nextId, map: mapId, point: nextPoint?.id });
    if (advance) setMobileStep("map");
  }

  function selectAgentFilter(nextFilter: AgentFilter) {
    setAgentFilter(nextFilter);
    if (nextFilter === "sentinel" && selectedAgent.role !== "sentinel") {
      const firstSentinel = agents.find((agent) => agent.role === "sentinel");
      if (firstSentinel) selectAgent(firstSentinel.id);
    }
  }

  function selectMap(nextId: string, advance = false) {
    setMapId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === agentId && point.mapId === nextId);
    setSelectedId(nextPoint?.id ?? "");
    updateUrl({ agent: agentId, map: nextId, point: nextPoint?.id });
    if (advance) setMobileStep("point");
  }

  function selectPoint(point: LineupPoint, advance = false) {
    setSelectedId(point.id);
    updateUrl({ agent: agentId, map: mapId, point: point.id });
    if (advance) setMobileStep("strategy");
  }

  return (
    <>
      <div className="hidden space-y-6 lg:block">
        <AgentSelector
          agents={visibleAgents}
          selectedAgent={selectedAgent}
          filter={agentFilter}
          sentinelCount={sentinelCount}
          onFilter={selectAgentFilter}
          onSelect={selectAgent}
        />

        <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="self-start rounded-lg border border-white/10 bg-panel/60 p-4">
            <section>
              <p className="text-xs text-zinc-600">已选地图</p>
              <p className="mt-1 text-lg font-semibold text-white">{selectedMap.name}</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">{selectedMap.shortDescriptionCn}</p>
            </section>

            <SelectionGroup title="点位" separated>
              {points.length ? points.map((point) => (
                <SelectionButton
                  key={point.id}
                  active={point.id === selectedPoint?.id}
                  title={point.name}
                  onClick={() => selectPoint(point)}
                />
              )) : <EmptyPoints />}
            </SelectionGroup>
            {tacticalGuideHref ? <TacticalGuideLink href={tacticalGuideHref} /> : null}
          </aside>

          <main className="min-w-0 space-y-6">
            <MapPool selectedId={mapId} onSelect={selectMap} />
            <MapCanvas map={selectedMap} points={points} selectedPoint={selectedPoint} onSelect={selectPoint} />
            {selectedPoint ? (
              <StrategyDetail agent={selectedAgent.name} map={selectedMap.name} point={selectedPoint} />
            ) : <EmptyStrategy agent={selectedAgent.name} map={selectedMap.name} />}
          </main>
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        <MobileSection step="agent" current={mobileStep} number="1" title="选择英雄" onOpen={setMobileStep} summary={selectedAgent.name}>
          <AgentSelector
            agents={visibleAgents}
            selectedAgent={selectedAgent}
            filter={agentFilter}
            sentinelCount={sentinelCount}
            onFilter={selectAgentFilter}
            onSelect={(id) => selectAgent(id, true)}
            compact
          />
        </MobileSection>

        <MobileSection step="map" current={mobileStep} number="2" title="选择地图" onOpen={setMobileStep} summary={selectedMap.name}>
          <MapPool selectedId={mapId} onSelect={(id) => selectMap(id, true)} compact />
        </MobileSection>

        <MobileSection step="point" current={mobileStep} number="3" title="选择点位" onOpen={setMobileStep} summary={selectedPoint?.name ?? "待更新"}>
          {points.length ? (
            <div className="grid gap-3">
              {points.map((point) => (
                <SelectionButton
                  key={point.id}
                  active={point.id === selectedPoint?.id}
                  title={point.name}
                  onClick={() => selectPoint(point, true)}
                />
              ))}
            </div>
          ) : (
            <div>
              <EmptyPoints />
              {tacticalGuideHref ? <TacticalGuideLink href={tacticalGuideHref} /> : null}
              <button
                type="button"
                onClick={() => setMobileStep("strategy")}
                className="mt-4 inline-flex min-h-10 items-center rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                查看地图概览
              </button>
            </div>
          )}
        </MobileSection>

        <MobileSection step="strategy" current={mobileStep} number="4" title="查看打法" onOpen={setMobileStep}>
          <div className="space-y-5">
            <MapCanvas map={selectedMap} points={points} selectedPoint={selectedPoint} onSelect={selectPoint} />
            {selectedPoint ? (
              <StrategyDetail agent={selectedAgent.name} map={selectedMap.name} point={selectedPoint} />
            ) : <EmptyStrategy agent={selectedAgent.name} map={selectedMap.name} />}
          </div>
        </MobileSection>
      </div>
    </>
  );
}

function AgentSelector({
  agents: visibleAgents,
  selectedAgent,
  filter,
  sentinelCount,
  onFilter,
  onSelect,
  compact = false
}: {
  agents: ValorantAgent[];
  selectedAgent: ValorantAgent;
  filter: AgentFilter;
  sentinelCount: number;
  onFilter: (filter: AgentFilter) => void;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "" : "rounded-lg border border-white/10 bg-panel/40 p-5"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">选择英雄</h2>
          <p className="mt-1 text-xs text-zinc-500">Choose Agent</p>
        </div>
        <p className="text-xs text-zinc-500">
          {visibleAgents.length} 位{filter === "sentinel" ? "哨卫英雄" : "英雄"}
        </p>
      </div>

      <div className="mt-4 flex gap-2" aria-label="英雄定位筛选">
        <FilterButton active={filter === "all"} label="全部" onClick={() => onFilter("all")} />
        <FilterButton active={filter === "sentinel"} label={`哨卫 ${sentinelCount}`} onClick={() => onFilter("sentinel")} />
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-2 min-[540px]:grid-cols-3" : "grid-cols-3 xl:grid-cols-5"}`}>
        {visibleAgents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            active={agent.id === selectedAgent.id}
            priority={!compact && index < 5}
            onClick={() => onSelect(agent.id)}
          />
        ))}
      </div>

      <div className="mt-4 rounded-md border border-white/10 bg-black/35 p-4">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white">{selectedAgent.name}</p>
          <span className="text-xs text-zinc-500">{selectedAgent.roleCn}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{selectedAgent.shortDescriptionCn}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-600">{selectedAgent.shortDescriptionEn}</p>
      </div>

      <p className="mt-4 text-xs leading-5 text-zinc-600">
        英雄名称与角色图像素材归 Riot Games 所有。ClutchNest 是独立的非商业玩家项目，与 Riot Games 无官方关联。
        <span className="mt-1 block text-zinc-700">Agent names and imagery are property of Riot Games. ClutchNest is an independent, non-commercial fan project.</span>
      </p>
    </section>
  );
}

function AgentCard({ agent, active, priority, onClick }: { agent: ValorantAgent; active: boolean; priority: boolean; onClick: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative min-w-0 overflow-hidden rounded-lg border text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${active ? "border-valorant bg-valorant/[0.07]" : "border-white/10 bg-black/35 hover:border-white/30"}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-white/10 bg-zinc-950">
        {agent.portrait && !imageFailed ? (
          <Image
            src={agent.portrait}
            alt={`${agent.name} ${agent.roleCn}英雄官方角色图`}
            width={800}
            height={1000}
            sizes="(max-width: 539px) calc(50vw - 50px), (max-width: 1023px) 28vw, (max-width: 1279px) 27vw, 190px"
            priority={priority}
            className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.015]"
            onError={() => setImageFailed(true)}
          />
        ) : <AgentImagePlaceholder agent={agent} />}
        {active ? (
          <span className="absolute right-2 top-2 rounded-sm border border-white/20 bg-black/85 px-2 py-1 text-[10px] font-semibold text-white">
            已选择
          </span>
        ) : null}
      </div>
      <div className="p-3">
        <span className="block truncate text-sm font-semibold text-white">{agent.name}</span>
        <span className="mt-1 block text-xs text-zinc-500">{agent.roleCn}</span>
      </div>
      {active ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-valorant" /> : null}
    </button>
  );
}

function AgentImagePlaceholder({ agent }: { agent: ValorantAgent }) {
  return (
    <div className="grid h-full w-full place-items-center bg-zinc-950 text-center">
      <span>
        <span className="block text-2xl font-black text-zinc-700">{agent.name.slice(0, 2).toUpperCase()}</span>
        <span className="mt-2 block text-xs text-zinc-600">{agent.roleCn}</span>
      </span>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-9 rounded-md border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${active ? "border-white/35 bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}
    >
      {label}
    </button>
  );
}

function MapPool({ selectedId, onSelect, compact = false }: { selectedId: string; onSelect: (id: string) => void; compact?: boolean }) {
  return (
    <section className={compact ? "" : "rounded-lg border border-white/10 bg-panel/40 p-5"}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">本赛季地图池</h2>
          <p className="mt-1 text-xs text-zinc-500">V26 Act 4 · Patch 13.00</p>
        </div>
        <p className="text-xs text-zinc-600">核验于 2026-07-12</p>
      </div>

      <div className={`mt-5 grid gap-3 ${compact ? "grid-cols-1 min-[520px]:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
        {maps.map((map, index) => (
          <MapCard key={map.id} map={map} active={map.id === selectedId} priority={!compact && index < 3} onClick={() => onSelect(map.id)} />
        ))}
      </div>

      <div className="mt-5 border-l-2 border-valorant pl-4 text-xs leading-6 text-zinc-500">
        <p>地图池可能随游戏版本更新而变化。</p>
        <p>ClutchNest 会根据 Riot 官方补丁说明进行核验。</p>
      </div>
    </section>
  );
}

function MapCard({ map, active, priority, onClick }: { map: ValorantMap; active: boolean; priority: boolean; onClick: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group min-w-0 overflow-hidden rounded-lg border text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${active ? "border-valorant bg-valorant/[0.07]" : "border-white/10 bg-black/35 hover:border-white/30"}`}
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-zinc-950">
        {map.coverImage && !imageFailed ? (
          <Image
            src={map.coverImage}
            alt={`${map.name} 官方地图封面`}
            fill
            sizes="(max-width: 519px) calc(100vw - 74px), (max-width: 1023px) 45vw, (max-width: 1279px) 35vw, 260px"
            priority={priority}
            className="object-cover transition duration-200 group-hover:scale-[1.015]"
            onError={() => setImageFailed(true)}
          />
        ) : <MapImagePlaceholder name={map.name} />}
        {active ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-valorant" /> : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-white">{map.name}</span>
          <span className="shrink-0 text-xs text-zinc-500">{map.sites} 个据点</span>
        </div>
        <span className="mt-2 block min-h-10 text-xs leading-5 text-zinc-500">{map.shortDescriptionCn}</span>
      </div>
    </button>
  );
}

function SelectionGroup({ title, children, separated = false }: { title: string; children: ReactNode; separated?: boolean }) {
  return <section className={separated ? "mt-5 border-t border-white/10 pt-5" : ""}><h2 className="mb-3 text-sm font-semibold text-white">{title}</h2><div className="space-y-2">{children}</div></section>;
}

function SelectionButton({ active, title, onClick }: { active: boolean; title: string; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`w-full rounded-md border p-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${active ? "border-valorant bg-valorant/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"}`}>
      <span className="block text-sm font-semibold">{title}</span>
    </button>
  );
}

function MobileSection({ step, current, number, title, summary, onOpen, children }: { step: MobileStep; current: MobileStep; number: string; title: string; summary?: string; onOpen: (step: MobileStep) => void; children: ReactNode }) {
  const active = step === current;
  return (
    <section className="rounded-lg border border-white/10 bg-panel/60">
      <button type="button" onClick={() => onOpen(step)} aria-expanded={active} className="flex w-full items-center gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40">
        <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${active ? "border-valorant bg-valorant text-white" : "border-white/15 text-zinc-500"}`}>{number}</span>
        <span className="font-semibold text-white">{title}</span>
        {!active && summary ? <span className="ml-auto truncate text-xs text-zinc-500">{summary}</span> : null}
      </button>
      {active ? <div className="border-t border-white/10 p-4">{children}</div> : null}
    </section>
  );
}

function MapCanvas({ map, points, selectedPoint, onSelect }: { map: ValorantMap; points: LineupPoint[]; selectedPoint?: LineupPoint; onSelect: (point: LineupPoint) => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="relative min-h-[340px] overflow-hidden rounded-lg border border-white/10 bg-black sm:min-h-[540px]">
      {map.overviewImage && !imageFailed ? (
        <Image
          src={map.overviewImage}
          alt={`${map.name} 官方地图俯视图`}
          fill
          sizes="(max-width: 1023px) calc(100vw - 74px), 850px"
          className="object-contain p-5 opacity-80 sm:p-8"
          onError={() => setImageFailed(true)}
        />
      ) : <div className="absolute inset-0 grid-surface"><MapImagePlaceholder name={map.name} /></div>}
      <div className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/85 px-3 py-2 backdrop-blur-sm">
        <p className="text-xs text-zinc-500">当前地图</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{map.name}</h2>
      </div>
      {points.map((point) => (
        <button
          key={point.id}
          type="button"
          onClick={() => onSelect(point)}
          aria-label={point.name}
          aria-pressed={selectedPoint?.id === point.id}
          className={`absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${selectedPoint?.id === point.id ? "border-white bg-valorant" : "border-valorant bg-black hover:bg-valorant"}`}
          style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}
        >
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </button>
      ))}
    </section>
  );
}

function MapImagePlaceholder({ name }: { name: string }) {
  return <div className="grid h-full w-full place-items-center bg-zinc-950 px-4 text-center"><span className="text-sm font-semibold text-zinc-500">{name}<span className="mt-1 block text-xs font-normal text-zinc-700">地图图像暂不可用</span></span></div>;
}

function EmptyPoints() {
  return (
    <div className="rounded-md border border-dashed border-white/10 p-4 text-xs leading-6 text-zinc-600">
      <p>这个英雄在这张地图上暂时还没有攻略。</p>
      <p className="mt-2">HAO 会在实战测试后逐步加入点位、守点思路与技能用法。</p>
    </div>
  );
}

function EmptyStrategy({ agent, map }: { agent: string; map: string }) {
  return (
    <article className="rounded-lg border border-white/10 bg-panel/70 p-5 sm:p-7">
      <p className="text-sm text-zinc-500">{agent} · {map}</p>
      <h2 className="mt-3 text-xl font-semibold text-white">这个英雄在这张地图上暂时还没有攻略。</h2>
      <p className="mt-3 text-sm leading-7 text-zinc-500">HAO 会在实战测试后逐步加入点位、守点思路与技能用法。</p>
    </article>
  );
}

function TacticalGuideLink({ href }: { href: string }) {
  return (
    <Link href={href} className="mt-4 flex min-h-11 w-full items-center justify-between rounded-md border border-valorant/50 bg-valorant/[0.08] px-4 py-3 text-sm font-semibold text-white transition hover:border-valorant hover:bg-valorant/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
      <span>
        <span className="block">查看保安 × 空岛完整攻略</span>
        <span className="mt-1 block text-[10px] font-normal text-zinc-500">Cypher × Ascent Tactical Guide</span>
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function StrategyDetail({ agent, map, point }: { agent: string; map: string; point: LineupPoint }) {
  return (
    <article className="rounded-lg border border-white/10 bg-panel/70 p-5 sm:p-7">
      <p className="text-sm text-zinc-500">{agent} · {map} · {point.name}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{point.name}</h2>
      <div className="mt-6 grid min-h-36 place-items-center rounded-md border border-white/10 bg-black/50 px-5 text-center text-sm text-zinc-500 grid-surface">{point.screenshotLabel}</div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <DetailBlock title="打法说明" content={point.play} />
        <DetailBlock title="个人思路" content={point.thinking} />
        <DetailList title="技巧" items={point.tips} />
        <DetailBlock title="适合情况" content={point.bestFor} />
        <DetailList title="优点" items={point.pros} />
        <DetailList title="缺点" items={point.cons} muted />
      </div>
    </article>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return <section><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-400">{content}</p></section>;
}

function DetailList({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <section><h3 className="text-sm font-semibold text-white">{title}</h3><ul className="mt-3 space-y-2">{items.map((item) => <li key={item} className={`text-sm leading-6 ${muted ? "text-zinc-500" : "text-zinc-400"}`}>{item}</li>)}</ul></section>;
}
