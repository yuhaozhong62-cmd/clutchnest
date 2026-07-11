export type CrosshairFilterId =
  | "all"
  | "hao-tested"
  | "pro-reference"
  | "minimal"
  | "dot"
  | "cross"
  | "headshot"
  | "high-visibility";

export type CrosshairTag = Exclude<CrosshairFilterId, "all">;
export type CrosshairContentType = "hao-tested" | "pro-reference" | "sample";
export type CrosshairStatus = "published" | "draft";
export type CrosshairConfidence = "high" | "medium" | "low";

export type CrosshairLineSettings = {
  enabled: boolean;
  opacity: number;
  length: number;
  thickness: number;
  offset: number;
};

export type CrosshairSettings = {
  primaryColor: string;
  outlines: { enabled: boolean; opacity: number; thickness: number };
  centerDot: { enabled: boolean; opacity: number; thickness: number };
  innerLines: CrosshairLineSettings;
  outerLines: CrosshairLineSettings;
  movementError: boolean;
  firingError: boolean;
};

export type Crosshair = {
  id: string;
  nameCn: string;
  nameEn: string;
  playerName?: string;
  currentTeam?: string;
  contentType: CrosshairContentType;
  code: string;
  image: string;
  tags: CrosshairTag[];
  color: string;
  crosshairSettings: CrosshairSettings;
  recommendedForCn: string;
  recommendedForEn: string;
  prosCn: string[];
  prosEn: string[];
  consCn: string[];
  consEn: string[];
  analysisCn: string;
  analysisEn: string;
  difficulty: string;
  style: string;
  bestForAgents: string[];
  bestForPlaystyle: { cn: string; en: string };
  sourceNames: string[];
  sourceUrls: string[];
  sourceUpdatedAt: string[];
  verifiedAt: string;
  confidence: CrosshairConfidence;
  status: CrosshairStatus;
  featured: boolean;
  displayOrder: number;
  createdBy: string;
  lastUpdated: string;
  accent: string;
};

export const crosshairFilters: Array<{ id: CrosshairFilterId; labelCn: string; labelEn: string }> = [
  { id: "all", labelCn: "全部", labelEn: "All" },
  { id: "hao-tested", labelCn: "HAO 实测", labelEn: "HAO Tested" },
  { id: "pro-reference", labelCn: "职业选手参考", labelEn: "Pro Reference" },
  { id: "minimal", labelCn: "极简准星", labelEn: "Minimal" },
  { id: "dot", labelCn: "点准星", labelEn: "Dot" },
  { id: "cross", labelCn: "十字准星", labelEn: "Cross" },
  { id: "headshot", labelCn: "爆头定位", labelEn: "Headshot" },
  { id: "high-visibility", labelCn: "清晰可见", labelEn: "High Visibility" }
];

const emptyLines: CrosshairLineSettings = { enabled: false, opacity: 0, length: 0, thickness: 0, offset: 0 };

