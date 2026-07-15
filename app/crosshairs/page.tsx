import type { Metadata } from "next";
import { Suspense } from "react";
import { CrosshairLibrary } from "@/components/CrosshairLibrary";
import { edgCurrentRosterProfiles } from "@/lib/data/crosshairTeams/edg";
import { xlgCurrentRosterProfiles } from "@/lib/data/crosshairTeams/xlg";
import { prxCurrentRosterProfiles } from "@/lib/data/crosshairTeams/prx";

type CrosshairsPageProps = {
  searchParams: Promise<{ team?: string | string[]; type?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: CrosshairsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const team = Array.isArray(params.team) ? params.team[0] : params.team;
  const contentType = Array.isArray(params.type) ? params.type[0] : params.type;
  if (contentType === "streamer") {
    const title = "全球高分主播准星代码";
    const description = "查看亚服、欧服和美服高分 VALORANT 主播近期公开、可验证的准星代码、详细参数与原创预览。";
    return { title, description, alternates: { canonical: "/crosshairs" }, openGraph: { title: `${title}｜ClutchNest`, description, url: "/crosshairs?type=streamer" } };
  }
  const roster = team === "prx"
    ? prxCurrentRosterProfiles
    : team === "xlg"
      ? xlgCurrentRosterProfiles
      : team === "edg"
        ? edgCurrentRosterProfiles
        : undefined;
  const teamName = team === "prx" ? "PRX" : team === "xlg" ? "XLG" : team === "edg" ? "EDG" : undefined;
  const title = teamName ? `${teamName} 现役选手准星代码` : "Valorant 准星库";
  const playerNames = roster?.map((profile) => profile.displayName).join("、");
  const description = teamName && playerNames
    ? `查看 ${playerNames} 等 ${teamName} 现役选手近期可验证的 VALORANT 准星代码、参数与原创预览。`
    : "浏览 HAO 实测准星与近期核验的职业选手 VALORANT 准星代码、参数和原创预览。";

  return {
    title,
    description,
    alternates: { canonical: "/crosshairs" },
    openGraph: {
      title: `${title}｜ClutchNest`,
      description,
      url: "/crosshairs"
    }
  };
}

export default function CrosshairsPage() {
  return (
    <div className="site-container page-shell">
      <div className="page-header">
        <h1 className="page-title">准星库</h1>
        <p className="mt-2 page-kicker">Crosshair Library</p>
        <p className="mt-5 page-lead">
          这里会收集 HAO 实测准星与最近核验的职业选手公开设置，包括使用分析、适合人群、优点和缺点。
        </p>
        <p className="mt-2 support-copy">
          HAO-tested crosshairs and recently verified professional references with practical analysis.
        </p>
      </div>
      <Suspense fallback={<div className="mt-10 min-h-64 border-y border-white/10 py-10 text-sm text-zinc-600">正在载入准星数据…</div>}>
        <CrosshairLibrary />
      </Suspense>
    </div>
  );
}
