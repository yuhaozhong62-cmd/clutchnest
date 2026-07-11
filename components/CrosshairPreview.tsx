"use client";

import Image from "next/image";
import { useState } from "react";

type CrosshairPreviewProps = {
  image: string;
  name: string;
  accent: string;
};

export function CrosshairPreview({ image, name, accent }: CrosshairPreviewProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-md border border-white/10 bg-black grid-surface">
      {!hasImageError ? (
        <Image
          src={image}
          alt={`${name} 准星预览 / Crosshair preview`}
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          onError={() => setHasImageError(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      ) : null}
      <div className={`relative h-32 w-32 transition duration-300 ${hasImageError ? "" : "opacity-0"}`} aria-hidden={!hasImageError}>
        <span
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 shadow-[0_0_16px_currentColor]"
          style={{ backgroundColor: accent, color: accent }}
        />
        <span
          className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 shadow-[0_0_16px_currentColor]"
          style={{ backgroundColor: accent, color: accent }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      {hasImageError ? (
        <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-zinc-500">
          预览暂不可用 / Preview unavailable
        </div>
      ) : null}
    </div>
  );
}
