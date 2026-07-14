import type {
  CrosshairSource,
  CrosshairTeamDefinition,
  NormalizedCrosshairSettings,
  ProPlayerCrosshairProfile
} from "@/lib/data/crosshairTeams/types";
import { warnInvalidCrosshairCodes } from "@/lib/data/crosshairTeams/utils";

export const xlgRosterVerifiedAt = "2026-07-14";

const accessedAt = "2026-07-14";
const officialLondonRoster: CrosshairSource = {
  title: "XLG 2026 无畏契约伦敦大师赛大名单",
  url: "https://www.weibo.com/7885361795/R2fQuoj0D?mod=weibotime",
  sourceType: "official",
  publishedAt: "2026-06-02",
  accessedAt,
  notes: "XLG 官方列出 happywei、Rarga、NoMan、Lysoar、WsLeo，并区分 hvoya 与 steady 为教练。"
};
const officialSharksPromotion: CrosshairSource = {
  title: "XLG Sharks 一队晋升公告",
  url: "https://m.weibo.cn/status/R8vxUtuCv",
  sourceType: "official",
  publishedAt: "2026-07-13",
  accessedAt,
  notes: "XLG 官方将 Sharks（邱戈）从二队提升至一队。"
};
const vlrRosterSource: CrosshairSource = {
  title: "Xi Lai Gaming team profile - VLR",
  url: "https://www.vlr.gg/team/13581/xi-lai-gaming",
  sourceType: "database",
  accessedAt,
  notes: "当前名单显示五名原有选手与第六人 Sharks，教练组另列。"
};
const sharksRosterReport: CrosshairSource = {
  title: "Sharks joins XLG as sixth man - VLR",
  url: "https://www.vlr.gg/715094/sharks-circles-xi-lai-gamings-roster-joins-as-sixth-man/",
  sourceType: "database",
  publishedAt: "2026-07-13",
  accessedAt,
  notes: "报道交叉确认 Sharks 为一队第六人，预计先从替补席开始。"
};

const whiteDot = (opacity: number): NormalizedCrosshairSettings => ({
  colorName: "白色",
  colorHex: "#ffffff",
  outlinesEnabled: true,
  outlineOpacity: 1,
  outlineThickness: 1,
  centerDotEnabled: true,
  centerDotOpacity: opacity,
  centerDotThickness: 2,
  innerLinesEnabled: false,
  innerMovementError: false,
  innerFiringError: false,
  outerLinesEnabled: false,
  outerMovementError: false,
  outerFiringError: false
});

const cyanCross: NormalizedCrosshairSettings = {
  colorName: "青色",
  colorHex: "#00ffff",
  outlinesEnabled: false,
  centerDotEnabled: false,
  innerLinesEnabled: true,
  innerLineOpacity: 1,
  innerLineLength: 4,
  innerLineVerticalLength: 4,
  innerLineThickness: 2,
  innerLineOffset: 2,
  innerMovementError: false,
  innerFiringError: false,
  outerLinesEnabled: false,
  outerMovementError: false,
  outerFiringError: false
};

function proSettingsSource(player: string): CrosshairSource {
  return {
    title: `${player} VALORANT Settings - ProSettings`,
    url: `https://prosettings.net/players/${player.toLowerCase()}/`,
    sourceType: "database",
    publishedAt: "2026-06-03",
    accessedAt,
    notes: "第三方职业设置数据库；没有选手本人直接展示代码的证据。"
  };
}

function pendingVersion(
  player: string,
  summaryZh: string,
  sources: CrosshairSource[],
  notes: string
) {
  return {
    id: "verification-pending",
    slug: "verification-pending",
    titleZh: `${player} 近期准星待核实`,
    titleEn: `${player} Recent Crosshair Pending`,
    versionStatus: "verificationPending" as const,
    verificationStatus: "verificationPending" as const,
    summaryZh,
    summaryEn: "No sufficiently reliable recent full crosshair code has been found yet.",
    styleTags: ["待核实"],
    recommendedFor: [],
    strengths: [],
    weaknesses: ["没有完整导入代码", "无法安全渲染真实预览"],
    verificationNotes: notes,
    sources,
    haoTestStatus: "untested" as const,
    contentType: "pro-reference" as const,
    createdBy: "ClutchNest Research" as const
  };
}

