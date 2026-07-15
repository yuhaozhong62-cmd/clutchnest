"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CrosshairCard } from "@/components/CrosshairCard";
import { TeamCrosshairSection } from "@/components/crosshairs/TeamCrosshairSection";
import { StreamerCrosshairSection } from "@/components/crosshairs/StreamerCrosshairSection";
import { crosshairFilters, publishedCrosshairs, type CrosshairFilterId } from "@/lib/data/crosshairs";
import { edgTeamDefinition } from "@/lib/data/crosshairTeams/edg";
import { xlgTeamDefinition } from "@/lib/data/crosshairTeams/xlg";
import { prxTeamDefinition } from "@/lib/data/crosshairTeams/prx";

const primaryFilterIds: CrosshairFilterId[] = ["all", "hao-tested", "pro-reference", "dot", "cross"];
const secondaryFilterIds: CrosshairFilterId[] = ["minimal", "headshot", "high-visibility"];
const validFilterIds = new Set<CrosshairFilterId>([...primaryFilterIds, ...secondaryFilterIds]);
const teamOptions = [
  { id: "all", label: "全部" },
  { id: "hao", label: "HAO 实测" },
  { id: "edg", label: "EDG" },
  { id: "xlg", label: "XLG" },
  { id: "prx", label: "PRX" },
  { id: "streamer", label: "高分主播" },
  { id: "pro", label: "其他职业选手" }
] as const;

