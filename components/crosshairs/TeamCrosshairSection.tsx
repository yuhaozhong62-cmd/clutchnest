"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProCrosshairCard } from "@/components/crosshairs/ProCrosshairCard";
import { ProCrosshairDetailDrawer } from "@/components/crosshairs/ProCrosshairDetailDrawer";
import {
  edgArchivedProfiles,
  edgCrosshairProfiles,
  edgCurrentRosterProfiles,
  edgRosterVerifiedAt,
  getCrosshairVersion,
  getEdgProfile
} from "@/lib/data/crosshairTeams/edg";
import type { CrosshairVersion, ProPlayerCrosshairProfile } from "@/lib/data/crosshairTeams/types";

const typeOptions = ["全部类型", "小十字", "中型十字", "点状", "中心点加内线", "有描边", "无描边"];
const colorOptions = ["全部颜色", "白色", "青色", "其他"];
const statusOptions = [
  { value: "all", label: "全部状态" },
  { value: "verified", label: "已验证" },
  { value: "likely", label: "较可信" },
  { value: "pending", label: "待核实" },
  { value: "history", label: "历史版本" }
];
const sortOptions = [
  { value: "recent", label: "最近核实" },
  { value: "player", label: "选手名称" },
  { value: "type", label: "准星类型" }
];