export const crosshairs: Crosshair[] = [
  {
    id: "calm-headshot-dot",
    nameCn: "冷静爆头点准星",
    nameEn: "Calm Headshot Dot",
    contentType: "hao-tested",
    code: "0;s;1;P;o;1;d;1;0b;0;1b;0;S;s;0.7;o;1",
    image: "/crosshairs/calm-headshot-dot.png",
    tags: ["hao-tested", "minimal", "dot", "headshot"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: true, opacity: 1, thickness: 1 },
      centerDot: { enabled: true, opacity: 1, thickness: 2 },
      innerLines: emptyLines,
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "适合非常喜欢极简画面、冷静瞄准和爆头定位的玩家。",
    recommendedForEn: "For calm aimers who prefer a very clean screen and precise head-level placement.",
    prosCn: ["画面非常干净，不容易挡住敌人", "适合练习爆头线和精准定位", "能让注意力集中在敌人头部", "适合冷静型玩家和单点瞄准"],
    prosEn: ["Very clean view", "Good for head-level practice", "Low target obstruction", "Strong for calm tapping"],
    consCn: ["新手刚开始可能会觉得太小", "混战时可能不够明显", "不适合喜欢强烈准星反馈的玩家"],
    consEn: ["Small for beginners", "Subtle in chaotic fights", "Limited visual feedback"],
    analysisCn: "这是一个非常极简的点准星，适合冷静、稳定、喜欢直接瞄头的玩家。它几乎不会遮挡视野，所以在对枪时可以更专注于敌人的头部位置。我会把它归类为“爆头机器”类型的准星，但它对玩家的定位能力要求比较高，新手需要先适应一段时间。",
    analysisEn: "A minimal dot for calm and precise players. It keeps the screen clean but takes time to learn.",
    difficulty: "中等 / Medium",
    style: "极简点准星 / Minimal Dot",
    bestForAgents: ["Jett", "Reyna", "Chamber", "Iso"],
    bestForPlaystyle: { cn: "冷静瞄准、单点爆头、干净画面、精准定位", en: "Calm tapping and precise placement" },
    sourceNames: [],
    sourceUrls: [],
    sourceUpdatedAt: [],
    verifiedAt: "2026-07-10",
    confidence: "high",
    status: "published",
    featured: true,
    displayOrder: 1,
    createdBy: "HAO",
    lastUpdated: "2026-07-10",
    accent: "#ff2d2d"
  },
  {
    id: "aspas-pro-crosshair",
    nameCn: "aspas 职业准星",
    nameEn: "aspas Pro Crosshair",
    playerName: "aspas",
    currentTeam: "MIBR",
    contentType: "pro-reference",
    code: "0;s;1;P;o;1;d;1;0b;0;1b;0;S;c;0",
    image: "/crosshairs/pro/aspas-crosshair.png",
    tags: ["pro-reference", "minimal", "dot", "headshot"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: true, opacity: 1, thickness: 1 },
      centerDot: { enabled: true, opacity: 1, thickness: 2 },
      innerLines: { ...emptyLines, opacity: 1, length: 4, thickness: 2 },
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "更适合喜欢极简点准星、稳定预瞄和单点射击的玩家，可作为调整个人点准星的起点。",
    recommendedForEn: "For players who prefer a compact dot, steady pre-aim and tapping.",
    prosCn: ["对目标遮挡很少", "中心位置判断直接", "适合单点和短连发", "画面信息保持干净"],
    prosEn: ["Low obstruction", "Direct center reference", "Good for taps and bursts", "Clean screen"],
    consCn: ["远距离浅色背景上可能不够醒目", "近距离混战时视觉反馈较弱", "新手可能需要适应小尺寸"],
    consEn: ["Subtle on bright backgrounds", "Limited close-range feedback", "Needs adjustment time"],
    analysisCn: "白色描边点准星的中心非常明确，几乎不遮挡头部模型。远距离单点时画面干净，但在明亮区域或近距离多人交火中可能显得偏小。它更适合已经习惯稳定预瞄、以单点和短连发为主的玩家；新手可以把它作为调整起点，再按自己的可见度需求增加尺寸。实际效果取决于个人视觉习惯。",
    analysisEn: "A compact outlined white dot with very low obstruction. Strong for taps, but subtle in bright or chaotic scenes.",
    difficulty: "中等 / Medium",
    style: "描边点准星 / Outlined Dot",
    bestForAgents: [],
    bestForPlaystyle: { cn: "稳定预瞄、单点、短连发", en: "Pre-aim, tapping and short bursts" },
    sourceNames: ["ProSettings", "VPEsports"],
    sourceUrls: ["https://prosettings.net/players/aspas/", "https://valorant.vpesports.com/players/aspas/"],
    sourceUpdatedAt: ["2026-06-01", "未标注（核验于 2026-07-10）"],
    verifiedAt: "2026-07-10",
    confidence: "high",
    status: "published",
    featured: true,
    displayOrder: 2,
    createdBy: "ClutchNest Research",
    lastUpdated: "2026-07-10",
    accent: "#ffffff"
  },
  {
    id: "zekken-pro-crosshair",
    nameCn: "zekken 职业准星",
    nameEn: "zekken Pro Crosshair",
    playerName: "zekken",
    currentTeam: "MIBR",
    contentType: "pro-reference",
    code: "0;s;1;P;c;1;t;2;o;1;d;1;0b;0;1b;0;S;b;1;c;8;s;0.823",
    image: "/crosshairs/pro/zekken-crosshair.png",
    tags: ["pro-reference", "dot", "headshot", "high-visibility"],
    color: "绿色 / Green",
    crosshairSettings: {
      primaryColor: "#00ff00",
      outlines: { enabled: true, opacity: 1, thickness: 2 },
      centerDot: { enabled: true, opacity: 1, thickness: 2 },
      innerLines: { ...emptyLines, opacity: 1, length: 1, thickness: 2, offset: 1 },
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "可能适合希望点准星保持紧凑，同时需要高对比绿色中心提示的玩家。",
    recommendedForEn: "For players wanting a compact dot with a high-contrast green center.",
    prosCn: ["绿色在多数场景中容易识别", "粗描边让中心更稳定", "遮挡范围依然很小", "适合快速单点确认"],
    prosEn: ["High visibility", "Stable outlined center", "Low obstruction", "Good for quick taps"],
    consCn: ["粗描边可能让小目标看起来更拥挤", "偏好细准星的玩家可能觉得存在感过强", "不能提供扫射扩散反馈"],
    consEn: ["Outline can feel dense", "Too bold for some players", "No spray feedback"],
    analysisCn: "绿色中心点配合较厚描边，近距离和复杂背景中的可见度比纯白小点更强，同时仍保持很低的目标遮挡。远距离时中心块会比细点更明显，适合快速确认头线和单点；短连发也能使用，但准星本身不会显示射击误差。对完全依赖十字线参考的新手来说仍有学习成本，实际效果取决于个人视觉习惯。",
    analysisEn: "A high-contrast green dot with a bold outline. Visible at range and in close fights, but denser than a fine dot.",
    difficulty: "中等 / Medium",
    style: "高对比点准星 / High-Contrast Dot",
    bestForAgents: [],
    bestForPlaystyle: { cn: "快速定位、单点、移动后急停", en: "Quick placement, taps and stop-shooting" },
    sourceNames: ["ProSettings", "VPEsports"],
    sourceUrls: ["https://prosettings.net/players/zekken/", "https://valorant.vpesports.com/players/zekken/"],
    sourceUpdatedAt: ["2026-05-21", "未标注（核验于 2026-07-10）"],
    verifiedAt: "2026-07-10",
    confidence: "high",
    status: "published",
    featured: true,
    displayOrder: 3,
    createdBy: "ClutchNest Research",
    lastUpdated: "2026-07-10",
    accent: "#00ff00"
  },
  {
    id: "something-pro-crosshair",
    nameCn: "something 职业准星",
    nameEn: "something Pro Crosshair",
    playerName: "something",
    currentTeam: "Paper Rex",
    contentType: "pro-reference",
    code: "0;s;1;P;h;0;0l;2;0o;1;0a;1;0f;0;1b;0;S;c;0;s;0.713;o;1",
    image: "/crosshairs/pro/something-crosshair.png",
    tags: ["pro-reference", "minimal", "cross", "headshot"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: false, opacity: 0, thickness: 1 },
      centerDot: { enabled: false, opacity: 1, thickness: 2 },
      innerLines: { enabled: true, opacity: 1, length: 2, thickness: 2, offset: 1 },
      outerLines: { ...emptyLines, opacity: 1, length: 4, thickness: 1 },
      movementError: false,
      firingError: false
    },
    recommendedForCn: "更适合喜欢紧凑十字、需要清晰中心空隙并经常进行短连发的玩家。",
    recommendedForEn: "For players who prefer a tight cross with a clear center gap and short bursts.",
    prosCn: ["中心空隙便于观察目标", "十字方向感清晰", "适合单点与短连发切换", "整体遮挡较低"],
    prosEn: ["Clear center gap", "Strong directional reference", "Good for taps and bursts", "Low obstruction"],
    consCn: ["白色在明亮墙面上可能变淡", "尺寸较小，远距离需要稳定视线", "快速混战中不如高对比颜色醒目"],
    consEn: ["Can fade on bright surfaces", "Small at long range", "Less visible in chaos"],
    analysisCn: "这是一组很紧凑的白色十字线，中心留有小空隙，瞄准时既能看到目标中心，又有四向线条提供定位参考。它对头部遮挡较少，单点和两到三发短连发都比较自然；远距离仍然清晰，但在浅色背景上可能需要更集中注意力。对习惯大十字的新手会偏小，更可能适合已经具备基础预瞄习惯的玩家。",
    analysisEn: "A tight white cross with a visible center gap. Balanced for taps and short bursts, but subtle on bright surfaces.",
    difficulty: "中等 / Medium",
    style: "紧凑十字 / Compact Cross",
    bestForAgents: [],
    bestForPlaystyle: { cn: "单点、短连发、快速转点对枪", en: "Taps, short bursts and fast duels" },
    sourceNames: ["ProSettings", "VPEsports"],
    sourceUrls: ["https://prosettings.net/players/something/", "https://valorant.vpesports.com/players/something/"],
    sourceUpdatedAt: ["2026-06-22", "未标注（核验于 2026-07-10）"],
    verifiedAt: "2026-07-10",
    confidence: "high",
    status: "published",
    featured: true,
    displayOrder: 4,
    createdBy: "ClutchNest Research",
    lastUpdated: "2026-07-10",
    accent: "#ffffff"
  },
  {
    id: "t3xture-pro-crosshair",
    nameCn: "t3xture 职业准星",
    nameEn: "t3xture Pro Crosshair",
    playerName: "t3xture",
    currentTeam: "Gen.G",
    contentType: "pro-reference",
    code: "0;s;1;P;o;0;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;S;o;0",
    image: "/crosshairs/pro/t3xture-crosshair.png",
    tags: ["pro-reference", "cross", "headshot", "high-visibility"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: true, opacity: 0, thickness: 1 },
      centerDot: { enabled: false, opacity: 0, thickness: 0 },
      innerLines: { enabled: true, opacity: 1, length: 3, thickness: 2, offset: 2 },
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "可能适合想要比极小十字更清楚、同时保持中心空隙和低遮挡的玩家。",
    recommendedForEn: "For players wanting a readable cross with a clear gap and restrained obstruction.",
    prosCn: ["中近距离辨识度较好", "中心空隙不会完全盖住目标", "单点和短连发兼容", "四向线条方便修正偏移"],
    prosEn: ["Readable at close and mid range", "Clear center gap", "Works for taps and bursts", "Useful directional reference"],
    consCn: ["远距离会比点准星占用更多画面", "白色在高亮区域可能降低对比", "偏爱完全极简画面的玩家可能觉得线条明显"],
    consEn: ["More obstruction than a dot", "Lower contrast on bright areas", "Too visible for minimalists"],
    analysisCn: "长度 3、厚度 2 的白色十字比超小准星更容易在中近距离找到，同时中心空隙保留了目标可见性。单点时四条线能帮助确认偏移，短连发时也有稳定参考，但它不会反馈移动或射击误差。远距离遮挡略高于点准星，新手通常更容易找到中心，不过是否舒服仍取决于对线条尺寸的个人偏好。",
    analysisEn: "A readable white cross with a clear gap. Balanced for taps and bursts, with slightly more obstruction than a dot.",
    difficulty: "入门至中等 / Beginner–Medium",
    style: "标准紧凑十字 / Compact Cross",
    bestForAgents: [],
    bestForPlaystyle: { cn: "中近距离对枪、单点、短连发", en: "Mid-range duels, taps and bursts" },
    sourceNames: ["ProSettings", "VPEsports"],
    sourceUrls: ["https://prosettings.net/players/t3xture/", "https://valorant.vpesports.com/players/t3xture/"],
    sourceUpdatedAt: ["2026-04-27", "未标注（核验于 2026-07-10）"],
    verifiedAt: "2026-07-10",
    confidence: "medium",
    status: "published",
    featured: true,
    displayOrder: 5,
    createdBy: "ClutchNest Research",
    lastUpdated: "2026-07-10",
    accent: "#ffffff"
  },
  {
    id: "alfajer-pro-crosshair",
    nameCn: "Alfajer 职业准星",
    nameEn: "Alfajer Pro Crosshair",
    playerName: "Alfajer",
    currentTeam: "Fnatic",
    contentType: "pro-reference",
    code: "0;p;0;s;1;P;h;0;f;0;0l;2;0o;2;0a;1;0f;0;1b;0;A;c;5;o;1;d;1;0b;0;1b;0;S;s;0.628;o;1",
    image: "/crosshairs/pro/alfajer-crosshair.png",
    tags: ["pro-reference", "minimal", "cross", "headshot"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: false, opacity: 1, thickness: 1 },
      centerDot: { enabled: false, opacity: 1, thickness: 2 },
      innerLines: { enabled: true, opacity: 1, length: 2, thickness: 2, offset: 2 },
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "更适合偏好短线十字、需要明确中心空隙并重视头线定位的玩家。",
    recommendedForEn: "For players who prefer short cross lines, a clear gap and head-level placement.",
    prosCn: ["短线结构保持画面干净", "中心空隙清楚", "适合单点和节奏型短连发", "目标遮挡程度低"],
    prosEn: ["Clean short lines", "Clear center gap", "Good for taps and bursts", "Low obstruction"],
    consCn: ["远距离白色线条可能不够突出", "不提供移动和射击误差反馈", "习惯中心点的玩家需要适应空心结构"],
    consEn: ["Subtle at long range", "No error feedback", "Open center needs adjustment"],
    analysisCn: "这组白色短十字在中心保留比 something 设置更宽的空隙，目标头部不容易被完全覆盖。近距离能快速找到四向参考，远距离单点也比较干净，但白色细线在高亮场景可能不够醒目。它适合单点与有节奏的短连发，不会提供扫射误差提示；习惯实心点的新手可能需要时间适应空心中心。",
    analysisEn: "A short white cross with a wider center gap. Clean for taps and controlled bursts, but subtle on bright backgrounds.",
    difficulty: "中等 / Medium",
    style: "短线十字 / Short-Line Cross",
    bestForAgents: [],
    bestForPlaystyle: { cn: "头线定位、单点、节奏型短连发", en: "Head placement, taps and controlled bursts" },
    sourceNames: ["ProSettings", "VALMAUK"],
    sourceUrls: ["https://prosettings.net/players/alfajer/", "https://ggmauk.com/valorant/pro/alfajer"],
    sourceUpdatedAt: ["2026-05-11", "未标注（核验于 2026-07-10）"],
    verifiedAt: "2026-07-10",
    confidence: "high",
    status: "published",
    featured: true,
    displayOrder: 6,
    createdBy: "ClutchNest Research",
    lastUpdated: "2026-07-10",
    accent: "#ffffff"
  },
  ...createDraftSamples()
];

