"use client";

import { useState, type CSSProperties } from "react";
import type { NormalizedCrosshairSettings } from "@/lib/data/crosshairTeams/types";

type BackgroundMode = "dark" | "wall" | "sim";

const backgroundOptions: Array<{ id: BackgroundMode; label: string }> = [
  { id: "dark", label: "深色" },
  { id: "wall", label: "训练墙" },
  { id: "sim", label: "模拟" }
];

export function ProCrosshairPreview({
  settings,
  label,
  large = false
}: {
  settings?: NormalizedCrosshairSettings;
  label: string;
  large?: boolean;
}) {
  const [background, setBackground] = useState<BackgroundMode>("dark");

  return (
    <div className={`relative overflow-hidden rounded-md border border-white/10 ${large ? "min-h-80" : "min-h-60"}`}>
      <PreviewBackground mode={background} />
      <div className="absolute inset-0 grid place-items-center">
        {settings ? (
          <CrosshairGlyph settings={settings} scale={large ? 4 : 3} />
        ) : (
          <div className="max-w-48 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center border border-dashed border-white/20 text-lg text-zinc-500">?</div>
            <p className="mt-3 text-sm font-medium text-zinc-300">准星待核实</p>
            <p className="mt-1 text-xs text-zinc-600">No verified preview</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 flex rounded-md border border-white/10 bg-black/80 p-1" aria-label="准星预览背景">
        {backgroundOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-label={`切换到${option.label}预览背景`}
            aria-pressed={background === option.id}
            onClick={() => setBackground(option.id)}
            className={`min-h-8 rounded px-2 text-[11px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${background === option.id ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="sr-only">{label}。预览根据已记录的规范化参数绘制，详细参数同时在文字区域提供。</p>
    </div>
  );
}

function PreviewBackground({ mode }: { mode: BackgroundMode }) {
  if (mode === "wall") {
    return (
      <div className="absolute inset-0 bg-[#b8b4ac]" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/15" />
        <div className="absolute left-1/2 top-1/2 h-28 w-20 -translate-x-1/2 -translate-y-1/2 border border-black/20 bg-[#88847d]" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[#77736d]" />
      </div>
    );
  }

  if (mode === "sim") {
    return (
      <div className="absolute inset-0 bg-[#68645f]" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-12 bg-[#272629]" />
        <div className="absolute bottom-0 left-0 h-2/3 w-1/4 border-r border-black/30 bg-[#48464a]" />
        <div className="absolute bottom-0 right-0 h-3/4 w-1/4 border-l border-black/30 bg-[#858078]" />
        <div className="absolute bottom-0 left-1/2 h-3/5 w-2/5 -translate-x-1/2 border-x-[6px] border-t-[6px] border-[#39373a] bg-[#565258]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#09090b] grid-surface" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-36 w-px -translate-x-1/2 -translate-y-1/2 bg-white/[0.04]" />
      <div className="absolute left-1/2 top-1/2 h-px w-36 -translate-x-1/2 -translate-y-1/2 bg-white/[0.04]" />
    </div>
  );
}

function CrosshairGlyph({ settings, scale }: { settings: NormalizedCrosshairSettings; scale: number }) {
  const color = settings.colorHex ?? "#ffffff";
  const outline = settings.outlinesEnabled
    ? `0 0 0 ${Math.max(1, (settings.outlineThickness ?? 1) * 0.65)}px rgba(0, 0, 0, ${settings.outlineOpacity ?? 1})`
    : "none";

  return (
    <div className="relative" aria-hidden="true">
      {settings.outerLinesEnabled ? (
        <CrosshairLines
          color={color}
          opacity={settings.outerLineOpacity ?? 1}
          horizontalLength={settings.outerLineLength ?? 0}
          verticalLength={settings.outerLineVerticalLength ?? settings.outerLineLength ?? 0}
          thickness={settings.outerLineThickness ?? 1}
          offset={settings.outerLineOffset ?? 0}
          scale={scale}
          outline={outline}
        />
      ) : null}
      {settings.innerLinesEnabled ? (
        <CrosshairLines
          color={color}
          opacity={settings.innerLineOpacity ?? 1}
          horizontalLength={settings.innerLineLength ?? 0}
          verticalLength={settings.innerLineVerticalLength ?? settings.innerLineLength ?? 0}
          thickness={settings.innerLineThickness ?? 1}
          offset={settings.innerLineOffset ?? 0}
          scale={scale}
          outline={outline}
        />
      ) : null}
      {settings.centerDotEnabled ? (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: Math.max(2, (settings.centerDotThickness ?? 1) * scale),
            height: Math.max(2, (settings.centerDotThickness ?? 1) * scale),
            backgroundColor: color,
            opacity: settings.centerDotOpacity ?? 1,
            boxShadow: outline
          }}
        />
      ) : null}
    </div>
  );
}

function CrosshairLines({
  color,
  opacity,
  horizontalLength,
  verticalLength,
  thickness,
  offset,
  scale,
  outline
}: {
  color: string;
  opacity: number;
  horizontalLength: number;
  verticalLength: number;
  thickness: number;
  offset: number;
  scale: number;
  outline: string;
}) {
  const lineThickness = Math.max(1, thickness * scale);
  const gap = offset * scale;
  const common: CSSProperties = { position: "absolute", backgroundColor: color, opacity, boxShadow: outline };

  return (
    <>
      <span style={{ ...common, width: horizontalLength * scale, height: lineThickness, right: gap, top: -lineThickness / 2 }} />
      <span style={{ ...common, width: horizontalLength * scale, height: lineThickness, left: gap, top: -lineThickness / 2 }} />
      <span style={{ ...common, width: lineThickness, height: verticalLength * scale, bottom: gap, left: -lineThickness / 2 }} />
      <span style={{ ...common, width: lineThickness, height: verticalLength * scale, top: gap, left: -lineThickness / 2 }} />
    </>
  );
}
