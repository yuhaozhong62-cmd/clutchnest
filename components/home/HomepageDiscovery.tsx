import Link from "next/link";
import { formatDateCn } from "@/lib/search/formatDate";
import { edgTeamDefinition } from "@/lib/data/crosshairTeams/edg";
import { prxTeamDefinition } from "@/lib/data/crosshairTeams/prx";
import type { CrosshairTeamDefinition } from "@/lib/data/crosshairTeams/types";
import { xlgTeamDefinition } from "@/lib/data/crosshairTeams/xlg";
import { publishedCypherAscentTactics } from "@/lib/data/tactics/cypher/ascent";
import { searchIndex } from "@/lib/search/buildSearchIndex";

const teams = [edgTeamDefinition, xlgTeamDefinition, prxTeamDefinition];

export function HomepageDiscovery() {
  const teamUpdates = searchIndex.filter((item) => item.type === "team");
  const latestTactic = [...searchIndex]
    .filter((item) => item.type === "tactic" && item.updatedAt)
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0];
  const haoUpdate = [...searchIndex]
    .filter((item) => item.type === "crosshair" && item.featured && item.updatedAt)
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0];
  const latestUpdates = [...teamUpdates, ...(latestTactic ? [latestTactic] : []), ...(haoUpdate ? [haoUpdate] : [])]
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 5);
  const defenseCount = publishedCypherAscentTactics.filter((tactic) => tactic.side === "defense").length;
  const attackCount = publishedCypherAscentTactics.filter((tactic) => tactic.side === "attack").length;

  return (
    <>
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading title="最新更新" subtitle="Latest Updates" href="/search" linkLabel="搜索全部内容" />
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {latestUpdates.map((item) => (
              <Link key={item.id} href={item.href} className="group grid gap-2 py-5 transition hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-3">
                <div className="min-w-0"><p className="font-semibold text-white">{item.title}</p><p className="mt-1 line-clamp-1 text-sm text-zinc-500">{item.description}</p></div>
                <div className="flex items-center gap-4 text-xs text-zinc-600"><span>{item.updatedAt ? formatDateCn(item.updatedAt) : "更新时间未记录"}</span><span className="transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true">→</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading title="精选内容" subtitle="Featured Content" href="/crosshairs" linkLabel="进入准星库" />
          <Link href="/crosshairs?type=streamer" className="group mt-8 grid gap-4 rounded-md border border-white/10 bg-black/30 p-5 transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div><p className="text-xs font-semibold text-valorant">GLOBAL HIGH-RANK STREAMERS</p><h3 className="mt-2 text-2xl font-semibold text-white">全球高分主播准星</h3><p className="mt-3 text-sm leading-7 text-zinc-500">亚太、欧洲和北美共 10 位高分主播的近期公开设置、完整代码与原创参数分析。</p></div>
            <span className="text-sm font-semibold text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-white">查看主播准星 →</span>
          </Link>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {teams.map((team) => <FeaturedTeam key={team.id} team={team} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading title="最新英雄打法" subtitle="Latest Agent Tactics" href="/agents/cypher/ascent" linkLabel="打开互动地图" />
          <Link href="/agents/cypher/ascent" className="group mt-8 grid gap-6 border-y border-white/10 py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div><p className="text-xs font-semibold text-valorant">保安 · 空岛</p><h3 className="mt-2 text-2xl font-semibold text-white">Cypher × Ascent 战术库</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">摄像头、陷阱线、烟笼、防绕后、回防和包后残局的互动战术内容。</p></div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 text-center md:w-80">
              <DiscoveryStat label="已发布" value={publishedCypherAscentTactics.length} />
              <DiscoveryStat label="防守" value={defenseCount} />
              <DiscoveryStat label="进攻" value={attackCount} />
            </dl>
          </Link>
        </div>
      </section>
    </>
  );
}

function FeaturedTeam({ team }: { team: CrosshairTeamDefinition }) {
  const profiles = team.profiles.filter((profile) => profile.isCurrentRoster);
  const versions = profiles.flatMap((profile) => profile.crosshairs);
  const verified = versions.filter((version) => version.verificationStatus === "verified").length;
  return (
    <Link href={`/crosshairs?team=${team.id}`} className="group rounded-md border border-white/10 bg-black/30 p-5 transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
      <div className="flex items-center justify-between gap-3"><span className="grid h-10 w-10 place-items-center bg-white text-xs font-black text-black">{team.shortName}</span><span className="text-xs text-zinc-600">{team.fullName}</span></div>
      <h3 className="mt-5 text-xl font-semibold text-white">{team.shortName} 现役准星</h3>
      <p className="mt-3 text-sm text-zinc-500">{profiles.length} 名现役选手 · {versions.length} 条记录 · {verified} 条已验证</p>
      <p className="mt-5 text-sm font-semibold text-zinc-300 transition group-hover:text-white">查看专题 <span aria-hidden="true">→</span></p>
    </Link>
  );
}

function SectionHeading({ title, subtitle, href, linkLabel }: { title: string; subtitle: string; href: string; linkLabel: string }) {
  return <div className="flex items-end justify-between gap-5"><div><h2 className="text-3xl font-semibold text-white">{title}</h2><p className="mt-2 text-sm text-zinc-600">{subtitle}</p></div><Link href={href} className="shrink-0 text-sm font-semibold text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">{linkLabel} <span aria-hidden="true">→</span></Link></div>;
}

function DiscoveryStat({ label, value }: { label: string; value: number }) {
  return <div className="bg-[#090909] px-3 py-4"><dt className="text-lg font-semibold text-white">{value}</dt><dd className="mt-1 text-[10px] text-zinc-600">{label}</dd></div>;
}
