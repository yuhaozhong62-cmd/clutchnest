import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type {
  CrosshairSource,
  NormalizedCrosshairSettings,
  ProPlayerCrosshairProfile
} from "@/lib/data/crosshairTeams/types";

export const edgRosterVerifiedAt = "2026-07-14";

const accessedAt = "2026-07-14";
const rosterSource: CrosshairSource = {
  title: "VCT 2026 China Stage 2 名单整理（引用官方名单）",
  url: "https://valorantnews.jp/archives/120851",
  sourceType: "database",
  publishedAt: "2026-07-09",
  accessedAt,
  notes: "名单引用赛事官方发布，EDG 参赛选手为 ZmjjKK、CHICHOO、nobody、Smoggy、Jieni7。"
};
const vlrRosterSource: CrosshairSource = {
  title: "EDward Gaming team profile",
  url: "https://www.vlr.gg/team/1120/edward-gaming",
  sourceType: "database",
  accessedAt,
  notes: "用于交叉核对选手姓名、近期比赛和注册变化。"
};

const whiteCompact: NormalizedCrosshairSettings = {
  colorName: "白色",
  colorHex: "#ffffff",
  outlinesEnabled: false,
  centerDotEnabled: true,
  centerDotOpacity: 1,
  centerDotThickness: 2,
  innerLinesEnabled: true,
  innerLineOpacity: 0.8,
  innerLineLength: 2,
  innerLineVerticalLength: 2,
  innerLineThickness: 2,
  innerLineOffset: 1,
  innerMovementError: false,
  innerFiringError: false,
  outerLinesEnabled: false
};

const cyanCross = (offset: number): NormalizedCrosshairSettings => ({
  colorName: "青色",
  colorHex: "#00ffff",
  outlinesEnabled: false,
  centerDotEnabled: false,
  innerLinesEnabled: true,
  innerLineOpacity: 1,
  innerLineLength: 3,
  innerLineVerticalLength: 3,
  innerLineThickness: 2,
  innerLineOffset: offset,
  innerMovementError: false,
  innerFiringError: false,
  outerLinesEnabled: false
});

function databaseSource(player: string, updatedAt: string): CrosshairSource {
  return {
    title: `${player} VALORANT Settings - ProSettings`,
    url: `https://prosettings.net/players/${player.toLowerCase()}/`,
    sourceType: "database",
    publishedAt: updatedAt,
    accessedAt,
    notes: "第三方专业设置数据库快照；职业选手可能在页面更新后继续更换设置。"
  };
}

