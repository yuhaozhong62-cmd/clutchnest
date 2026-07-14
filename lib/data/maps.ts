export type ValorantMap = {
  id: string;
  name: string;
  officialNameCn?: string;
  shortDescriptionCn: string;
  shortDescriptionEn: string;
  coverImage?: string;
  overviewImage?: string;
  currentRotation: boolean;
  rotationPatch: string;
  verifiedAt: string;
  displayOrder: number;
  sites: 2 | 3;
  status: "published" | "draft";
  aliases?: string[];
};

export const maps: ValorantMap[] = [
  {
    id: "ascent",
    name: "Ascent",
    aliases: ["空岛"],
    shortDescriptionCn: "双据点地图，以中路控制和可关闭的机械门为核心。",
    shortDescriptionEn: "A two-site map centered on mid control and closable mechanical doors.",
    coverImage: "/maps/2026-act-4/ascent/cover.webp",
    overviewImage: "/maps/2026-act-4/ascent/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 1,
    sites: 2,
    status: "published"
  },
  {
    id: "breeze",
    name: "Breeze",
    shortDescriptionCn: "双据点海岛地图，强调开阔区域、长距离对枪与侧翼控制。",
    shortDescriptionEn: "An island map built around open spaces, long-range fights and flank control.",
    coverImage: "/maps/2026-act-4/breeze/cover.webp",
    overviewImage: "/maps/2026-act-4/breeze/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 2,
    sites: 2,
    status: "published"
  },
  {
    id: "haven",
    name: "Haven",
    shortDescriptionCn: "三据点地图，区域分散，轮转判断与信息管理尤其重要。",
    shortDescriptionEn: "A three-site map where rotations and information management are critical.",
    coverImage: "/maps/2026-act-4/haven/cover.webp",
    overviewImage: "/maps/2026-act-4/haven/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 3,
    sites: 3,
    status: "published"
  },
  {
    id: "lotus",
    name: "Lotus",
    shortDescriptionCn: "三据点遗迹地图，以旋转门和多路线转点创造节奏变化。",
    shortDescriptionEn: "A three-site ruin with rotating doors and varied rotation paths.",
    coverImage: "/maps/2026-act-4/lotus/cover.webp",
    overviewImage: "/maps/2026-act-4/lotus/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 4,
    sites: 3,
    status: "published"
  },
  {
    id: "split",
    name: "Split",
    shortDescriptionCn: "双据点城市地图，垂直高差、绳索与中路争夺决定进攻空间。",
    shortDescriptionEn: "A vertical city map shaped by ropes, elevation and mid control.",
    coverImage: "/maps/2026-act-4/split/cover.webp",
    overviewImage: "/maps/2026-act-4/split/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 5,
    sites: 2,
    status: "published"
  },
  {
    id: "sunset",
    name: "Sunset",
    shortDescriptionCn: "双据点城市地图，传统三路结构让中路控制成为核心。",
    shortDescriptionEn: "A traditional three-lane city map where mid control drives the round.",
    coverImage: "/maps/2026-act-4/sunset/cover.webp",
    overviewImage: "/maps/2026-act-4/sunset/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 6,
    sites: 2,
    status: "published"
  },
  {
    id: "summit",
    name: "Summit",
    shortDescriptionCn: "双据点山地训练场，可降落墙体会在回合中改变战场结构。",
    shortDescriptionEn: "A mountain training academy where droppable walls reshape the battlefield.",
    coverImage: "/maps/2026-act-4/summit/cover.webp",
    overviewImage: "/maps/2026-act-4/summit/overview.webp",
    currentRotation: true,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 7,
    sites: 2,
    status: "published"
  },
  ...[
    ["bind", "Bind", "双据点地图，以传送门和快速转点为核心。", 2],
    ["pearl", "Pearl", "双据点水下城市地图，强调中路与长通道控制。", 2],
    ["fracture", "Fracture", "双据点分裂设施地图，进攻方可从多方向施压。", 2],
    ["abyss", "Abyss", "双据点垂直地图，开放边界让位移风险更高。", 2],
    ["corrode", "Corrode", "双据点工业遗迹地图，通道与墙体穿透影响控图。", 2],
    ["icebox", "Icebox", "双据点极地设施地图，高差与绳索创造立体交火。", 2]
  ].map(([id, name, description, sites], index): ValorantMap => ({
    id: String(id),
    name: String(name),
    shortDescriptionCn: String(description),
    shortDescriptionEn: "Archived map data reserved for a future all-maps view.",
    currentRotation: false,
    rotationPatch: "13.00",
    verifiedAt: "2026-07-12",
    displayOrder: 101 + index,
    sites: sites as 2 | 3,
    status: "draft"
  }))
];

export const currentMaps = maps
  .filter((map) => map.currentRotation && map.status === "published")
  .sort((a, b) => a.displayOrder - b.displayOrder);

export const inactiveMaps = maps.filter((map) => !map.currentRotation);
