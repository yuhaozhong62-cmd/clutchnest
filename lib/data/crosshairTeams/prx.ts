import type {
  CrosshairSource,
  CrosshairTeamDefinition,
  NormalizedCrosshairSettings,
  ProPlayerCrosshairProfile
} from "@/lib/data/crosshairTeams/types";
import { warnInvalidCrosshairCodes } from "@/lib/data/crosshairTeams/utils";

export const prxRosterVerifiedAt = "2026-07-14";

const accessedAt = "2026-07-14";
const officialTeamSource: CrosshairSource = {
  title: "Paper Rex VALORANT Team",
  url: "https://pprx.team/teams/valorant",
  sourceType: "official",
  accessedAt,
  notes: "Paper Rex 官方队伍页面，用于核对现役队伍身份。"
};
const officialRosterNews: CrosshairSource = {
  title: "Paper Rex official roster news",
  url: "https://pprx.team/news",
  sourceType: "official",
  publishedAt: "2025-12-16",
  accessedAt,
  notes: "官方公告记录 invy 加入，以及 PatMen、mindfreak 等近期人员变动。"
};
const vlrRosterSource: CrosshairSource = {
  title: "Paper Rex team profile - VLR",
  url: "https://www.vlr.gg/team/624/paper-rex",
  sourceType: "database",
  accessedAt,
  notes: "当前名单列出 f0rsakeN、d4v41、Jinggg、something、invy；教练和工作人员另列。"
};

function proSettingsSource(player: string, publishedAt: string): CrosshairSource {
  return {
    title: `${player} VALORANT Settings - ProSettings`,
    url: `https://prosettings.net/players/${player.toLowerCase()}/`,
    sourceType: "database",
    publishedAt,
    accessedAt,
    notes: "第三方职业设置数据库提供完整代码与参数；未找到选手本人同期直接展示，因此保守标记为较可信。"
  };
}

const cleanWhiteCross = (
  length: number,
  thickness: number,
  offset: number,
  outlinesEnabled: boolean
): NormalizedCrosshairSettings => ({
  colorName: "白色",
  colorHex: "#ffffff",
  outlinesEnabled,
  outlineOpacity: outlinesEnabled ? 1 : undefined,
  outlineThickness: outlinesEnabled ? 1 : undefined,
  centerDotEnabled: false,
  innerLinesEnabled: true,
  innerLineOpacity: 1,
  innerLineLength: length,
  innerLineVerticalLength: length,
  innerLineThickness: thickness,
  innerLineOffset: offset,
  innerMovementError: false,
  innerFiringError: false,
  outerLinesEnabled: false,
  outerMovementError: false,
  outerFiringError: false
});

function pendingVersion(player: string, sources: CrosshairSource[]) {
  return {
    id: "verification-pending",
    slug: "verification-pending",
    titleZh: `${player} 近期准星待核实`,
    titleEn: `${player} Recent Crosshair Pending`,
    versionStatus: "verificationPending" as const,
    verificationStatus: "verificationPending" as const,
    summaryZh: "现有公开设置页没有提供可用的完整准星代码，因此暂不生成预览，也不开放复制。",
    summaryEn: "No reliable recent full crosshair code is currently available.",
    styleTags: ["待核实"],
    recommendedFor: [],
    strengths: [],
    weaknesses: ["没有完整导入代码", "无法安全渲染真实预览"],
    verificationNotes: "ProSettings 将代码显示为 0，Specs.gg 显示 N/A；二者都不是可导入的完整代码。ClutchNest 不根据零散参数或比赛画面猜测代码。",
    sources,
    haoTestStatus: "untested" as const,
    contentType: "pro-reference" as const,
    createdBy: "ClutchNest Research" as const
  };
}

