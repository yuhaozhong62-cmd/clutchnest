"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StreamerCrosshairCard } from "@/components/crosshairs/StreamerCrosshairCard";
import { StreamerCrosshairDetailDrawer } from "@/components/crosshairs/StreamerCrosshairDetailDrawer";
import { streamerProfiles, streamerRegionCounts, streamerRegionLabels } from "@/lib/data/crosshairStreamers";
import type { StreamerRegion } from "@/lib/data/crosshairTeams/types";

const regions: Array<{ id: "all" | StreamerRegion; label: string }> = [{ id: "all", label: "全部地区" }, { id: "asia-pacific", label: "亚服" }, { id: "europe", label: "欧服" }, { id: "north-america", label: "美服" }];

export function StreamerCrosshairSection({ searchQuery }: { searchQuery: string }) {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  const region = regions.some((item) => item.id === regionParam) ? regionParam as "all" | StreamerRegion : "all";
  const streamer = searchParams.get("streamer") ?? "all";
  const crosshairId = searchParams.get("crosshair");
  const updateQuery = useCallback((updates: Record<string, string | undefined>, replace = false) => {
    const params = new URLSearchParams(searchParams.toString()); params.set("type", "streamer"); params.delete("team"); params.delete("player");
    Object.entries(updates).forEach(([key,value]) => !value || value === "all" ? params.delete(key) : params.set(key,value));
    const href = `${pathname}?${params.toString()}`;
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }, [pathname, router, searchParams]);
  const regionProfiles = useMemo(() => streamerProfiles.filter((item) => region === "all" || item.region === region), [region]);
  const visible = useMemo(() => regionProfiles.filter((item) => {
    if (streamer !== "all" && item.streamerId !== streamer) return false;
    const q = searchQuery.trim().toLocaleLowerCase(); if (!q) return true;
    return [item.displayName, item.realName, item.country, item.channelName, item.publicRank, ...item.searchAliases, ...item.crosshairs.flatMap((version) => [version.titleZh, version.titleEn, version.color, ...version.styleTags])].filter(Boolean).join(" ").toLocaleLowerCase().includes(q);
  }), [regionProfiles, searchQuery, streamer]);
  const detailProfile = crosshairId ? streamerProfiles.find((item) => item.streamerId === streamer && item.crosshairs.some((version) => version.id === crosshairId)) : undefined;
  const detailVersion = detailProfile?.crosshairs.find((version) => version.id === crosshairId);
  function closeDetails() { const trigger = detailProfile && detailVersion ? document.querySelector<HTMLElement>(`[data-streamer-detail-trigger="${detailProfile.streamerId}-${detailVersion.id}"]`) : null; updateQuery({ crosshair: undefined }, true); window.requestAnimationFrame(() => trigger?.focus()); }
  return (
    <section className="mt-12 border-t border-white/10 pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"><div className="max-w-3xl"><p className="text-xs font-semibold text-valorant">GLOBAL HIGH-RANK STREAMER CROSSHAIRS</p><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">全球高分主播准星</h2><p className="mt-4 text-base leading-7 text-zinc-300">收录亚服、欧服和美服高分 VALORANT 主播近期公开、可验证的准星设置。</p></div><dl className="grid grid-cols-4 border border-white/10 bg-panel/60"><Stat label="全部" value={streamerRegionCounts.all} /><Stat label="亚服" value={streamerRegionCounts["asia-pacific"]} /><Stat label="欧服" value={streamerRegionCounts.europe} /><Stat label="美服" value={streamerRegionCounts["north-america"]} /></dl></div>
      <p className="mt-5 text-xs leading-6 text-zinc-600">主播可能随时更改准星或游戏账号。这里展示的是 ClutchNest 最近能够合理核验的公开版本，计划每 30 天复核一次。</p>
      <div className="mt-8 border-y border-white/10 py-4"><div className="flex gap-2 overflow-x-auto pb-1" aria-label="主播地区筛选">{regions.map((item) => <button key={item.id} type="button" aria-pressed={region === item.id} onClick={() => updateQuery({ region: item.id, streamer: undefined, crosshair: undefined })} className={`min-h-10 shrink-0 rounded-md border px-3 text-sm transition ${region === item.id ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}>{item.label} <span className={region === item.id ? "text-black/60" : "text-zinc-600"}>{streamerRegionCounts[item.id]}</span></button>)}</div></div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label="主播筛选"><button type="button" aria-pressed={streamer === "all"} onClick={() => updateQuery({ streamer: undefined, crosshair: undefined })} className={`min-h-12 shrink-0 rounded-md border px-4 text-sm ${streamer === "all" ? "border-white bg-white text-black" : "border-white/10 text-zinc-400"}`}>全部主播</button>{regionProfiles.map((item) => <button key={item.streamerId} type="button" aria-pressed={streamer === item.streamerId} onClick={() => updateQuery({ streamer: item.streamerId, crosshair: undefined })} className={`min-h-12 shrink-0 rounded-md border px-4 text-left transition ${streamer === item.streamerId ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}><span className="block font-semibold">{item.displayName}</span><span className={`block text-[10px] ${streamer === item.streamerId ? "text-black/60" : "text-zinc-600"}`}>{streamerRegionLabels[item.region].zh}</span></button>)}</div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">{visible.flatMap((profile) => profile.crosshairs.map((version) => <StreamerCrosshairCard key={`${profile.streamerId}-${version.id}`} profile={profile} version={version} onDetails={() => updateQuery({ streamer: profile.streamerId, crosshair: version.id })} />))}</div>
      {!visible.length ? <div className="mt-8 border border-dashed border-white/15 px-5 py-12 text-center text-sm text-zinc-500">没有找到符合当前地区、主播或关键词的准星。</div> : null}
      {detailProfile && detailVersion ? <StreamerCrosshairDetailDrawer profile={detailProfile} version={detailVersion} onClose={closeDetails} /> : null}
    </section>
  );
}
function Stat({ label, value }: { label: string; value: number }) { return <div className="border-r border-white/10 px-3 py-4 text-center last:border-r-0"><dt className="text-[10px] text-zinc-600">{label}</dt><dd className="mt-1 text-xl font-black text-white">{value}</dd></div>; }
