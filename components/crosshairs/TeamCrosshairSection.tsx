"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProCrosshairCard } from "@/components/crosshairs/ProCrosshairCard";
import { ProCrosshairDetailDrawer } from "@/components/crosshairs/ProCrosshairDetailDrawer";
import type {
  CrosshairTeamDefinition,
  CrosshairVersion,
  ProPlayerCrosshairProfile
} from "@/lib/data/crosshairTeams/types";
import { getCrosshairVersion } from "@/lib/data/crosshairTeams/utils";

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
  { value: "default", label: "推荐顺序" },
  { value: "recent", label: "最近核实" },
  { value: "player", label: "选手名称" },
  { value: "type", label: "准星类型" }
];

export function TeamCrosshairSection({
  team,
  searchQuery
}: {
  team: CrosshairTeamDefinition;
  searchQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPlayer = searchParams.get("player") ?? "all";
  const selectedCrosshair = searchParams.get("crosshair") ?? undefined;
  const typeFilter = searchParams.get("type") ?? "全部类型";
  const colorFilter = searchParams.get("color") ?? "全部颜色";
  const dataStatus = searchParams.get("status") ?? "all";
  const sort = searchParams.get("sort") ?? "default";
  const currentProfiles = useMemo(() => team.profiles.filter((profile) => profile.isCurrentRoster), [team.profiles]);
  const archivedProfiles = useMemo(() => team.profiles.filter((profile) => !profile.isCurrentRoster), [team.profiles]);

  const updateQuery = useCallback((updates: Record<string, string | undefined>, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("team", team.id);
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all" || value.startsWith("全部")) params.delete(key);
      else params.set(key, value);
    }
    const href = `${pathname}?${params.toString()}`;
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }, [pathname, router, searchParams, team.id]);

  const visibleCards = useMemo(() => {
    const archivedSearchMatch = Boolean(searchQuery.trim()) && archivedProfiles.some((profile) => matchesPlayerIdentity(profile, searchQuery));
    const selectedIsArchived = archivedProfiles.some((profile) => profile.playerId === selectedPlayer);
    const includeHistory = dataStatus === "history" || selectedIsArchived || archivedSearchMatch;
    let profiles = selectedPlayer === "all"
      ? includeHistory ? [...currentProfiles, ...archivedProfiles] : currentProfiles
      : team.profiles.filter((profile) => profile.playerId === selectedPlayer);

    profiles = profiles.filter((profile) => matchesSearch(team, profile, searchQuery));

    const cards = profiles.flatMap((profile) => {
      const versions = dataStatus === "history"
        ? profile.crosshairs.filter((version) => version.versionStatus === "previous")
        : [getCrosshairVersion(profile)];
      return versions.map((version) => ({ profile, version }));
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
      if (sort === "recent") return (b.version.lastVerifiedAt ?? "").localeCompare(a.version.lastVerifiedAt ?? "");
      if (sort === "player") return a.profile.displayName.localeCompare(b.profile.displayName);
      if (sort === "type") return (a.version.styleTags[0] ?? "").localeCompare(b.version.styleTags[0] ?? "");
      if (team.defaultSortMode === "roster") return team.profiles.indexOf(a.profile) - team.profiles.indexOf(b.profile);
      const rankDifference = getVersionRank(a.version) - getVersionRank(b.version);
      if (rankDifference) return rankDifference;
      return team.profiles.indexOf(a.profile) - team.profiles.indexOf(b.profile);
    });
  }, [archivedProfiles, colorFilter, currentProfiles, dataStatus, searchQuery, selectedPlayer, sort, team, typeFilter]);

  const detailProfile = selectedCrosshair && selectedPlayer !== "all"
    ? team.profiles.find((profile) => profile.playerId === selectedPlayer)
    : undefined;
  const detailVersion = detailProfile && selectedCrosshair ? getCrosshairVersion(detailProfile, selectedCrosshair) : undefined;
  const counts = getStatusCounts(currentProfiles);

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
    <section id={`${team.id}-crosshairs`} className="mt-16 scroll-mt-24 border-t border-white/[0.08] pt-12">
      <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-white/20 bg-white text-xs font-black text-black">{team.shortName}</span>
            <span className="rounded-full border border-valorant/30 px-3 py-1 text-xs font-semibold text-valorant">现役阵容</span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">{team.titleZh}</h2>
          <p className="mt-2 text-sm text-zinc-500">{team.titleEn}</p>
          <p className="mt-4 text-base leading-7 text-zinc-300">{team.descriptionZh}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500">{team.contextZh}</p>
      </div>
      <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 border-y border-white/[0.08] py-4 text-sm text-zinc-400">
        <span>{currentProfiles.length} 位现役选手</span><span aria-hidden="true" className="text-zinc-700">·</span>
        <span>{counts.verified} 条已验证</span><span aria-hidden="true" className="text-zinc-700">·</span>
        <span>{counts.likely} 条较可信</span><span aria-hidden="true" className="text-zinc-700">·</span>
        <span>核验于 {team.rosterVerifiedAt}</span>
      </p>
      <p className="mt-3 text-xs leading-6 text-zinc-500">{team.rosterNoteZh}{counts.pending ? ` · ${counts.pending} 条待核实` : ""}{counts.history ? ` · ${counts.history} 条历史版本` : ""}</p>

      <div className="mt-8 overflow-x-auto border-y border-white/[0.08] py-4" aria-label={`${team.shortName} 选手筛选`}>
        <div className="flex min-w-max gap-2">
          <PlayerTab label="全部" subLabel={`${currentProfiles.length} 人`} active={selectedPlayer === "all"} onClick={() => updateQuery({ player: undefined, crosshair: undefined })} />
          {currentProfiles.map((profile) => (
            <PlayerTab
              key={profile.playerId}
              label={profile.displayName}
              subLabel={`${profile.realNameZh} · ${getCrosshairVersion(profile).code ? "有代码" : "待核实"}`}
              active={selectedPlayer === profile.playerId}
              onClick={() => updateQuery({ player: profile.playerId, crosshair: undefined })}
            />
          ))}
          {archivedProfiles.map((profile) => (
            <PlayerTab
              key={profile.playerId}
              label={`历史：${profile.displayName}`}
              subLabel="已离队"
              active={selectedPlayer === profile.playerId}
              onClick={() => updateQuery({ player: profile.playerId, crosshair: undefined })}
              muted
            />
          ))}
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
          <p className="font-semibold text-white">没有符合条件的 {team.shortName} 准星</p>
          <p className="mt-2 text-sm text-zinc-500">请清除部分筛选条件，或等待下一次数据核实。</p>
        </div>
      ) : null}

      <div className="mt-10 border-l-2 border-valorant pl-5 text-sm leading-7 text-zinc-500">
        <p>{team.disclaimerZh}</p>
        <p className="mt-1 text-xs text-zinc-600">{team.disclaimerEn}</p>
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

