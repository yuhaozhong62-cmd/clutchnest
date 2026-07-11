"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { agents, lineupPoints, maps, type LineupPoint } from "@/lib/data/agentsMaps";

type MobileStep = "agent" | "map" | "point" | "strategy";

export function AgentsMapExplorer() {
  const [agentId, setAgentId] = useState(agents[0].id);
  const [mapId, setMapId] = useState(maps[0].id);
  const [selectedId, setSelectedId] = useState(lineupPoints[0].id);
  const [mobileStep, setMobileStep] = useState<MobileStep>("agent");

  const points = useMemo(() => lineupPoints.filter((point) => point.agentId === agentId && point.mapId === mapId), [agentId, mapId]);
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[0];
  const selectedAgent = agents.find((agent) => agent.id === agentId) ?? agents[0];
  const selectedMap = maps.find((map) => map.id === mapId) ?? maps[0];

  function selectAgent(nextId: string, advance = false) {
    setAgentId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === nextId && point.mapId === mapId);
    if (nextPoint) setSelectedId(nextPoint.id);
    if (advance) setMobileStep("map");
  }

  function selectMap(nextId: string, advance = false) {
    setMapId(nextId);
    const nextPoint = lineupPoints.find((point) => point.agentId === agentId && point.mapId === nextId);
    if (nextPoint) setSelectedId(nextPoint.id);
    if (advance) setMobileStep("point");
  }

  function selectPoint(point: LineupPoint, advance = false) {
    setSelectedId(point.id);
    if (advance) setMobileStep("strategy");
  }

  if (!selectedPoint) return null;

  return (
    <>
      <div className="hidden gap-6 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="self-start rounded-lg border border-white/10 bg-panel/60 p-4">
          <SelectionGroup title="英雄">
            {agents.map((agent) => <SelectionButton key={agent.id} active={agent.id === agentId} title={agent.name} subtitle={agent.role} onClick={() => selectAgent(agent.id)} />)}
          </SelectionGroup>
          <SelectionGroup title="地图" separated>
            {maps.map((map) => <SelectionButton key={map.id} active={map.id === mapId} title={map.name} subtitle={map.summary} onClick={() => selectMap(map.id)} />)}
          </SelectionGroup>
          <SelectionGroup title="点位" separated>
            {points.map((point) => <SelectionButton key={point.id} active={point.id === selectedPoint.id} title={point.name} onClick={() => selectPoint(point)} />)}
          </SelectionGroup>
        </aside>

        <main className="min-w-0 space-y-6">
          <MapCanvas mapName={selectedMap.name} points={points} selectedPoint={selectedPoint} onSelect={selectPoint} />
          <StrategyDetail agent={selectedAgent.name} map={selectedMap.name} point={selectedPoint} />
        </main>
      </div>

      <div className="space-y-3 lg:hidden">
        <MobileSection step="agent" current={mobileStep} number="1" title="选择英雄" onOpen={setMobileStep} summary={selectedAgent.name}>
          <div className="grid gap-3">
            {agents.map((agent) => <SelectionButton key={agent.id} active={agent.id === agentId} title={agent.name} subtitle={agent.role} onClick={() => selectAgent(agent.id, true)} />)}
          </div>
        </MobileSection>
        <MobileSection step="map" current={mobileStep} number="2" title="选择地图" onOpen={setMobileStep} summary={selectedMap.name}>
          <div className="grid gap-3">
            {maps.map((map) => <SelectionButton key={map.id} active={map.id === mapId} title={map.name} subtitle={map.summary} onClick={() => selectMap(map.id, true)} />)}
          </div>
        </MobileSection>
        <MobileSection step="point" current={mobileStep} number="3" title="选择点位" onOpen={setMobileStep} summary={selectedPoint.name}>
          <div className="grid gap-3">
            {points.map((point) => <SelectionButton key={point.id} active={point.id === selectedPoint.id} title={point.name} onClick={() => selectPoint(point, true)} />)}
          </div>
        </MobileSection>
        <MobileSection step="strategy" current={mobileStep} number="4" title="查看打法" onOpen={setMobileStep}>
          <div className="space-y-5">
            <MapCanvas mapName={selectedMap.name} points={points} selectedPoint={selectedPoint} onSelect={(point) => selectPoint(point)} />
            <StrategyDetail agent={selectedAgent.name} map={selectedMap.name} point={selectedPoint} />
          </div>
        </MobileSection>
      </div>
    </>
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

function MapCanvas({ mapName, points, selectedPoint, onSelect }: { mapName: string; points: LineupPoint[]; selectedPoint: LineupPoint; onSelect: (point: LineupPoint) => void }) {
  return (
    <section className="relative min-h-[340px] overflow-hidden rounded-lg border border-white/10 bg-black sm:min-h-[460px] grid-surface">
      <div className="absolute inset-5 rounded-md border border-white/10" />
      <div className="absolute left-[17%] top-[20%] h-20 w-28 rounded-md border border-white/10 bg-white/[0.035] sm:h-28 sm:w-36" />
      <div className="absolute bottom-[17%] right-[15%] h-24 w-32 rounded-md border border-white/10 bg-white/[0.035] sm:h-32 sm:w-40" />
      <div className="absolute left-[41%] top-[36%] h-28 w-20 rounded-md border border-white/10 bg-white/[0.035] sm:h-36 sm:w-28" />
      <div className="absolute left-5 top-5 bg-black/80 px-3 py-2"><p className="text-xs text-zinc-500">当前地图</p><h2 className="mt-1 text-xl font-semibold text-white">{mapName}</h2></div>
      {points.map((point) => (
        <button key={point.id} type="button" onClick={() => onSelect(point)} aria-label={point.name} className={`absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${selectedPoint.id === point.id ? "border-white bg-valorant" : "border-valorant bg-black hover:bg-valorant"}`} style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}>
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </button>
      ))}
    </section>
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