const profiles: ProPlayerCrosshairProfile[] = [
  {
    playerId: "forsaken",
    displayName: "f0rsakeN",
    realNameZh: "Jason Susanto",
    teamId: "prx",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: prxRosterVerifiedAt,
    rosterSources: [officialTeamSource, vlrRosterSource],
    role: "多位置",
    initials: "F0",
    searchAliases: ["forsaken", "Jason Susanto", "PRX f0rsakeN"],
    crosshairs: [{
      id: "primary-2026-07",
      slug: "compact-white-cross",
      titleZh: "f0rsakeN 紧凑白色十字",
      titleEn: "f0rsakeN Compact White Cross",
      code: "0;p;0;c;1;s;1;P;h;0;f;0;s;0;0l;3;0v;3;0g;1;0o;0;0a;1;0f;0;1b;0;A;o;1;d;1;0b;0;1b;0;S;d;0",
      versionStatus: "primary",
      verificationStatus: "likely",
      normalizedSettings: cleanWhiteCross(3, 2, 0, false),
      summaryZh: "短内线贴近中心，画面占用很低，保留十字方向感并强调快速中心定位。",
      summaryEn: "A compact white cross with short inner lines and minimal obstruction.",
      styleTags: ["小十字", "白色", "无描边"],
      recommendedFor: ["偏好紧凑十字", "重视中心定位", "希望降低画面遮挡"],
      strengths: ["中心反馈直接", "遮挡较少", "仍保留四向参考"],
      weaknesses: ["复杂背景可见度可能下降", "尺寸偏小需要适应", "只有单一数据库证据"],
      lastVerifiedAt: "2026-07-13",
      verificationNotes: "完整代码来自 ProSettings 最近记录；没有选手本人或第二项独立强证据，按较可信发布。",
      sources: [proSettingsSource("f0rsaken", "2026-07-13")],
      haoTestStatus: "untested",
      contentType: "pro-reference",
      createdBy: "ClutchNest Research"
    }]
  },
  {
    playerId: "d4v41",
    displayName: "d4v41",
    realNameZh: "Khalish Rusyaidee",
    teamId: "prx",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: prxRosterVerifiedAt,
    rosterSources: [officialTeamSource, vlrRosterSource],
    role: "控场 / 哨卫",
    initials: "D4",
    searchAliases: ["davai", "Davai", "Khalish Rusyaidee", "PRX d4v41"],
    crosshairs: [{
      id: "primary-2026-07",
      slug: "outlined-micro-cross",
      titleZh: "d4v41 描边微型十字",
      titleEn: "d4v41 Outlined Micro Cross",
      code: "0;P;c;8;o;1;d;1;b;1;z;1;0t;1;0l;1;0o;0;0a;1;0f;0;1b;0",
      versionStatus: "primary",
      verificationStatus: "likely",
      normalizedSettings: {
        ...cleanWhiteCross(1, 1, 0, true),
        centerDotEnabled: true,
        centerDotOpacity: 1,
        centerDotThickness: 1
      },
      summaryZh: "描边中心点叠加极短内线，轮廓紧凑，适合习惯明确中心反馈的玩家。",
      summaryEn: "A tiny outlined cross with an enabled center dot and very short inner lines.",
      styleTags: ["中心点加内线", "白色", "有描边"],
      recommendedFor: ["偏好微型准星", "需要中心点反馈", "重视低遮挡"],
      strengths: ["中心轮廓明确", "整体占用很小", "描边帮助识别"],
      weaknesses: ["细节密集且尺寸很小", "高分辨率下可能不够醒目", "只有单一数据库证据"],
      lastVerifiedAt: "2026-07-13",
      verificationNotes: "完整代码来自 ProSettings 最近记录；自定义颜色字段缺少可独立确认的十六进制值，预览仅展示来源页面记录的白色视觉。",
      sources: [proSettingsSource("d4v41", "2026-07-13")],
      haoTestStatus: "untested",
      contentType: "pro-reference",
      createdBy: "ClutchNest Research"
    }]
  },
  {
    playerId: "jinggg",
    displayName: "Jinggg",
    realNameZh: "Wang Jing Jie",
    teamId: "prx",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: prxRosterVerifiedAt,
    rosterSources: [officialTeamSource, vlrRosterSource],
    role: "决斗",
    initials: "JG",
    searchAliases: ["Jing", "Wang Jing Jie", "王靖杰", "PRX Jinggg"],
    crosshairs: [{
      id: "primary-2026-07",
      slug: "pink-compact-cross",
      titleZh: "Jinggg 粉色紧凑十字",
      titleEn: "Jinggg Pink Compact Cross",
      code: "0;s;1;P;c;8;u;FF99FFFF;o;1;b;1;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;S;c;5;o;1",
      versionStatus: "primary",
      verificationStatus: "likely",
      normalizedSettings: {
        ...cleanWhiteCross(3, 2, 2, true),
        colorName: "粉色",
        colorHex: "#ff99ff"
      },
      summaryZh: "粉色短十字配黑色描边，中心间隙清楚，在多数场景中保持较强辨识度。",
      summaryEn: "A compact pink cross with outlines and a clear center gap.",
      styleTags: ["小十字", "其他", "有描边"],
      recommendedFor: ["偏好高辨识颜色", "习惯传统十字", "需要清楚中心间隙"],
      strengths: ["粉色视觉辨识度较高", "四向参考清楚", "描边提高复杂背景可见度"],
      weaknesses: ["比点准星遮挡更多", "部分暖色场景对比度会降低", "公开来源存在未能直接核实的细微参数差异"],
      lastVerifiedAt: "2026-07-13",
      verificationNotes: "采用 ProSettings 当前完整代码。社区评论曾指向 Nightbot 的垂直长度变体，但无法直接读取并确认该命令，因此未作为可复制版本收录。",
      sources: [proSettingsSource("jinggg", "2026-07-13")],
      haoTestStatus: "untested",
      contentType: "pro-reference",
      createdBy: "ClutchNest Research"
    }]
  },
  {
    playerId: "something",
    displayName: "something",
    realNameZh: "Ilya Petrov",
    teamId: "prx",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: prxRosterVerifiedAt,
    rosterSources: [officialTeamSource, vlrRosterSource],
    role: "决斗 / 多位置",
    initials: "ST",
    searchAliases: ["Ilya Petrov", "Илья Петров", "PRX something"],
    crosshairs: [{
      id: "primary-2026-06",
      slug: "short-white-cross",
      titleZh: "something 短线白色十字",
      titleEn: "something Short White Cross",
      code: "0;s;1;P;h;0;0l;2;0o;1;0a;1;0f;0;1b;0;S;c;0;s;0.713;o;1",
      versionStatus: "primary",
      verificationStatus: "likely",
      normalizedSettings: cleanWhiteCross(2, 2, 1, false),
      summaryZh: "白色短内线围绕小中心间隙，结构简洁，在点状与传统十字之间取得平衡。",
      summaryEn: "A short white cross with a small center gap and no outlines.",
      styleTags: ["小十字", "白色", "无描边"],
      recommendedFor: ["希望保留方向参考", "偏好短内线", "重视低遮挡"],
      strengths: ["结构简洁", "中心间隙易识别", "遮挡较少"],
      weaknesses: ["白色浅色背景可能不够醒目", "尺寸较小需要适应", "只有单一近期数据库证据"],
      lastVerifiedAt: "2026-06-22",
      verificationNotes: "采用 ProSettings 2026-06-22 的较新记录。VCRDB 存在 2026-01 的不同旧代码，因时间较早且无法确认仍在使用，没有作为当前或历史可复制版本发布。",
      sources: [proSettingsSource("something", "2026-06-22")],
      haoTestStatus: "untested",
      contentType: "pro-reference",
      createdBy: "ClutchNest Research"
    }]
  },
  {
    playerId: "invy",
    displayName: "invy",
    realNameZh: "Adrian Jiggs Reyes",
    teamId: "prx",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: prxRosterVerifiedAt,
    rosterSources: [officialRosterNews, officialTeamSource, vlrRosterSource],
    role: "先锋 / 控场",
    initials: "IV",
    searchAliases: ["Adrian Jiggs Reyes", "Adrian Jiggs Aisa Reyes", "PRX invy"],
    crosshairs: [pendingVersion("invy", [
      proSettingsSource("invy", "2026-07-01"),
      {
        title: "invy VALORANT Settings - Specs.gg",
        url: "https://specs.gg/Invy",
        sourceType: "database",
        accessedAt,
        notes: "页面将 Crosshair Code 标记为 N/A。"
      }
    ])]
  }
];

