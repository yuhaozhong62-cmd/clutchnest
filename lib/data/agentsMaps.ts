export { publishedAgents as agents } from "@/lib/data/agents";
export type { ValorantAgent as Agent } from "@/lib/data/agents";

export type LineupPoint = {
  id: string;
  name: string;
  agentId: string;
  mapId: string;
  position: { x: number; y: number };
  screenshotLabel: string;
  play: string;
  thinking: string;
  tips: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
};

export const lineupPoints: LineupPoint[] = [
  {
    id: "sova-ascent-a-main",
    name: "A Main Early Recon",
    agentId: "sova",
    mapId: "ascent",
    position: { x: 31, y: 64 },
    screenshotLabel: "A Main 侦察箭截图占位",
    play: "开局用侦察箭确认 A 大厅是否有人抢点，队友可以根据扫描结果决定抢 A 大或转中路。",
    thinking: "这个点位的核心不是拿击杀，而是提前排除风险。信息越早，队伍越容易避免盲目进点。",
    tips: ["开局前先沟通队友是否准备跟进", "被破坏时不要立刻默认没人", "可以和无人机节奏错开使用"],
    pros: ["低风险获取信息", "适合默认开局", "能帮助队伍控制节奏"],
    cons: ["容易被熟悉的对手预瞄破坏", "缺少后续配合时价值下降"],
    bestFor: "适合默认控图、慢打和需要确认 A 区防守人数时使用。"
  },
  {
    id: "jett-ascent-mid-peek",
    name: "Mid Catwalk First Contact",
    agentId: "jett",
    mapId: "ascent",
    position: { x: 52, y: 44 },
    screenshotLabel: "中路前压身位截图占位",
    play: "利用烟和位移拿中路第一枪机会，打完立刻撤回，避免被补枪锁死。",
    thinking: "Jett 的价值在于制造不对称对枪。不要为了多看一秒信息，把位移保命能力浪费掉。",
    tips: ["提前确认撤退路线", "只拿第一接触，不要恋战", "配合队友闪光或烟更稳定"],
    pros: ["能快速争夺中路主动权", "击杀收益高", "适合打乱对手默认"],
    cons: ["失误会直接掉首杀", "需要较强急停和定位"],
    bestFor: "适合经济局、对手默认较慢或队伍需要主动打开局面时使用。"
  },
  {
    id: "omen-ascent-mid-smoke",
    name: "Mid Control Smoke",
    agentId: "omen",
    mapId: "ascent",
    position: { x: 48, y: 48 },
    screenshotLabel: "中路控烟截图占位",
    play: "用烟封住中路关键视野，让队友能更安全地拿 Catwalk 或 Market 信息。",
    thinking: "Ascent 的中路是双方节奏核心。Omen 的烟要服务于队伍控图，而不是单纯延缓对手。",
    tips: ["烟位要避免给对手贴边偷出", "控中前先沟通队友站位", "第二颗烟留给转点或回防"],
    pros: ["能稳定切割中路视野", "便于队伍慢控", "适合攻防两端"],
    cons: ["缺少队友跟进时价值有限", "烟放太深会让对手反利用"],
    bestFor: "适合默认控中、慢打转点和防守回防前的视野切割。"
  },
  {
    id: "sova-bind-a-short",
    name: "A Short Info Dart",
    agentId: "sova",
    mapId: "bind",
    position: { x: 36, y: 38 },
    screenshotLabel: "A 小侦察箭截图占位",
    play: "用侦察箭确认 A 小和浴室外侧压力，帮助队伍判断是否需要提前补防。",
    thinking: "Bind 没有中路，信息来源更依赖主动技能。Sova 要帮助队伍尽早判断真假进攻。",
    tips: ["不要每回合固定同一时间使用", "被打掉后结合脚步继续判断", "可配合队友反清 A 小"],
    pros: ["能快速判断 A 区压力", "降低防守猜点成本", "适合开局默认"],
    cons: ["固定点位容易被预判", "进攻方静音慢摸时信息有限"],
    bestFor: "适合防守默认、对手喜欢 A 小提速或队伍需要提前轮转时使用。"
  },
  {
    id: "omen-bind-b-smoke",
    name: "B Long Split Smoke",
    agentId: "omen",
    mapId: "bind",
    position: { x: 67, y: 58 },
    screenshotLabel: "B 长烟位截图占位",
    play: "用烟切断 B 点关键视野，让队友从 B 长和 Hookah 同时给压力。",
    thinking: "烟不是单纯挡视野，而是逼防守方移动准星。双线压力能让对手更难稳定接第一波。",
    tips: ["烟边缘不要给对手单向优势", "进点前确认队友同步", "保留第二颗烟给下包后"],
    pros: ["提升进点安全性", "适合多人同步", "下包后仍有控场空间"],
    cons: ["队友不同步时容易白给烟", "对手反清 Hookah 会削弱效果"],
    bestFor: "适合 B 点夹击、下包执行和需要稳定切割防守视野时使用。"
  },
  {
    id: "jett-bind-hookah-burst",
    name: "Hookah Burst Entry",
    agentId: "jett",
    mapId: "bind",
    position: { x: 61, y: 41 },
    screenshotLabel: "Hookah 进点身位截图占位",
    play: "在队友闪光或烟的配合下从 Hookah 快速给第一波压力，打完利用位移避开补枪。",
    thinking: "这个打法的重点是同步，不是单人硬冲。Jett 负责制造空间，队友负责把空间变成包点控制。",
    tips: ["进点前确认 B 长是否同步给压力", "位移落点不要卡住队友路线", "优先清近点和箱后"],
    pros: ["爆发速度快", "能打乱防守预瞄", "适合抢节奏"],
    cons: ["需要队友技能配合", "被反清或架死时风险很高"],
    bestFor: "适合快攻 B、对手 B 点站位偏后或队伍需要快速打开回合时使用。"
  },
  {
    id: "sova-haven-c-long",
    name: "C Long Scan",
    agentId: "sova",
    mapId: "haven",
    position: { x: 72, y: 66 },
    screenshotLabel: "C 长侦察截图占位",
    play: "用侦察技能确认 C 长前压和平台人数，帮助队伍判断是否能默认控 C。",
    thinking: "Haven 三包点会拉扯防守资源。Sova 的信息能帮助队伍选择更少阻力的路线。",
    tips: ["被破坏时留意对手是否多人前压", "配合无人机可以更深清点", "拿到信息后尽快做决策"],
    pros: ["帮助队伍安全控 C 长", "能逼防守方暴露站位", "适合慢控"],
    cons: ["技能冷却期内信息真空明显", "熟练对手会用假动作骗轮转"],
    bestFor: "适合默认控 C、慢打和防守方喜欢 C 长前压时使用。"
  },
  {
    id: "jett-haven-a-entry",
    name: "A Site Dash Entry",
    agentId: "jett",
    mapId: "haven",
    position: { x: 31, y: 31 },
    screenshotLabel: "A 点突入路线截图占位",
    play: "用烟封近点视野后快速突入 A 点，吸引防守准星并让二号位补枪。",
    thinking: "Haven A 点入口容易被多角度交叉架住，Jett 的任务是让防守方先转移准星。",
    tips: ["确认队友能跟上补枪", "突入前沟通清 Heaven 或 Short", "不要落在孤立无援的位置"],
    pros: ["能快速制造空间", "适合配合闪光提速", "能压缩防守反应时间"],
    cons: ["单人进点容易被集火", "失败后队伍进攻节奏会断"],
    bestFor: "适合 A 点提速、对手技能消耗后和队伍需要主动破局时使用。"
  },
  {
    id: "omen-haven-garage-smoke",
    name: "Garage Split Smoke",
    agentId: "omen",
    mapId: "haven",
    position: { x: 52, y: 54 },
    screenshotLabel: "Garage 分割烟截图占位",
    play: "用烟分割 Garage 和 C 点连接视野，让队伍能从中路与 C 长形成夹击。",
    thinking: "Haven 的 Garage 是转点枢纽。Omen 控住这里，就能让防守回防变得更迟疑。",
    tips: ["烟后不要给对手单向缝隙", "和 C 长队友同步推进", "下包后保留传送或烟做反拉扯"],
    pros: ["压制回防路线", "适合 C 点夹击", "能制造转点威胁"],
    cons: ["队友节奏不齐时容易被逐个击破", "对手强行反清会打断计划"],
    bestFor: "适合 C 点夹击、假打转 C 和需要控制 Garage 枢纽时使用。"
  }
];
export { currentMaps as maps } from "@/lib/data/maps";
export type { ValorantMap } from "@/lib/data/maps";