const profiles: ProPlayerCrosshairProfile[] = [
  {
    playerId: "zmjjkk",
    displayName: "ZmjjKK",
    nameZh: "康康",
    realNameZh: "郑永康",
    teamId: "edg",
    isCurrentRoster: true,
    rosterStatus: "active",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [rosterSource, vlrRosterSource],
    role: "决斗 / 多位置",
    initials: "KK",
    crosshairs: [
      {
        id: "primary-2026-07",
        slug: "compact-white-center",
        titleZh: "ZmjjKK 近期小型白色准星",
        titleEn: "ZmjjKK Compact White Crosshair",
        code: "0;P;h;0;d;1;f;0;0l;2;0v;2;0g;1;0o;1;0f;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: whiteCompact,
        summaryZh: "中心点结合短内线，画面占用较小，适合头线定位、单点和短连发。",
        summaryEn: "A compact white center with short inner lines for taps and short bursts.",
        styleTags: ["中心点加内线", "小十字", "白色", "无描边"],
        recommendedFor: ["习惯小型准星", "重视头线定位", "以单点和短连发为主"],
        strengths: ["目标遮挡较少", "中心位置明确", "短内线提供方向参考"],
        weaknesses: ["浅色背景上可见度较低", "尺寸较小，需要适应", "不会直接改善枪法"],
        lastVerifiedAt: "2026-07-05",
        verificationNotes: "ProSettings 与 VPEsports 展示相同完整代码。ZmjjKK 更换设置频率较高，因此标为较可信而非选手本人直接验证。",
        sources: [
          databaseSource("zmjjkk", "2026-07-05"),
          {
            title: "ZmjjKK settings - VPEsports",
            url: "https://valorant.vpesports.com/players/zmjjkk/",
            sourceType: "database",
            accessedAt,
            notes: "独立数据库展示相同完整代码。"
          }
        ],
        haoTestStatus: "untested"
      }
    ]
  },
  {
    playerId: "chichoo",
    displayName: "CHICHOO",
    realNameZh: "万顺治",
    teamId: "edg",
    isCurrentRoster: true,
    rosterStatus: "active",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [rosterSource, vlrRosterSource],
    role: "哨卫 / 控场",
    initials: "CH",
    crosshairs: [
      {
        id: "primary-2026-05",
        slug: "tight-cyan-cross",
        titleZh: "CHICHOO 近期青色紧凑十字",
        titleEn: "CHICHOO Tight Cyan Cross",
        code: "0;s;1;P;c;5;h;0;f;0;s;0;0l;3;0o;0;0a;1;0f;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: cyanCross(0),
        summaryZh: "无中心空隙的青色短十字，对比度高，适合稳定预瞄与短连发。",
        summaryEn: "A tight cyan cross with high visibility and no center gap.",
        styleTags: ["中型十字", "青色", "无描边"],
        recommendedFor: ["希望准星更醒目", "习惯实心中心", "稳定预瞄玩家"],
        strengths: ["青色在多数场景清晰", "中心反馈直接", "十字方向感明确"],
        weaknesses: ["中心区域比点准星更密", "可能遮挡极远距离小目标", "无移动和射击误差反馈"],
        lastVerifiedAt: "2026-05-26",
        verificationNotes: "来源为近期专业设置数据库，未找到选手本人直接展示完整代码的第二证据。",
        sources: [databaseSource("chichoo", "2026-05-26")],
        haoTestStatus: "untested"
      }
    ]
  },
  {
    playerId: "nobody",
    displayName: "nobody",
    realNameZh: "王森旭",
    teamId: "edg",
    isCurrentRoster: true,
    rosterStatus: "active",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [rosterSource, vlrRosterSource],
    role: "先锋 / 多位置",
    initials: "NB",
    crosshairs: [
      {
        id: "primary-2026-07",
        slug: "outlined-white-cross",
        titleZh: "nobody 近期描边白色小十字",
        titleEn: "nobody Outlined White Cross",
        code: "0;s;1;P;o;1;m;1;0t;1;0l;2;0v;2;0g;1;0o;2;0a;1;0f;0;1b;0;S;c;5;o;1",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: {
          colorName: "白色",
          colorHex: "#ffffff",
          outlinesEnabled: true,
          outlineOpacity: 1,
          outlineThickness: 1,
          centerDotEnabled: false,
          innerLinesEnabled: true,
          innerLineOpacity: 1,
          innerLineLength: 2,
          innerLineVerticalLength: 2,
          innerLineThickness: 1,
          innerLineOffset: 2,
          innerMovementError: false,
          innerFiringError: false,
          outerLinesEnabled: false
        },
        summaryZh: "细白短线配完整描边，在保持较低遮挡的同时提高复杂背景可见度。",
        summaryEn: "Thin white inner lines with a full outline for cleaner visibility.",
        styleTags: ["小十字", "白色", "有描边"],
        recommendedFor: ["偏好细线十字", "需要描边可见度", "单点与短连发"],
        strengths: ["描边提升复杂背景可见度", "细线遮挡较低", "中心空隙便于看目标"],
        weaknesses: ["线条偏细，远距离可能不够醒目", "描边会增加视觉密度", "没有误差反馈"],
        lastVerifiedAt: "2026-07-13",
        verificationNotes: "专业数据库在名单核实前一天更新；仍未获得选手本人直接确认。",
        sources: [databaseSource("nobody", "2026-07-13")],
        haoTestStatus: "untested"
      }
    ]
  },
  {
    playerId: "smoggy",
    displayName: "Smoggy",
    realNameZh: "张钊",
    teamId: "edg",
    isCurrentRoster: true,
    rosterStatus: "active",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [rosterSource, vlrRosterSource],
    role: "控场 / 多位置",
    initials: "SM",
    crosshairs: [
      {
        id: "primary-2026-05",
        slug: "soft-outline-white-cross",
        titleZh: "Smoggy 数据库白色十字",
        titleEn: "Smoggy Soft-Outline White Cross",
        code: "0;p;0;s;1;P;o;0.3;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;A;o;0.3;d;1;0b;0;1b;0",
        versionStatus: "primary",
        verificationStatus: "likely",
        normalizedSettings: {
          colorName: "白色",
          colorHex: "#ffffff",
          outlinesEnabled: true,
          outlineOpacity: 0.3,
          outlineThickness: 1,
          centerDotEnabled: false,
          innerLinesEnabled: true,
          innerLineOpacity: 1,
          innerLineLength: 3,
          innerLineVerticalLength: 3,
          innerLineThickness: 2,
          innerLineOffset: 2,
          innerMovementError: false,
          innerFiringError: false,
          outerLinesEnabled: false
        },
        summaryZh: "标准白色短十字配低透明描边，兼顾清晰度、中心空隙与可见度。",
        summaryEn: "A white short cross with a subtle outline and clear center gap.",
        styleTags: ["中型十字", "白色", "有描边"],
        recommendedFor: ["希望十字尺寸适中", "短连发与跟枪切换", "重视背景可见度"],
        strengths: ["中心空隙清楚", "低透明描边不会过重", "中近距离容易找到"],
        weaknesses: ["比点准星遮挡更多", "可能已被近期点准星替换", "未经 HAO 实战测试"],
        lastVerifiedAt: "2026-05-21",
        verificationNotes: "ProSettings 保留此完整代码，但同页近期直播线索称 Smoggy 曾改用尺寸 2 点准星；未找到该点准星完整代码，因此此版本只标为较可信。",
        sources: [databaseSource("smoggy", "2026-05-21")],
        haoTestStatus: "untested"
      },
      {
        id: "alternative-dot-pending",
        slug: "recent-dot-pending",
        titleZh: "Smoggy 近期点准星线索",
        titleEn: "Smoggy Recent Dot Lead",
        versionStatus: "verificationPending",
        verificationStatus: "verificationPending",
        summaryZh: "近期直播线索显示可能使用尺寸 2 点准星，但没有取得可交叉验证的完整导入代码。",
        summaryEn: "A recent stream lead suggests a size-two dot, but no complete verified code is available.",
        styleTags: ["点状", "白色", "待核实"],
        recommendedFor: [],
        strengths: [],
        weaknesses: ["缺少完整代码", "缺少第二独立证据"],
        verificationNotes: "不生成预览、不开放复制，等待选手直播设置页或完整代码证据。",
        sources: [
          {
            title: "Smoggy 2026-05-13 直播回放线索",
            url: "https://www.bilibili.com/video/BV1mf526JELE/",
            sourceType: "stream",
            publishedAt: "2026-05-13",
            accessedAt,
            notes: "只确认视觉上可能为小点，不能反推出完整代码。"
          }
        ],
        haoTestStatus: "untested"
      }
    ]
  },
  {
    playerId: "jieni7",
    displayName: "Jieni7",
    realNameZh: "张君泰",
    teamId: "edg",
    isCurrentRoster: true,
    rosterStatus: "active",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [rosterSource, vlrRosterSource],
    role: "多位置",
    initials: "J7",
    crosshairs: [
      {
        id: "verification-pending",
        slug: "verification-pending",
        titleZh: "Jieni7 准星待核实",
        titleEn: "Jieni7 Crosshair Pending",
        versionStatus: "verificationPending",
        verificationStatus: "verificationPending",
        summaryZh: "暂未找到足够可靠的近期完整代码，保留现役选手记录并等待强证据。",
        summaryEn: "No sufficiently reliable recent full code has been found yet.",
        styleTags: ["待核实"],
        recommendedFor: [],
        strengths: [],
        weaknesses: ["没有完整导入代码", "无法安全渲染真实预览"],
        verificationNotes: "检查了近期赛事记录、选手资料页和公开设置数据库；未找到选手本人设置展示，亦没有两项独立来源指向同一完整代码。",
        sources: [
          {
            title: "Jieni7 player profile - VLR",
            url: "https://www.vlr.gg/player/51244/jieni7",
            sourceType: "match",
            accessedAt,
            notes: "用于确认近期参赛活动，不构成准星代码证据。"
          },
          {
            title: "Jieni7 player profile - Liquipedia",
            url: "https://liquipedia.net/valorant/Jieni7",
            sourceType: "database",
            accessedAt,
            notes: "用于交叉确认身份和队伍，不包含可靠完整准星代码。"
          }
        ],
        haoTestStatus: "untested"
      }
    ]
  },
  {
    playerId: "cb",
    displayName: "CB",
    realNameZh: "王晴川",
    teamId: "edg",
    isCurrentRoster: false,
    rosterStatus: "inactive",
    rosterVerifiedAt: edgRosterVerifiedAt,
    rosterSources: [
      {
        title: "EDG 与 CB 结束合作公告",
        url: "https://weibo.com/7601012575/R6P3K34Wn",
        sourceType: "official",
        publishedAt: "2026-07-02",
        accessedAt
      },
      {
        title: "EDward Gaming releases cb - VLR",
        url: "https://www.vlr.gg/708454/edward-gaming-releases-cb",
        sourceType: "database",
        publishedAt: "2026-07-02",
        accessedAt
      }
    ],
    role: "决斗",
    initials: "CB",
    crosshairs: [
      {
        id: "previous-edg-2026-03",
        slug: "edg-cyan-cross-history",
        titleZh: "CB EDG 时期青色十字",
        titleEn: "CB EDG-Era Cyan Cross",
        code: "0;s;1;P;c;5;h;0;f;0;0l;3;0o;1;0a;1;0f;0;1b;0;S;c;5;s;0.6;o;1",
        versionStatus: "previous",
        verificationStatus: "likely",
        normalizedSettings: cyanCross(1),
        summaryZh: "CB 在 EDG 时期资料中的青色短十字；仅作为历史版本保存，不代表当前队伍或当前设置。",
        summaryEn: "A historical cyan cross from CB's EDG period, not a current EDG setting.",
        styleTags: ["中型十字", "青色", "无描边", "历史版本"],
        recommendedFor: ["偏好醒目青色十字", "稳定预瞄"],
        strengths: ["青色可见度高", "尺寸适中", "中心空隙明确"],
        weaknesses: ["已经离开 EDG", "设置日期较早", "不能作为现役 EDG 准星展示"],
        lastVerifiedAt: "2026-03-09",
        verificationNotes: "代码来自 CB 仍在 EDG 时的数据库记录。ProSettings 于 2026-07-13 已将队伍更新为 Free Agent。",
        sources: [databaseSource("cb", "2026-03-09")],
        haoTestStatus: "untested"
      }
    ]
  }
];

export const edgCrosshairProfiles = profiles;
export const edgCurrentRosterProfiles = profiles.filter((profile) => profile.isCurrentRoster);
export const edgArchivedProfiles = profiles.filter((profile) => !profile.isCurrentRoster);

export function getEdgProfile(playerId: string) {
  return profiles.find((profile) => profile.playerId === playerId);
}

export function getCrosshairVersion(profile: ProPlayerCrosshairProfile, versionId?: string) {
  if (versionId) {
    const selected = profile.crosshairs.find(
      (version) => version.id === versionId || version.slug === versionId || version.versionStatus === versionId
    );
    if (selected) return selected;
  }

  return profile.crosshairs.find((version) => version.versionStatus === "primary") ?? profile.crosshairs[0];
}

if (process.env.NODE_ENV !== "production") {
  for (const profile of profiles) {
    for (const version of profile.crosshairs) {
      if (!version.code) continue;
      const validation = validateValorantCrosshairCode(version.code);
      if (!validation.valid) {
        console.warn(`[crosshair] ${profile.playerId}/${version.id}: ${validation.reasons.join("；")}`);
      }
    }
  }
}
