"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TacticImage } from "@/lib/data/tactics/types";

export function TacticImageGallery({ images, tacticTitle }: { images: TacticImage[]; tacticTitle: string }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState<string[]>([]);
  const current = images[index];
  const imageFailed = current ? failed.includes(current.src) : false;

  useEffect(() => {
    if (!expanded) return;
    function close(event: KeyboardEvent) { if (event.key === "Escape") setExpanded(false); }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [expanded]);

  if (!current) return <MissingTacticImage tacticTitle={tacticTitle} />;

  function move(direction: -1 | 1) {
    setIndex((currentIndex) => (currentIndex + direction + images.length) % images.length);
  }

  const preview = imageFailed ? <MissingTacticImage tacticTitle={tacticTitle} compact /> : (
    <Image src={current.src} alt={current.alt} fill sizes="(max-width: 1023px) calc(100vw - 72px), 430px" className="object-cover" onError={() => setFailed((items) => items.includes(current.src) ? items : [...items, current.src])} />
  );

  return (
    <section aria-label="战术图片">
      <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black">
        {preview}
        {!imageFailed ? <button type="button" aria-label="放大战术图片" onClick={() => setExpanded(true)} className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white" /> : null}
        <span className="absolute bottom-3 right-3 z-20 rounded-sm border border-white/10 bg-black/80 px-2 py-1 text-[10px] tabular-nums text-zinc-400">{index + 1} / {images.length}</span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <p className="text-xs leading-5 text-zinc-500">{current.caption}</p>
        {images.length > 1 ? <div className="flex shrink-0 gap-2"><GalleryButton label="上一张" onClick={() => move(-1)}>←</GalleryButton><GalleryButton label="下一张" onClick={() => move(1)}>→</GalleryButton></div> : null}
      </div>
      {expanded && !imageFailed ? (
        <div role="dialog" aria-modal="true" aria-label={`${tacticTitle} 图片预览`} className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4 sm:p-8">
          <button type="button" aria-label="关闭图片预览" onClick={() => setExpanded(false)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-white/20 bg-black text-xl text-white transition hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">×</button>
          <div className="relative h-full max-h-[85vh] w-full max-w-6xl"><Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" /></div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} onClick={onClick} className="grid h-8 w-8 place-items-center rounded-sm border border-white/10 text-sm text-zinc-400 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">{children}</button>;
}

export function MissingTacticImage({ tacticTitle, compact = false }: { tacticTitle: string; compact?: boolean }) {
  return (
    <div className={`grid h-full w-full place-items-center bg-[#090909] px-6 text-center grid-surface ${compact ? "absolute inset-0" : "aspect-video rounded-md border border-dashed border-white/10"}`}>
      <span>
        <span className="block text-sm font-semibold text-zinc-400">待补充图片</span>
        <span className="mt-2 block text-xs leading-5 text-zinc-700">{tacticTitle} 的实机站位与道具视角将由 HAO 补拍。</span>
      </span>
    </div>
  );
}