function matchesSearch(team: CrosshairTeamDefinition, profile: ProPlayerCrosshairProfile, rawQuery: string) {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return true;
  const haystack = [
    ...team.searchAliases,
    profile.displayName,
    profile.nameZh,
    profile.realNameZh,
    ...(profile.searchAliases ?? []),
    ...profile.crosshairs.flatMap((version) => [version.titleZh, version.titleEn, version.summaryZh, ...version.styleTags])
  ].filter(Boolean).join(" ").toLocaleLowerCase();
  return haystack.includes(query);
}

function matchesPlayerIdentity(profile: ProPlayerCrosshairProfile, rawQuery: string) {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return false;
  return [profile.playerId, profile.displayName, profile.nameZh, profile.realNameZh, ...(profile.searchAliases ?? [])]
    .filter(Boolean)
    .some((value) => value?.toLocaleLowerCase().includes(query));
}

function getVersionRank(version: CrosshairVersion) {
  if (version.versionStatus === "primary" && version.verificationStatus === "verified") return 0;
  if (version.versionStatus === "primary" && version.verificationStatus === "likely") return 1;
  if (version.versionStatus === "alternative") return 2;
  if (version.versionStatus === "previous") return 3;
  return 4;
}

function getStatusCounts(profiles: ProPlayerCrosshairProfile[]) {
  return profiles.reduce((counts, profile) => {
    const status = getCrosshairVersion(profile).verificationStatus;
    if (status === "verified") counts.verified += 1;
    else if (status === "likely") counts.likely += 1;
    else counts.pending += 1;
    counts.history += profile.crosshairs.filter((version) => version.versionStatus === "previous").length;
    return counts;
  }, { verified: 0, likely: 0, pending: 0, history: 0 });
}

function PlayerTab({ label, subLabel, active, muted = false, onClick }: { label: string; subLabel: string; active: boolean; muted?: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-label={`${label}，${subLabel}`} onClick={onClick} aria-pressed={active} className="filter-pill min-h-14 px-4 text-left focus-visible:outline-none">
      <span className={`block text-sm font-semibold ${muted && !active ? "text-zinc-500" : "text-white"}`}>{label}</span>
      <span className="mt-0.5 block text-[11px] text-zinc-500">{subLabel}</span>
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