export const prxCrosshairProfiles = profiles;
export const prxCurrentRosterProfiles = profiles.filter((profile) => profile.isCurrentRoster);
export const prxArchivedProfiles = profiles.filter((profile) => !profile.isCurrentRoster);

export function getPrxProfile(playerId: string) {
  return profiles.find((profile) => profile.playerId === playerId);
}

export const prxTeamDefinition: CrosshairTeamDefinition = {
  id: "prx",
  shortName: "PRX",
  fullName: "Paper Rex",
  titleZh: "PRX 现役全队准星",
  titleEn: "Paper Rex Current Roster Crosshairs",
  descriptionZh: "查看并复制 PRX 现役选手近期可验证的 VALORANT 准星设置。",
  contextZh: "职业选手可能频繁调整准星，这里展示的是 ClutchNest 最近能够合理核验的公开版本。",
  rosterVerifiedAt: prxRosterVerifiedAt,
  rosterNoteZh: "当前收录 f0rsakeN、d4v41、Jinggg、something、invy；未发现额外注册替补，教练与工作人员不计入选手名单。",
  searchAliases: ["PRX", "Paper Rex", "纸面恐龙"],
  disclaimerZh: "职业选手可能随时更换准星。ClutchNest 记录的是最近能够合理核验的公开版本，并不代表选手会永久使用该代码。使用职业选手的准星不会自动提升枪法，实际体验取决于分辨率、视觉习惯、瞄准方式和个人设置。ClutchNest 与 Paper Rex、选手本人或 Riot Games 不存在官方合作、认可或隶属关系。",
  disclaimerEn: "Pro players may change their crosshairs at any time. These entries reflect the latest public settings ClutchNest could reasonably verify. Paper Rex, its players, and Riot Games do not endorse or sponsor ClutchNest.",
  defaultSortMode: "roster",
  profiles
};

warnInvalidCrosshairCodes(profiles);
