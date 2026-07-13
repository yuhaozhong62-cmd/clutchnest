import Image from "next/image";
import type { CypherTactic, TacticMapPoint, TacticPointType } from "@/lib/data/tactics/types";

const pointLabels: Record<TacticPointType, string> = {
  camera: "摄",
  tripwire: "线",
  cage: "笼",
  stand: "位",
  target: "视",
  route: "路",
  plant: "包"
};

const pointNames: Record<TacticPointType, string> = {
  camera: "摄像头",
  tripwire: "陷阱线",
  cage: "烟笼",
  stand: "玩家站位",
  target: "观察区域",
  route: "移动路线",
  plant: "下包区域"
};

export function TacticalMap({ tactics, selectedSlug, onSelect }: { tactics: CypherTactic[]; selectedSlug?: string; onSelect: (tactic: CypherTactic, trigger: HTMLButtonElement) => void }) {
  return (
    <section aria-labelledby="tactical-map-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="tactical-map-title" className="text-lg font-semibold text-white">战术地图</h2>
          <p className="mt-1 text-xs text-zinc-600">区域标记 · 选中战术后展开完整步骤点</p>
        </div>
        <p className="text-[11px] text-zinc-700">坐标为区域级引导，不代表像素落点</p>
      </div>

      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-md border border-white/10 bg-[#090909]">
        <Image
          src="/maps/2026-act-4/ascent/overview.webp"
          alt="Ascent 完整官方俯视地图，叠加 Cypher 战术区域标记"
          fill
          priority
          sizes="(max-width: 1023px) calc(100vw - 40px), 720px"
          className="object-contain opacity-75"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {tactics.map((tactic) => selectedSlug === tactic.slug && tactic.mapPoints.length > 1 ? (
            <polyline key={tactic.slug} points={tactic.mapPoints.map((point) => `${point.x},${point.y}`).join(' ')} fill="none" vectorEffect="non-scaling-stroke" stroke={selectedSlug === tactic.slug ? "rgba(255,70,85,0.7)" : "rgba(255,255,255,0.16)"} strokeWidth={selectedSlug === tactic.slug ? 1.6 : 1} strokeDasharray="2 2" />
          ) : null)}
        </svg>
        {tactics.flatMap((tactic) => (selectedSlug === tactic.slug ? tactic.mapPoints : tactic.mapPoints.slice(0, 1)).map((point) => (
          <TacticMarker key={`${tactic.slug}-${point.id}`} tactic={tactic} point={point} active={selectedSlug === tactic.slug} onSelect={onSelect} />
        )))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-b border-white/10 pb-4">
        {(Object.keys(pointLabels) as TacticPointType[]).map((type) => (
          <span key={type} className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600">
            <span className="grid h-5 w-5 place-items-center rounded-sm border border-white/15 bg-black text-[9px] font-bold text-zinc-400">{pointLabels[type]}</span>
            {pointNames[type]}
          </span>
        ))}
      </div>
    </section>
  );
}

function TacticMarker({ tactic, point, active, onSelect }: { tactic: CypherTactic; point: TacticMapPoint; active: boolean; onSelect: (tactic: CypherTactic, trigger: HTMLButtonElement) => void }) {
  const markerId = `tactic-marker-${tactic.slug}-${point.id}`;
  return (
    <button
      id={markerId}
      type="button"
      title={`${tactic.titleZh} · ${point.title}`}
      aria-label={`${tactic.titleZh}，${point.label}：${point.title}，${pointNames[point.type]}`}
      aria-pressed={active}
      onClick={(event) => onSelect(tactic, event.currentTarget)}
      className={`group absolute z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-sm border shadow-[0_0_0_3px_rgba(0,0,0,0.45)] transition focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-9 sm:w-9 ${active ? "z-20 border-white bg-valorant text-white shadow-[0_0_0_4px_rgba(255,70,85,0.2)]" : "border-white/30 bg-black/90 text-zinc-200 hover:z-20 hover:border-valorant hover:bg-valorant"}`}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <span className="text-xs font-black tabular-nums">{point.label}</span>
      <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-sm border border-white/20 bg-black text-[8px] font-bold text-zinc-400">{pointLabels[point.type]}</span>
      <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-44 -translate-x-1/2 rounded-sm border border-white/10 bg-black/95 p-2 text-left text-[10px] font-normal leading-4 text-zinc-300 shadow-xl group-hover:block group-focus-visible:block">
        <strong className="block text-white">{point.title}</strong>
        {point.description ? <span className="mt-1 block text-zinc-500">{point.description}</span> : null}
      </span>
    </button>
  );
}
