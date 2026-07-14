import { publishedAgents } from "@/lib/data/agents";
import { publishedCrosshairs, crosshairFilters } from "@/lib/data/crosshairs";
import { edgTeamDefinition } from "@/lib/data/crosshairTeams/edg";
import { prxTeamDefinition } from "@/lib/data/crosshairTeams/prx";
import type { CrosshairTeamDefinition } from "@/lib/data/crosshairTeams/types";
import { xlgTeamDefinition } from "@/lib/data/crosshairTeams/xlg";
import { currentMaps } from "@/lib/data/maps";
import { publishedCypherAscentTactics, tacticUtilityLabels } from "@/lib/data/tactics/cypher/ascent";
import { normalizeSearchQuery } from "@/lib/search/normalizeSearchQuery";
import type { SearchIndexItem } from "@/lib/search/types";

const teams = [edgTeamDefinition, xlgTeamDefinition, prxTeamDefinition];
const filterLabels = new Map(crosshairFilters.map((filter) => [filter.id, [filter.labelCn, filter.labelEn]]));
const utilityAliases = {
  camera: ["摄像头", "camera"],
  tripwire: ["陷阱线", "绊线", "tripwire"],
  cage: ["烟笼", "cage"],
  setup: ["完整 Setup", "默认 Setup", "setup"],
  retake: ["回防", "Retake"],
  postPlant: ["包后", "残局", "Post-Plant"],
  flankWatch: ["防绕后", "Flank Watch"]
} as const;

function createItem(item: Omit<SearchIndexItem, "searchText">): SearchIndexItem {
  const searchText = normalizeSearchQuery([
    item.title,
    item.subtitle,
    item.description,
    ...item.keywords,
    ...item.aliases,
    ...item.tags
  ].filter(Boolean).join(" "));
  return { ...item, searchText };
}

function buildLibraryCrosshairs(): SearchIndexItem[] {
  return publishedCrosshairs
    .filter((crosshair) => crosshair.contentType !== "sample")
    .map((crosshair) => {
      const tagLabels = crosshair.tags.flatMap((tag) => filterLabels.get(tag) ?? [tag]);
      const contentLabel = crosshair.contentType === "hao-tested" ? "HAO 实测" : "职业选手参考";
      return createItem({
        id: `crosshair:library:${crosshair.id}`,
        type: "crosshair",
        title: crosshair.nameCn,
        subtitle: crosshair.nameEn,
        description: crosshair.recommendedForCn,
        href: `/crosshairs/${crosshair.id}`,
        keywords: [crosshair.code, crosshair.color, crosshair.style, contentLabel, `${crosshair.color.split("/")[0].trim()}准星`, ...(crosshair.playerName ? [crosshair.playerName] : [])],
        aliases: [crosshair.id, crosshair.nameEn, ...(crosshair.playerName ? [crosshair.playerName] : [])],
        tags: [...tagLabels, contentLabel],
        image: crosshair.image,
        status: "published",
        featured: crosshair.featured && crosshair.contentType === "hao-tested",
        updatedAt: crosshair.lastUpdated,
        meta: {
          code: crosshair.code,
          player: crosshair.playerName ?? (crosshair.contentType === "hao-tested" ? "HAO" : undefined),
          team: crosshair.currentTeam,
          style: crosshair.style
        }
      });
    });
}

function buildTeamItems(team: CrosshairTeamDefinition): SearchIndexItem[] {
  const currentProfiles = team.profiles.filter((profile) => profile.isCurrentRoster);
  const teamCrosshairCount = team.profiles.reduce((total, profile) => total + profile.crosshairs.length, 0);
  const verifiedCount = team.profiles.flatMap((profile) => profile.crosshairs)
    .filter((version) => version.verificationStatus === "verified").length;

  const teamItem = createItem({
    id: `team:${team.id}`,
    type: "team",
    title: team.shortName,
    subtitle: team.fullName,
    description: team.descriptionZh,
    href: `/crosshairs?team=${team.id}`,
    keywords: [team.titleZh, team.titleEn, "战队准星", "职业选手准星"],
    aliases: team.searchAliases,
    tags: ["战队", "现役阵容", "职业选手参考"],
    teamId: team.id,
    status: "published",
    featured: true,
    updatedAt: team.rosterVerifiedAt,
    meta: { playerCount: currentProfiles.length, crosshairCount: teamCrosshairCount, verifiedCount }
  });

  const profileItems = team.profiles.flatMap((profile) => {
    const playerItem = createItem({
      id: `player:${team.id}:${profile.playerId}`,
      type: "player",
      title: profile.displayName,
      subtitle: [profile.nameZh, profile.realNameZh].filter(Boolean).join(" · "),
      description: `${profile.isCurrentRoster ? `${team.shortName} 现役选手` : `${team.shortName} 历史资料`}，已收录 ${profile.crosshairs.length} 条准星记录。`,
      href: `/crosshairs?team=${team.id}&player=${profile.playerId}`,
      keywords: [team.shortName, team.fullName, profile.role ?? "", "职业选手", "准星"],
      aliases: [profile.playerId, profile.displayName, profile.nameZh ?? "", profile.realNameZh, ...(profile.searchAliases ?? [])].filter(Boolean),
      tags: [profile.isCurrentRoster ? "现役" : "历史资料", profile.rosterStatus],
      teamId: team.id,
      playerId: profile.playerId,
      status: "published",
      updatedAt: profile.rosterVerifiedAt,
      meta: { team: profile.isCurrentRoster ? team.shortName : "历史资料", role: profile.role, crosshairCount: profile.crosshairs.length }
    });

    const crosshairItems = profile.crosshairs.map((version) => {
      const color = version.normalizedSettings?.colorName;
      const styleKeywords = version.styleTags.flatMap((tag) => tag.includes("点") ? [tag, "点准星"] : [tag]);
      return createItem({
        id: `crosshair:${team.id}:${profile.playerId}:${version.id}`,
        type: "crosshair",
        title: version.titleZh,
        subtitle: version.titleEn,
        description: version.summaryZh,
        href: `/crosshairs?team=${team.id}&player=${profile.playerId}&crosshair=${version.id}`,
        keywords: [version.code ?? "", team.shortName, team.fullName, profile.displayName, profile.realNameZh, color ?? "", color ? `${color}准星` : "", "职业选手参考"],
        aliases: [version.slug, profile.playerId, profile.displayName, profile.nameZh ?? "", ...(profile.searchAliases ?? [])].filter(Boolean),
        tags: [...styleKeywords, "职业选手参考", version.verificationStatus],
        teamId: team.id,
        playerId: profile.playerId,
        status: "published",
        updatedAt: version.lastVerifiedAt ?? profile.rosterVerifiedAt,
        meta: { code: version.code, player: profile.displayName, team: team.shortName, style: version.styleTags.join(" · ") }
      });
    });

    return [playerItem, ...crosshairItems];
  });

  return [teamItem, ...profileItems];
}