const profiles: ProPlayerCrosshairProfile[] = [
  {
    playerId: "rarga",
    displayName: "Rarga",
    realNameZh: "Arthur Churyumov",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialLondonRoster, vlrRosterSource],
    role: "决斗 / 多位置",
    initials: "RA",
    searchAliases: ["Artur Churyumov", "Артур Чурюмов"],
    crosshairs: [
      {
        id: "primary-2026-06",
        slug: "outlined-white-dot",
        titleZh: "Rarga 白色描边点准星",
        titleEn: "Rarga Outlined White Dot",
        code: "0;P;o;1;d;1;0b;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: whiteDot(1),
        summaryZh: "白色中心点配完整描边，画面简洁，强调直接的中心定位。",
        summaryEn: "A white center dot with a full outline and no inner or outer lines.",
        styleTags: ["点状", "白色", "有描边"],
        recommendedFor: ["偏好点准星", "重视中心定位", "习惯较低画面遮挡"],
        strengths: ["中心位置直接", "画面遮挡较少", "描边提升复杂背景可见度"],
        weaknesses: ["尺寸较小需要适应", "缺少方向线参考", "不会自动改善枪法"],
        lastVerifiedAt: "2026-06-03",
        verificationNotes: "ProSettings 与 VPEsports 展示相同代码，但缺少选手本人直接设置证据，保守标为较可信。",
        sources: [
          proSettingsSource("rarga"),
          {
            title: "Rarga settings - VPEsports",
            url: "https://valorant.vpesports.com/ru/players/rarga/",
            sourceType: "database",
            accessedAt,
            notes: "第二个职业设置数据库展示相同完整代码。"
          }
        ],
        haoTestStatus: "untested",
        contentType: "pro-reference",
        createdBy: "ClutchNest Research"
      }
    ]
  },
  {
    playerId: "lysoar",
    displayName: "lysoar",
    realNameZh: "梁优好",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialLondonRoster, vlrRosterSource],
    role: "控场",
    initials: "LY",
    searchAliases: ["Lysoar", "Liang Youhao", "留一手"],
    crosshairs: [
      {
        id: "primary-2026-06",
        slug: "cyan-medium-cross",
        titleZh: "lysoar 青色中型十字",
        titleEn: "lysoar Cyan Medium Cross",
        code: "0;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: cyanCross,
        summaryZh: "青色四向内线尺寸适中，中心空隙清晰，便于持续预瞄。",
        summaryEn: "A cyan four-line cross with a clear center gap and medium line length.",
        styleTags: ["中型十字", "青色", "无描边"],
        recommendedFor: ["希望准星醒目", "习惯传统十字", "重视方向参考"],
        strengths: ["青色对比度较高", "中心空隙明确", "四向线条便于校准"],
        weaknesses: ["比点准星遮挡更多", "浅色青色场景可能降低辨识度", "只有单一数据库证据"],
        lastVerifiedAt: "2026-06-03",
        verificationNotes: "完整代码来自 ProSettings；没有第二项独立强证据，因此不标记 verified。",
        sources: [proSettingsSource("lysoar")],
        haoTestStatus: "untested",
        contentType: "pro-reference",
        createdBy: "ClutchNest Research"
      }
    ]
  },
  {
    playerId: "noman",
    displayName: "NoMan",
    realNameZh: "文家杰",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialLondonRoster, vlrRosterSource],
    role: "多位置",
    initials: "NM",
    searchAliases: ["James Man", "James Man Ga Kit", "文家傑"],
    crosshairs: [pendingVersion(
      "NoMan",
      "公开设置资料只确认部分视觉字段，完整准星代码仍显示为未知，不能安全发布。",
      [
        {
          title: "NoMan VALORANT Settings - Specs.gg",
          url: "https://specs.gg/NoMan",
          sourceType: "database",
          publishedAt: "2026-06",
          accessedAt,
          notes: "页面明确将 Crosshair Code 标为 UNKNOWN，部分参数同样未知。"
        },
        {
          title: "NoMan player profile - Liquipedia",
          url: "https://liquipedia.net/valorant/NoMan",
          sourceType: "database",
          accessedAt,
          notes: "用于交叉确认身份与现役状态，不提供完整准星代码。"
        }
      ],
      "不使用缺失参数反推代码，不使用其他 XLG 队员准星替代。"
    )]
  },
  {
    playerId: "wsleo",
    displayName: "WsLeo",
    realNameZh: "黄品维",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialLondonRoster, vlrRosterSource],
    role: "先锋",
    initials: "WL",
    searchAliases: ["Huang Ping-wei", "Huang Pinwei", "黃品維"],
    crosshairs: [pendingVersion(
      "WsLeo",
      "近期公开资料可辨认青色准星，但不同来源参数不一致，没有可发布的完整代码。",
      [
        {
          title: "WsLeo settings research summary",
          url: "https://note.com/esports5678/n/ndbf6cad18a37",
          sourceType: "database",
          publishedAt: "2026-06-02",
          accessedAt,
          notes: "作者明确说明来源数值存在差异，因此没有发布代码。"
        },
        {
          title: "WsLeo player profile - Liquipedia",
          url: "https://liquipedia.net/valorant/WsLeo",
          sourceType: "database",
          accessedAt,
          notes: "用于确认身份与队伍，不构成准星代码证据。"
        }
      ],
      "只保留来源冲突事实，不根据比赛画面猜测线长、偏移或完整代码。"
    )]
  },
  {
    playerId: "happywei",
    displayName: "happywei",
    realNameZh: "邓闵维",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "starter",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialLondonRoster, vlrRosterSource],
    role: "哨卫 / 控场",
    initials: "HW",
    searchAliases: ["Deng Minwei", "Teng Min-wei", "鄧閔維"],
    crosshairs: [
      {
        id: "primary-2026-06",
        slug: "soft-opacity-white-dot",
        titleZh: "happywei 半透明白点准星",
        titleEn: "happywei Soft-Opacity White Dot",
        code: "0;P;o;1;d;1;a;0.66;0b;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: whiteDot(0.66),
        summaryZh: "白色中心点使用 0.66 不透明度并保留描边，视觉存在感较柔和。",
        summaryEn: "A white outlined center dot using 0.66 opacity and no line segments.",
        styleTags: ["点状", "白色", "有描边"],
        recommendedFor: ["偏好极简点准星", "希望降低视觉干扰", "习惯直接中心定位"],
        strengths: ["遮挡较少", "描边保留中心轮廓", "半透明点不容易过度抢眼"],
        weaknesses: ["复杂背景上可能偏淡", "远距离目标需要适应", "来源可能共享同一数据库记录"],
        lastVerifiedAt: "2026-06-03",
        verificationNotes: "ProSettings 与设置整理文章记录相同代码，但后者可能基于相同公开数据库，仍保守标为较可信。",
        sources: [
          proSettingsSource("happywei"),
          {
            title: "happywei settings research summary",
            url: "https://note.com/esports5678/n/n3475673c200e",
            sourceType: "database",
            publishedAt: "2026-06-03",
            accessedAt,
            notes: "展示相同完整代码和参数；独立性不足以升级为 verified。"
          }
        ],
        haoTestStatus: "untested",
        contentType: "pro-reference",
        createdBy: "ClutchNest Research"
      }
    ]
  },
  {
    playerId: "sharks",
    displayName: "Sharks",
    realNameZh: "邱戈",
    teamId: "xlg",
    isCurrentRoster: true,
    rosterStatus: "substitute",
    rosterVerifiedAt: xlgRosterVerifiedAt,
    rosterSources: [officialSharksPromotion, sharksRosterReport, vlrRosterSource],
    role: "决斗 / 多位置",
    initials: "SH",
    searchAliases: ["Qiu Ge"],
    crosshairs: [pendingVersion(
      "Sharks",
      "Sharks 刚从 XLG 二队升入一队，暂未找到选手本人或可靠数据库公开的完整近期代码。",
      [officialSharksPromotion, sharksRosterReport],
      "已确认一队第六人身份，但没有足够准星证据；等待正式比赛、直播或选手公开设置。"
    )]
  }
];

