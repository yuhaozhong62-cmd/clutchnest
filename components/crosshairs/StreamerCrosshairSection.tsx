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
    <section className="mt-20 border-t border-white/[0.08] pt-12 sm:pt-14">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold text-valorant">高分主播公开设置</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">全球高分主播准星</h2>
        <p className="mt-4 text-base leading-7 text-zinc-300">收录亚服、欧服和美服高分 VALORANT 主播近期公开、可验证的准星设置。</p>
      </div>
      <p className="mt-5 text-xs leading-6 text-zinc-500">共 {streamerRegionCounts.all} 位主播 · 亚服 {streamerRegionCounts["asia-pacific"]} · 欧服 {streamerRegionCounts.europe} · 美服 {streamerRegionCounts["north-america"]}。主播可能随时更改准星，计划每 30 天复核一次。</p>

      <div className="mt-8 border-y border-white/[0.08] py-4">
        <p className="mb-3 text-xs font-medium text-zinc-400">地区</p>
        <div className="filter-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" aria-label="主播地区筛选">
          {regions.map((item) => (
            <button key={item.id} type="button" aria-pressed={region === item.id} onClick={() => updateQuery({ region: item.id, streamer: undefined, crosshair: undefined })} className="filter-pill shrink-0 px-3.5 text-sm focus-visible:outline-none">
              {item.label} <span className="ml-1 text-zinc-500">{streamerRegionCounts[item.id]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs text-zinc-600">主播</p>
        <div className="filter-scroll -mx-1 flex gap-1 overflow-x-auto px-1 pb-2" aria-label="主播筛选">
          <StreamerTab label="全部主播" detail={`${regionProfiles.length} 位`} active={streamer === "all"} onClick={() => updateQuery({ streamer: undefined, crosshair: undefined })} />
          {regionProfiles.map((item) => (
            <StreamerTab key={item.streamerId} label={item.displayName} detail={streamerRegionLabels[item.region].zh} active={streamer === item.streamerId} onClick={() => updateQuery({ streamer: item.streamerId, crosshair: undefined })} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">{visible.flatMap((profile) => profile.crosshairs.map((version) => <StreamerCrosshairCard key={`${profile.streamerId}-${version.id}`} profile={profile} version={version} onDetails={() => updateQuery({ streamer: profile.streamerId, crosshair: version.id })} />))}</div>
      {!visible.length ? <div className="mt-8 border border-dashed border-white/15 px-5 py-12 text-center text-sm text-zinc-500">没有找到符合当前地区、主播或关键词的准星。</div> : null}
      {detailProfile && detailVersion ? <StreamerCrosshairDetailDrawer profile={detailProfile} version={detailVersion} onClose={closeDetails} /> : null}
    </section>
  );
}

function StreamerTab({ label, detail, active, onClick }: { label: string; detail: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 rounded-md border px-3 text-left transition focus-visible:outline focus-visible:outline-1 focus-visible:outline-valorant/70 ${active ? "border-white/20 bg-white/[0.045] text-white" : "border-transparent text-zinc-400 hover:border-white/10 hover:text-white"}`}
    >
      <span className="block text-sm font-medium">{label}</span>
      <span className="block text-[10px] text-zinc-600">{detail}</span>
    </button>
  );
}
