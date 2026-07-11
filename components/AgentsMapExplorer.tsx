"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { agents, lineupPoints, maps } from "@/lib/data/agentsMaps";

export function AgentsMapExplorer() {
  const [agentId, setAgentId] = useState(agents[0].id);
  const [mapId, setMapId] = useState(maps[0].id);
  const visiblePoints = useMemo(
    () => lineupPoints.filter((point) => point.agentId === agentId && point.mapId === mapId),
    [agentId, mapId]
  );
  const fallbackPoints = visiblePoints.length > 0 ? visiblePoints : lineupPoints.filter((point) => point.mapId === mapId);
  const [selectedId, setSelectedId] = useState(fallbackPoints[0]?.id ?? lineupPoints[0].id);

  const selectedPoint =
    lineupPoints.find((point) => point.id === selectedId && point.mapId === mapId && point.agentId === agentId) ??
    fallbackPoints[0] ??
    lineupPoints[0];
  const selectedAgent = agents.find((agent) => agent.id === selectedPoint.agentId) ?? agents[0];
  const selectedMap = maps.find((map) => map.id === selectedPoint.mapId) ?? maps[0];

  function selectAgent(nextAgentId: string) {
    setAgentId(nextAgentId);
    const nextPoint = lineupPoints.find((point) => point.agentId === nextAgentId && point.mapId === mapId);
    if (nextPoint) setSelectedId(nextPoint.id);
  }

  function selectMap(nextMapId: string) {
    setMapId(nextMapId);
    const nextPoint =
      lineupPoints.find((point) => point.agentId === agentId && point.mapId === nextMapId) ??
      lineupPoints.find((point) => point.mapId === nextMapId);
    if (nextPoint) setSelectedId(nextPoint.id);
  }

  const pointsForMap = visiblePoints.length > 0 ? visiblePoints : lineupPoints.filter((point) => point.mapId === mapId);

  return (
    <div className="space-y-8">
      <StepSection label="01" titleCn="选择英雄" titleEn="Choose Agent">
        <div className="grid gap-4 lg:grid-cols-3">
          {agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => selectAgent(agent.id)}
              className={`rounded-lg border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${
                agent.id === agentId
                  ? "border-valorant bg-valorant text-white shadow-[0_0_40px_rgba(255,70,85,0.18)]"
                  : "border-white/10 bg-panel/80 text-zinc-300 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-xs uppercase tracking-[0.22em] opacity-80">英雄 / Agent</span>
              <span className="mt-3 block text-xl font-semibold">{agent.name}</span>
              <span className="mt-1 block text-sm opacity-80">{agent.role}</span>
              <span className="mt-4 block text-sm leading-6 opacity-85">{agent.summary}</span>
            </button>
          ))}
        </div>
      </StepSection>

      <StepSection label="02" titleCn="选择地图" titleEn="Choose Map">
        <div className="grid gap-4 lg:grid-cols-3">
          {maps.map((map) => (
            <button
              key={map.id}
              type="button"
              onClick={() => selectMap(map.id)}
              className={`rounded-lg border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${
                map.id === mapId
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-panel/80 text-zinc-300 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-xs uppercase tracking-[0.22em] opacity-70">地图 / Map</span>
              <span className="mt-3 block text-xl font-semibold">{map.name}</span>
              <span className="mt-4 block text-sm leading-6 opacity-80">{map.summary}</span>
            </button>
          ))}
        </div>
      </StepSection>

      <StepSection label="03" titleCn="查看点位" titleEn="View Strategy">
        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-white/10 bg-black shadow-glow grid-surface">
            <div className="absolute inset-6 rounded-md border border-white/10" />
            <div className="absolute left-[17%] top-[20%] h-28 w-36 rounded-md border border-white/10 bg-white/[0.04]" />
            <div className="absolute bottom-[17%] right-[15%] h-32 w-40 rounded-md border border-white/10 bg-white/[0.04]" />
            <div className="absolute left-[41%] top-[36%] h-36 w-28 rounded-md border border-white/10 bg-white/[0.04]" />
            <div className="absolute left-6 top-6 rounded-md border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">地图视图 / Map View</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{selectedMap.name}</h2>
            </div>

            {pointsForMap.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => setSelectedId(point.id)}
                className={`group absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-300 hover:scale-110 ${
                  selectedPoint.id === point.id
                    ? "border-white bg-valorant shadow-[0_0_0_10px_rgba(255,70,85,0.18),0_0_28px_rgba(255,70,85,0.45)]"
                    : "border-valorant/80 bg-black/80 shadow-[0_0_0_6px_rgba(255,70,85,0.08)] hover:bg-valorant"
                }`}
                style={{ left: `${point.position.x}%`, top: `${point.position.y}%` }}
                aria-label={point.name}
              >
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </button>
            ))}
          </div>

          <aside className="rounded-lg border border-white/10 bg-panel/90 p-5 shadow-glow">
            <p className="text-xs uppercase tracking-[0.22em] text-valorant">点位详情 / Point Detail</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{selectedPoint.name}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              {selectedAgent.name} · {selectedMap.name}
            </p>
            <div className="mt-5 grid min-h-44 place-items-center rounded-md border border-white/10 bg-black text-center text-sm text-zinc-500 grid-surface">
              {selectedPoint.screenshotLabel}
            </div>
            <DetailBlock titleCn="打法说明" titleEn="Strategy" content={selectedPoint.play} />
            <DetailBlock titleCn="个人思路" titleEn="Personal thoughts" content={selectedPoint.thinking} />
            <DetailList titleCn="技巧" titleEn="Tips" items={selectedPoint.tips} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <DetailList titleCn="优点" titleEn="Pros" items={selectedPoint.pros} />
              <DetailList titleCn="缺点" titleEn="Cons" items={selectedPoint.cons} muted />
            </div>
            <DetailBlock titleCn="适合情况" titleEn="Best used when" content={selectedPoint.bestFor} />
          </aside>
        </section>
      </StepSection>
    </div>
  );
}

function StepSection({
  label,
  titleCn,
  titleEn,
  children
}: {
  label: string;
  titleCn: string;
  titleEn: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-500">{label}</span>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
          {titleCn} <span className="ml-2 text-zinc-600">{titleEn}</span>
        </h2>
      </div>
      {children}
    </section>
  );
}

function DetailBlock({ titleCn, titleEn, content }: { titleCn: string; titleEn: string; content: string }) {
  return (
    <section className="mt-5">
      <h3 className="text-sm font-semibold text-white">
        {titleCn} <span className="ml-2 text-xs font-normal text-zinc-600">{titleEn}</span>
      </h3>
      <p className="mt-2 text-sm leading-7 text-zinc-300">{content}</p>
    </section>
  );
}

function DetailList({
  titleCn,
  titleEn,
  items,
  muted = false
}: {
  titleCn: string;
  titleEn: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <section className="mt-5 rounded-md border border-white/10 bg-black/35 p-4">
      <h3 className="text-sm font-semibold text-white">
        {titleCn} <span className="ml-2 text-xs font-normal text-zinc-600">{titleEn}</span>
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className={muted ? "text-sm leading-6 text-zinc-500" : "text-sm leading-6 text-zinc-300"}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