function buildAgentItems(): SearchIndexItem[] {
  return publishedAgents.map((agent) => {
    const guideCount = agent.id === "cypher" ? 1 : 0;
    return createItem({
      id: `agent:${agent.id}`,
      type: "agent",
      title: agent.name,
      subtitle: `${agent.roleCn} · ${agent.roleEn}`,
      description: agent.shortDescriptionCn,
      href: `/agents-maps?agent=${agent.id}`,
      keywords: [agent.role, agent.roleCn, agent.roleEn, "英雄", "Agent"],
      aliases: [agent.id, agent.name, ...(agent.aliases ?? [])],
      tags: [agent.roleCn, agent.roleEn],
      agentId: agent.id,
      image: agent.portrait || undefined,
      status: "published",
      updatedAt: agent.verifiedAt,
      meta: { role: agent.roleCn, guideCount }
    });
  });
}

function buildMapItems(): SearchIndexItem[] {
  return currentMaps.map((map) => {
    const guideCount = map.id === "ascent" ? 1 : 0;
    return createItem({
      id: `map:${map.id}`,
      type: "map",
      title: map.name,
      subtitle: map.aliases?.join(" · "),
      description: map.shortDescriptionCn,
      href: `/agents-maps?map=${map.id}`,
      keywords: [map.rotationPatch, `${map.sites} 个据点`, "地图", "Map"],
      aliases: [map.id, map.name, map.officialNameCn ?? "", ...(map.aliases ?? [])].filter(Boolean),
      tags: ["当前地图池", `${map.sites} 个据点`],
      mapId: map.id,
      image: map.coverImage,
      status: "published",
      updatedAt: map.verifiedAt,
      meta: { currentRotation: "当前赛季地图池", guideCount }
    });
  });
}

function buildTacticItems(): SearchIndexItem[] {
  return publishedCypherAscentTactics.map((tactic) => {
    const sideZh = tactic.side === "defense" ? "防守" : "进攻";
    const siteLetter = tactic.site.split(" ")[0];
    const utilityKeywords = tactic.utilityTypes.flatMap((utility) => [
      tacticUtilityLabels[utility],
      ...(utilityAliases[utility] ?? [])
    ]);
    return createItem({
      id: `tactic:cypher:ascent:${tactic.id}`,
      type: "tactic",
      title: tactic.titleZh,
      subtitle: tactic.titleEn,
      description: tactic.shortDescriptionZh,
      href: `/agents/cypher/ascent?tactic=${tactic.slug}`,
      keywords: ["Cypher", "保安", "赛博", "Ascent", "空岛", sideZh, tactic.site, tactic.area, `${siteLetter} 点${sideZh}`, `${siteLetter} 点 ${sideZh}`, ...tactic.categories, ...utilityKeywords],
      aliases: [tactic.slug, tactic.titleEn],
      tags: [sideZh, tactic.area, ...tactic.categories, ...utilityKeywords],
      agentId: "cypher",
      mapId: "ascent",
      tacticId: tactic.id,
      image: tactic.images[0]?.src,
      status: "published",
      updatedAt: tactic.lastVerifiedAt,
      meta: {
        side: sideZh,
        area: tactic.area,
        utility: utilityKeywords.slice(0, 3).join(" · "),
        difficulty: tactic.difficulty
      }
    });
  });
}

export function buildSearchIndex(): SearchIndexItem[] {
  return [
    ...buildLibraryCrosshairs(),
    ...teams.flatMap(buildTeamItems),
    ...buildAgentItems(),
    ...buildMapItems(),
    ...buildTacticItems()
  ].filter((item) => item.status === "published");
}

export const searchIndex = buildSearchIndex();
