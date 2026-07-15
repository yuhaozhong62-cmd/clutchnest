"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchHighlight } from "@/components/search/SearchHighlight";
import { formatDateCn } from "@/lib/search/formatDate";
import { searchTypeLabels, type SearchIndexItem } from "@/lib/search/types";

export function SearchResultCard({
  item,
  query,
  compact = false,
  selected = false,
  onNavigate
}: {
  item: SearchIndexItem;
  query: string;
  compact?: boolean;
  selected?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      role={compact ? "option" : undefined}
      aria-selected={compact ? selected : undefined}
      data-search-result-type={item.type}
      data-search-result-id={item.id}
      className={`group grid min-w-0 gap-3 rounded-md border p-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${compact ? "grid-cols-[3rem_minmax(0,1fr)_auto] items-center" : "grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:p-4"} ${selected ? "border-white/40 bg-white/[0.09]" : "border-white/10 bg-panel/60 hover:border-white/30 hover:bg-white/[0.04]"}`}
    >
      <ResultVisual item={item} compact={compact} />
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-zinc-500">{searchTypeLabels[item.type]}</span>
          <h3 className={`${compact ? "truncate text-sm" : "text-base"} min-w-0 font-semibold text-white`}><SearchHighlight text={item.title} query={query} /></h3>
        </div>
        {item.subtitle ? <p className="mt-1 truncate text-xs text-zinc-600"><SearchHighlight text={item.subtitle} query={query} /></p> : null}
        <p className={`${compact ? "line-clamp-1" : "line-clamp-2"} mt-2 text-xs leading-5 text-zinc-400`}><SearchHighlight text={item.description} query={query} /></p>
        {!compact ? <p className="mt-2 text-[11px] text-zinc-600">{getMetaText(item)}</p> : null}
      </div>
      <span className={`${compact ? "block" : "hidden sm:block"} text-sm text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-white`} aria-hidden="true">→</span>
    </Link>
  );
}

function ResultVisual({ item, compact }: { item: SearchIndexItem; compact: boolean }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = compact ? "h-12 w-12" : "h-[4.5rem] w-[4.5rem] sm:h-[5.5rem] sm:w-[5.5rem]";
  return (
    <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded-md border border-white/10 bg-black/70 ${sizeClass}`}>
      {item.image && !failed ? (
        <Image src={item.image} alt="" fill sizes={compact ? "48px" : "88px"} className="object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="text-xs font-black text-zinc-500" aria-hidden="true">{getVisualLabel(item)}</span>
      )}
    </div>
  );
}

function getVisualLabel(item: SearchIndexItem) {
  if (item.type === "team") return item.title.slice(0, 3).toUpperCase();
  if (item.type === "player") return item.title.slice(0, 2).toUpperCase();
  if (item.type === "streamer") return item.title.slice(0, 2).toUpperCase();
  return searchTypeLabels[item.type].slice(0, 2);
}

function getMetaText(item: SearchIndexItem) {
  const meta = item.meta;
  const date = item.updatedAt ? formatDateCn(item.updatedAt) : "更新时间未记录";
  if (!meta) return date;
  if (item.type === "crosshair") return [meta.player, meta.team, meta.style, date].filter(Boolean).join(" · ");
  if (item.type === "player") return [meta.team, `${meta.crosshairCount ?? 0} 条准星`].filter(Boolean).join(" · ");
  if (item.type === "streamer") return [meta.region, meta.platform?.toUpperCase(), `${meta.crosshairCount ?? 0} 条准星`, date].filter(Boolean).join(" · ");
  if (item.type === "team") return `${meta.playerCount ?? 0} 名选手 · ${meta.crosshairCount ?? 0} 条准星 · ${meta.verifiedCount ?? 0} 条已验证`;
  if (item.type === "agent") return `${meta.role ?? "定位未记录"} · ${meta.guideCount ?? 0} 个已发布地图攻略`;
  if (item.type === "map") return `${meta.currentRotation ?? "赛季状态未记录"} · ${meta.guideCount ?? 0} 个已发布英雄攻略`;
  return [meta.side, meta.area, meta.utility, meta.difficulty, date].filter(Boolean).join(" · ");
}