export const xlgCrosshairProfiles = profiles;
export const xlgCurrentRosterProfiles = profiles.filter((profile) => profile.isCurrentRoster);
export const xlgArchivedProfiles = profiles.filter((profile) => !profile.isCurrentRoster);

export function getXlgProfile(playerId: string) {
  return profiles.find((profile) => profile.playerId === playerId);
}

export const xlgTeamDefinition: CrosshairTeamDefinition = {
  id: "xlg",
  shortName: "XLG",
  fullName: "Xi Lai Gaming",
  titleZh: "XLG 现役选手准星",
  titleEn: "XLG Current Roster Crosshairs",
  descriptionZh: "查看并复制 XLG 现役选手近期可验证的 VALORANT 准星设置。",
  contextZh: "职业选手可能随时更改准星。这里展示的是 ClutchNest 最近能够核验的公开版本。",
  rosterVerifiedAt: xlgRosterVerifiedAt,
  rosterNoteZh: "Sharks 于 2026-07-13 晋升一队并作为第六人收录；hvoya 与 steady 属于教练组。",
  searchAliases: ["XLG", "Xi Lai Gaming", "喜来电竞"],
  disclaimerZh: "职业选手可能随时更改准星。ClutchNest 记录的是最近能够合理核验的公开设置，并不代表选手会永久使用该代码。使用职业选手准星不会自动提高枪法，实际效果取决于个人分辨率、视觉习惯、瞄准方式和游戏设置。",
  disclaimerEn: "Pro players may change their settings at any time. These entries reflect the latest public settings ClutchNest could reasonably verify.",
  profiles
};

warnInvalidCrosshairCodes(profiles);