export function TeamCrosshairSection({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPlayer = searchParams.get("player") ?? "all";
  const selectedCrosshair = searchParams.get("crosshair") ?? undefined;
  const typeFilter = searchParams.get("type") ?? "全部类型";
  const colorFilter = searchParams.get("color") ?? "全部颜色";
  const dataStatus = searchParams.get("status") ?? "all";
  const sort = searchParams.get("sort") ?? "recent";

  const updateQuery = useCallback((updates: Record<string, string | undefined>, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("team", "edg");
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all" || value.startsWith("全部")) params.delete(key);
      else params.set(key, value);
    }
    const href = `${pathname}?${params.toString()}`;
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }, [pathname, router, searchParams]);

  const visibleCards = useMemo(() => {
    const includeHistory = dataStatus === "history" || selectedPlayer === "cb" || (Boolean(searchQuery.trim()) && matchesPlayerIdentity(edgArchivedProfiles[0], searchQuery));
    let profiles = includeHistory && selectedPlayer === "all"
      ? [...edgCurrentRosterProfiles, ...edgArchivedProfiles]
      : selectedPlayer === "all"
        ? edgCurrentRosterProfiles
        : edgCrosshairProfiles.filter((profile) => profile.playerId === selectedPlayer);

    profiles = profiles.filter((profile) => matchesSearch(profile, searchQuery));

    const cards = profiles.flatMap((profile) => {
      const versions = dataStatus === "history"
        ? profile.crosshairs.filter((version) => version.versionStatus === "previous")
        : [getCrosshairVersion(profile)];
      return versions.filter(Boolean).map((version) => ({ profile, version }));
    }).filter(({ version }) => {
      if (typeFilter !== "全部类型" && !version.styleTags.includes(typeFilter)) return false;
      if (colorFilter !== "全部颜色") {
        const color = version.normalizedSettings?.colorName;
        if (colorFilter === "其他" ? color === "白色" || color === "青色" : color !== colorFilter) return false;
      }
      if (dataStatus === "verified" && version.verificationStatus !== "verified") return false;
      if (dataStatus === "likely" && version.verificationStatus !== "likely") return false;
      if (dataStatus === "pending" && version.verificationStatus !== "verificationPending") return false;
      if (dataStatus === "history" && version.versionStatus !== "previous") return false;
      return true;
    });

    return cards.sort((a, b) => {
      if (sort === "player") return a.profile.displayName.localeCompare(b.profile.displayName);
      if (sort === "type") return (a.version.styleTags[0] ?? "").localeCompare(b.version.styleTags[0] ?? "");
      return (b.version.lastVerifiedAt ?? "").localeCompare(a.version.lastVerifiedAt ?? "");
    });
  }, [colorFilter, dataStatus, searchQuery, selectedPlayer, sort, typeFilter]);

  const detailProfile = selectedCrosshair && selectedPlayer !== "all" ? getEdgProfile(selectedPlayer) : undefined;
  const detailVersion = detailProfile && selectedCrosshair ? getCrosshairVersion(detailProfile, selectedCrosshair) : undefined;
  const currentAvailable = edgCurrentRosterProfiles.filter((profile) => {
    const version = getCrosshairVersion(profile);
    return Boolean(version.code) && ["verified", "likely"].includes(version.verificationStatus);
  }).length;

  function openDetails(profile: ProPlayerCrosshairProfile, version: CrosshairVersion) {
    updateQuery({ player: profile.playerId, crosshair: version.id });
  }

  function closeDetails() {
    const trigger = detailProfile && detailVersion
      ? document.querySelector<HTMLElement>(`[data-crosshair-detail-trigger="${detailProfile.playerId}-${detailVersion.id}"]`)
      : null;
    updateQuery({ crosshair: undefined }, true);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  return (
    <section id="edg-crosshairs" className="mt-12 scroll-mt-24 border-t border-white/10 pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-white/20 bg-white text-xs font-black text-black">EDG</span>
            <span className="rounded-full border border-valorant/30 px-3 py-1 text-xs font-semibold text-valorant">现役阵容</span>
          </div>
          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">EDG 现役全员准星</h2>
          <p className="mt-2 text-sm text-zinc-600">EDward Gaming Current Roster Crosshairs</p>
          <p className="mt-4 text-base leading-7 text-zinc-300">查看、比较并复制 EDG 现役选手近期可验证的 VALORANT 准星。</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500">职业选手可能随时更换准星，本站记录的是最近能够合理核实的版本。</p>
        </div>
        <dl className="grid grid-cols-3 border border-white/10 bg-panel/60 lg:min-w-80">
          <RosterStat label="现役选手" value={String(edgCurrentRosterProfiles.length)} />
          <RosterStat label="已验证 / 较可信" value={String(currentAvailable)} />
          <RosterStat label="待核实" value={String(edgCurrentRosterProfiles.length - currentAvailable)} />
        </dl>
      </div>

      <p className="mt-5 text-xs text-zinc-600">名单最后核实：{edgRosterVerifiedAt} · CB 已于 2026-07-02 离队，不计入现役统计。</p>

      <div className="mt-8 overflow-x-auto border-y border-white/10 py-4" aria-label="EDG 选手筛选">
        <div className="flex min-w-max gap-2">
          <PlayerTab label="全部" subLabel={`${edgCurrentRosterProfiles.length} 人`} active={selectedPlayer === "all"} onClick={() => updateQuery({ player: undefined, crosshair: undefined })} />
          {edgCurrentRosterProfiles.map((profile) => (
            <PlayerTab
              key={profile.playerId}
              label={profile.displayName}
              subLabel={`${profile.realNameZh} · ${getCrosshairVersion(profile).code ? "有代码" : "待核实"}`}
              active={selectedPlayer === profile.playerId}
              onClick={() => updateQuery({ player: profile.playerId, crosshair: undefined })}
            />
          ))}
          <PlayerTab label="历史：CB" subLabel="已离队" active={selectedPlayer === "cb"} onClick={() => updateQuery({ player: "cb", crosshair: undefined })} muted />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect label="准星类型" value={typeFilter} options={typeOptions.map((value) => ({ value, label: value }))} onChange={(value) => updateQuery({ type: value, crosshair: undefined })} />
        <FilterSelect label="颜色" value={colorFilter} options={colorOptions.map((value) => ({ value, label: value }))} onChange={(value) => updateQuery({ color: value, crosshair: undefined })} />
        <FilterSelect label="数据状态" value={dataStatus} options={statusOptions} onChange={(value) => updateQuery({ status: value, crosshair: undefined })} />
        <FilterSelect label="排序" value={sort} options={sortOptions} onChange={(value) => updateQuery({ sort: value, crosshair: undefined })} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {visibleCards.map(({ profile, version }) => (
          <ProCrosshairCard key={`${profile.playerId}-${version.id}`} profile={profile} version={version} onDetails={() => openDetails(profile, version)} />
        ))}
      </div>

      {!visibleCards.length ? (
        <div className="mt-8 border border-dashed border-white/15 px-5 py-12 text-center">
          <p className="font-semibold text-white">没有符合条件的 EDG 准星</p>
          <p className="mt-2 text-sm text-zinc-500">请清除部分筛选条件，或等待下一次数据核实。</p>
        </div>
      ) : null}

      <div className="mt-10 border-l-2 border-valorant pl-5 text-sm leading-7 text-zinc-500">
        <p>准星只影响视觉习惯，不会直接提高枪法。职业选手可能随时更改设置，实际设置请以选手最新公开内容为准。</p>
        <p className="mt-1 text-xs text-zinc-600">Pro players may change their settings at any time. ClutchNest records the latest version we can reasonably verify.</p>
      </div>

      {detailProfile && detailVersion ? (
        <ProCrosshairDetailDrawer
          profile={detailProfile}
          version={detailVersion}
          onSelectVersion={(version) => updateQuery({ crosshair: version.id }, true)}
          onClose={closeDetails}
        />
      ) : null}
    </section>
  );
}

function matchesSearch(profile: ProPlayerCrosshairProfile | undefined, rawQuery: string) {
  if (!profile) return false;
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return true;
  const haystack = [
    "EDG",
    "Edward Gaming",
    profile.displayName,
    profile.nameZh,
    profile.realNameZh,
    ...profile.crosshairs.flatMap((version) => [version.titleZh, version.titleEn, version.summaryZh, ...version.styleTags])
  ].filter(Boolean).join(" ").toLocaleLowerCase();
  return haystack.includes(query);
}

function matchesPlayerIdentity(profile: ProPlayerCrosshairProfile | undefined, rawQuery: string) {
  if (!profile) return false;
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return false;
  return [profile.playerId, profile.displayName, profile.nameZh, profile.realNameZh]
    .filter(Boolean)
    .some((value) => value?.toLocaleLowerCase().includes(query));
}

function RosterStat({ label, value }: { label: string; value: string }) {
  return <div className="border-r border-white/10 p-4 last:border-r-0"><dt className="text-[11px] text-zinc-600">{label}</dt><dd className="mt-2 text-2xl font-black text-white">{value}</dd></div>;
}

function PlayerTab({ label, subLabel, active, muted = false, onClick }: { label: string; subLabel: string; active: boolean; muted?: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-label={`${label}，${subLabel}`} onClick={onClick} aria-pressed={active} className={`min-h-14 rounded-md border px-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${active ? "border-white bg-white text-black" : "border-white/10 bg-transparent hover:border-white/30"}`}>
      <span className={`block text-sm font-semibold ${active ? "text-black" : muted ? "text-zinc-500" : "text-white"}`}>{label}</span>
      <span className={`mt-0.5 block text-[11px] ${active ? "text-black/60" : "text-zinc-600"}`}>{subLabel}</span>
    </button>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-zinc-600">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-md border border-white/10 bg-panel px-3 text-sm text-zinc-300 outline-none transition hover:border-white/25 focus:border-white/40 focus:ring-2 focus:ring-white/20">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