function createDraftSamples(): Crosshair[] {
  return [
    ["minimal-white-dot", "极简白点准星", "Minimal White Dot", 101],
    ["stable-cross", "稳定十字准星", "Stable Cross", 102],
    ["headshot-focus", "爆头定位准星", "Headshot Focus", 103]
  ].map(([id, nameCn, nameEn, displayOrder]) => ({
    id: String(id),
    nameCn: String(nameCn),
    nameEn: String(nameEn),
    contentType: "sample",
    code: "",
    image: `/crosshairs/${id}.png`,
    tags: ["minimal"],
    color: "白色 / White",
    crosshairSettings: {
      primaryColor: "#ffffff",
      outlines: { enabled: false, opacity: 0, thickness: 0 },
      centerDot: { enabled: true, opacity: 1, thickness: 2 },
      innerLines: emptyLines,
      outerLines: emptyLines,
      movementError: false,
      firingError: false
    },
    recommendedForCn: "内部内容草稿。",
    recommendedForEn: "Internal draft.",
    prosCn: [],
    prosEn: [],
    consCn: [],
    consEn: [],
    analysisCn: "尚未发布。",
    analysisEn: "Not published.",
    difficulty: "待定",
    style: "待定",
    bestForAgents: [],
    bestForPlaystyle: { cn: "待定", en: "TBD" },
    sourceNames: [],
    sourceUrls: [],
    sourceUpdatedAt: [],
    verifiedAt: "",
    confidence: "low",
    status: "draft",
    featured: false,
    displayOrder: Number(displayOrder),
    createdBy: "ClutchNest Draft",
    lastUpdated: "2026-07-10",
    accent: "#ffffff"
  }));
}

export const publishedCrosshairs = crosshairs
  .filter((crosshair) => crosshair.status === "published")
  .sort((a, b) => a.displayOrder - b.displayOrder);

export function getCrosshairById(id: string) {
  return publishedCrosshairs.find((crosshair) => crosshair.id === id);
}

export function getCrosshairRecordById(id: string) {
  return crosshairs.find((crosshair) => crosshair.id === id);
}