export function CrosshairLibrary() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const team = searchParams.get("team") ?? "all";
  const isStreamerMode = searchParams.get("type") === "streamer";
  const query = searchParams.get("q") ?? "";
  const filterParam = searchParams.get("filter") as CrosshairFilterId | null;
  const activeFilter = filterParam && validFilterIds.has(filterParam) ? filterParam : "all";
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    if (secondaryFilterIds.includes(activeFilter)) setMoreOpen(true);
  }, [activeFilter]);

  function updateQuery(key: string, value?: string, replace = false) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    if (key === "team") {
      params.delete("player");
      params.delete("crosshair");
      params.delete("type");
      params.delete("color");
      params.delete("status");
      params.delete("sort");
    }
    const suffix = params.toString();
    const href = suffix ? `${pathname}?${suffix}` : pathname;
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }

  function selectContentSource(id: (typeof teamOptions)[number]["id"]) {
    const params = new URLSearchParams(searchParams.toString());
    ["team", "player", "crosshair", "type", "color", "status", "sort", "filter", "region", "streamer"].forEach((key) => params.delete(key));
    if (id === "streamer") params.set("type", "streamer");
    else if (id !== "all") params.set("team", id);
    const suffix = params.toString();
    router.push(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
  }

  const filteredCrosshairs = useMemo(() => {
    return publishedCrosshairs.filter((crosshair) => {
      if (team === "hao" && crosshair.contentType !== "hao-tested") return false;
      if (team === "pro" && crosshair.contentType !== "pro-reference") return false;
      if (activeFilter !== "all" && activeFilter !== crosshair.contentType && !crosshair.tags.includes(activeFilter)) return false;
      if (!query.trim()) return true;
      const haystack = [crosshair.nameCn, crosshair.nameEn, crosshair.playerName, crosshair.currentTeam, crosshair.color, crosshair.style, ...crosshair.tags].filter(Boolean).join(" ").toLocaleLowerCase();
      return haystack.includes(query.trim().toLocaleLowerCase());
    });
  }, [activeFilter, query, team]);

  const filters = new Map(crosshairFilters.map((filter) => [filter.id, filter]));
  const showEdg = !isStreamerMode && (team === "all" || team === "edg");
  const showXlg = !isStreamerMode && (team === "all" || team === "xlg");
  const showPrx = !isStreamerMode && (team === "all" || team === "prx");
  const showExisting = !isStreamerMode && team !== "edg" && team !== "xlg" && team !== "prx";

  return (
    <div className="mt-10">
      <section className="border-y border-white/10 py-5">
        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] lg:items-end">
          <div className="min-w-0">
            <p className="mb-3 text-xs text-zinc-600">内容来源</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="准星队伍筛选">
              {teamOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-label={`筛选内容：${option.label}`}
                  aria-pressed={option.id === "streamer" ? isStreamerMode : !isStreamerMode && team === option.id}
                  onClick={() => selectContentSource(option.id)}
                  className={`min-h-10 shrink-0 rounded-md border px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${(option.id === "streamer" ? isStreamerMode : !isStreamerMode && team === option.id) ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <label className="min-w-0">
            <span className="mb-2 block text-xs text-zinc-600">搜索选手、中文名、颜色或准星类型</span>
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery("q", event.target.value, true)}
              placeholder="例如：康康、ZmjjKK、青色、小十字"
              className="min-h-11 w-full rounded-md border border-white/10 bg-panel px-4 text-sm text-white outline-none transition placeholder:text-zinc-700 hover:border-white/25 focus:border-white/40 focus:ring-2 focus:ring-white/20"
            />
          </label>
        </div>
      </section>

      {isStreamerMode ? <StreamerCrosshairSection searchQuery={query} /> : null}

      {showEdg ? <TeamCrosshairSection team={edgTeamDefinition} searchQuery={query} /> : null}
      {showXlg ? <TeamCrosshairSection team={xlgTeamDefinition} searchQuery={query} /> : null}
      {showPrx ? <TeamCrosshairSection team={prxTeamDefinition} searchQuery={query} /> : null}

      {showExisting ? (
        <section className="mt-14 border-t border-white/10 pt-10">
          <div className="max-w-3xl border-l-2 border-valorant pl-5">
            <h2 className="text-xl font-semibold text-white">HAO 自用与其他职业参考</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">准星没有绝对最强。优先考虑清晰度、遮挡程度，以及它是否符合你的定位与射击习惯。</p>
          </div>

          <div className="mt-8 border-y border-white/10 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {primaryFilterIds.map((id) => {
                  const filter = filters.get(id)!;
                  const label = id === "pro-reference" ? "职业选手" : filter.labelCn;
                  return <FilterButton key={id} id={id} label={label} active={activeFilter === id} onSelect={(value) => updateQuery("filter", value)} />;
                })}
              </div>
              <p className="shrink-0 text-sm text-zinc-500">{filteredCrosshairs.length} 个准星</p>
            </div>

            <div className="mt-3">
              <button type="button" aria-label="展开或收起更多准星筛选" aria-expanded={moreOpen} aria-controls="secondary-crosshair-filters" onClick={() => setMoreOpen((value) => !value)} className="rounded-md px-1 py-2 text-sm text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                更多筛选 <span className="ml-1" aria-hidden="true">{moreOpen ? "−" : "+"}</span>
              </button>
              {moreOpen ? (
                <div id="secondary-crosshair-filters" className="mt-2 flex flex-wrap gap-2">
                  {secondaryFilterIds.map((id) => {
                    const filter = filters.get(id)!;
                    const label = id === "minimal" ? "极简" : filter.labelCn;
                    return <FilterButton key={id} id={id} label={label} active={activeFilter === id} onSelect={(value) => updateQuery("filter", value)} />;
                  })}
                </div>
              ) : <div id="secondary-crosshair-filters" />}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {filteredCrosshairs.map((crosshair) => <CrosshairCard key={crosshair.id} crosshair={crosshair} />)}
          </div>

          {!filteredCrosshairs.length ? (
            <div className="mt-8 border border-dashed border-white/15 px-5 py-12 text-center text-sm text-zinc-500">没有找到符合条件的已有准星内容。</div>
          ) : null}
        </section>
      ) : null}

      <p className="mt-10 text-sm text-zinc-500">更多 HAO 实测内容、职业选手与高分主播公开设置会持续更新。</p>
    </div>
  );
}

function FilterButton({ id, label, active, onSelect }: { id: CrosshairFilterId; label: string; active: boolean; onSelect: (id: CrosshairFilterId) => void }) {
  return (
    <button type="button" aria-label={`筛选准星：${label}`} aria-pressed={active} onClick={() => onSelect(id)} className={`min-h-10 rounded-md border px-3 py-2 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${active ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-400 hover:border-white/30 hover:text-white"}`}>
      {label}
    </button>
  );
}
