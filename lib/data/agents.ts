export type AgentRole = "sentinel" | "initiator" | "duelist" | "controller";

export type ValorantAgent = {
  id: string;
  name: string;
  role: AgentRole;
  roleCn: string;
  roleEn: string;
  portrait: string;
  shortDescriptionCn: string;
  shortDescriptionEn: string;
  officialProfileUrl: string;
  playable: boolean;
  status: "published" | "draft";
  displayOrder: number;
  verifiedAt: string;
  aliases?: string[];
};

export const agents: ValorantAgent[] = [
  {
    id: "sova",
    name: "Sova",
    role: "initiator",
    roleCn: "先锋",
    roleEn: "Initiator",
    portrait: "",
    shortDescriptionCn: "用侦察和压迫节奏帮助队伍提前做出决策。",
    shortDescriptionEn: "Recon tools reveal space and guide team decisions.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/sova/",
    playable: true,
    status: "published",
    displayOrder: 1,
    verifiedAt: "2026-07-13"
  },
  {
    id: "jett",
    name: "Jett",
    role: "duelist",
    roleCn: "决斗",
    roleEn: "Duelist",
    portrait: "",
    shortDescriptionCn: "依靠机动性抢下第一接触，把空间转化为击杀机会。",
    shortDescriptionEn: "Mobility creates first-contact pressure and space.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/jett/",
    playable: true,
    status: "published",
    displayOrder: 2,
    verifiedAt: "2026-07-13"
  },
  {
    id: "omen",
    name: "Omen",
    role: "controller",
    roleCn: "控场",
    roleEn: "Controller",
    portrait: "",
    shortDescriptionCn: "用烟雾和假动作切割视野，为队友创造进点窗口。",
    shortDescriptionEn: "Smokes and misdirection shape safe entry windows.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/omen/",
    playable: true,
    status: "published",
    displayOrder: 3,
    verifiedAt: "2026-07-13"
  },
  {
    id: "chamber",
    name: "Chamber",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/chamber/portrait.webp",
    shortDescriptionCn: "依靠精准枪法和快速撤退能力控制长距离交火。",
    shortDescriptionEn: "Precision weapons and a fast escape hold long sightlines.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/chamber/",
    playable: true,
    status: "published",
    displayOrder: 10,
    verifiedAt: "2026-07-13"
  },
  {
    id: "cypher",
    name: "Cypher",
    aliases: ["保安", "赛博"],
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/cypher/portrait.webp",
    shortDescriptionCn: "利用摄像头、绊线和信息工具监控侧翼与敌人动向。",
    shortDescriptionEn: "Surveillance tools track flanks and enemy movement.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/cypher/",
    playable: true,
    status: "published",
    displayOrder: 11,
    verifiedAt: "2026-07-13"
  },
  {
    id: "deadlock",
    name: "Deadlock",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/deadlock/portrait.webp",
    shortDescriptionCn: "使用声波感应与纳米装置限制敌人的推进路线。",
    shortDescriptionEn: "Sonic sensors and nanowire restrict aggressive pushes.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/deadlock/",
    playable: true,
    status: "published",
    displayOrder: 12,
    verifiedAt: "2026-07-13"
  },
  {
    id: "killjoy",
    name: "Killjoy",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/killjoy/portrait.webp",
    shortDescriptionCn: "通过炮台、机器人和纳米蜂群控制区域与拖延进攻。",
    shortDescriptionEn: "Deployable inventions secure areas and delay attacks.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/killjoy/",
    playable: true,
    status: "published",
    displayOrder: 13,
    verifiedAt: "2026-07-13"
  },
  {
    id: "sage",
    name: "Sage",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/sage/portrait.webp",
    shortDescriptionCn: "利用治疗、减速和屏障保护队友并阻止敌人推进。",
    shortDescriptionEn: "Healing, slows and barriers protect the team.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/sage/",
    playable: true,
    status: "published",
    displayOrder: 14,
    verifiedAt: "2026-07-13"
  },
  {
    id: "veto",
    name: "Veto",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/veto/portrait.webp",
    shortDescriptionCn: "通过限制和摧毁敌方技能，为阵地防守创造优势。",
    shortDescriptionEn: "Disruptive tools deny enemy utility and secure sites.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/veto/",
    playable: true,
    status: "published",
    displayOrder: 15,
    verifiedAt: "2026-07-13"
  },
  {
    id: "vyse",
    name: "Vyse",
    role: "sentinel",
    roleCn: "哨卫",
    roleEn: "Sentinel",
    portrait: "/agents/vyse/portrait.webp",
    shortDescriptionCn: "利用液态金属陷阱分割敌人、封锁路线并解除武器威胁。",
    shortDescriptionEn: "Liquid-metal traps isolate and disarm attackers.",
    officialProfileUrl: "https://playvalorant.com/en-us/agents/vyse/",
    playable: true,
    status: "published",
    displayOrder: 16,
    verifiedAt: "2026-07-13"
  }
];

export const publishedAgents = agents
  .filter((agent) => agent.playable && agent.status === "published")
  .sort((a, b) => a.displayOrder - b.displayOrder);

export const publishedSentinels = publishedAgents.filter((agent) => agent.role === "sentinel");
