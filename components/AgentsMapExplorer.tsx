"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { agents, lineupPoints, maps, type LineupPoint, type ValorantMap } from "@/lib/data/agentsMaps";

type MobileStep = "agent" | "map" | "point" | "strategy";

export function AgentsMapExplorer() {
  const [agentId, setAgentId] = useState(agents[0].id);
  const [mapId, setMapId] = useState(maps[0].id);
  const [selectedId, setSelectedId] = useState(lineupPoints[0].id);
  const [mobileStep, setMobileStep] = useState<MobileStep>("agent");

  const points = useMemo(
    () => lineupPoints.filter((point) => point.agentId === agentId && point.mapId === mapId),
    [agentId, mapId]
  );
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[0];
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];
  const selectedMap = maps.find((map) => map.id === mapId) ?? maps[0];

  function selectAgent(nextId: string, advance = false) {
    setAgentId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === nextId && point.mapId === mapId);
    setSelectedId(nextPoint?.id ?? "");
    if (advance) setMobileStep("map");
  }

  function selectMap(nextId: string, advance = false) {
    setMapId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === agentId && point.mapId === nextId);
    setSelectedId(nextPoint?.id ?? "");
    if (advance) setMobileStep("point");
  }

  function selectPoint(point: LineupPoint, advance = false) {
    setSelectedId(point.id);
    if (advance) setMobileStep("strategy");
  }

  return (
    <>
      <div className="hidden gap-6 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="self-start rounded-lg border border-white/10 bg-panel/60 p-4">
          <SelectionGroup title="英雄">
            {agents.map((agent) => (
              <SelectionButton
                key={agent.id}
                active={agent.id === agentId}
                title={agent.name}
                subtitle={agent.role}
                onClick={() => selectAgent(agent.id)}
              />
            ))}
          </SelectionGroup>

          <section className="mt-5 border-t border-white/10 pt-5">
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
        </aside>

        <main className="min-w-0 space-y-6">
          <MapPool selectedId={mapId} onSelect={selectMap} />
          <MapCanvas map={selectedMap} points={points} selectedPoint={selectedPoint} onSelect={selectPoint} />
          {selectedPoint ? (
            <StrategyDetail agent={selectedAgent.name} map={selectedMap.name} point={selectedPoint} />
          ) : <EmptyStrategy agent={selectedAgent.name} map={selectedMap.name} />}
        </main>
      </div>

      <div className="space-y-3 lg:hidden">
        <MobileSection step="agent" current={mobileStep} number="1" title="选择英雄" onOpen={setMobileStep} summary={selectedAgent.name}>
          <div className="grid gap-3">
            {agents.map((agent) => (
              <SelectionButton
                key={agent.id}
                active={agent.id === agentId}
                title={agent.name}
                subtitle={agent.role}
                onClick={() => selectAgent(agent.id, true)}
              />
            ))}
          </div>
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
            alt={`${map.name} 官方地图封面 / official map cover`}
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

function SelectionButton({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`w-full rounded-md border p-3 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${active ? "border-valorant bg-valorant/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"}`}>
      <span className="block text-sm font-semibold">{title}</span>
      {subtitle ? <span className="mt-1 block text-xs leading-5 text-zinc-500">{subtitle}</span> : null}
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
          alt={`${map.name} 官方地图俯视图 / official top-down overview`}
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
  return <p className="rounded-md border border-dashed border-white/10 p-4 text-xs leading-6 text-zinc-600">这个英雄与地图组合的点位内容将在后续更新。</p>;
}

function EmptyStrategy({ agent, map }: { agent: string; map: string }) {
  return (
    <article className="rounded-lg border border-white/10 bg-panel/70 p-5 sm:p-7">
      <p className="text-sm text-zinc-500">{agent} · {map}</p>
      <h2 className="mt-3 text-xl font-semibold text-white">点位内容待更新</h2>
      <p className="mt-3 text-sm leading-7 text-zinc-500">当前地图概览已准备完成，具体打法与点位会在后续内容阶段加入。</p>
    </article>
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
