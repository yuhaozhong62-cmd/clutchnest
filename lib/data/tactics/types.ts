export type TacticSide = "attack" | "defense";
export type TacticDifficulty = "easy" | "medium" | "advanced";
export type TacticStatus = "published" | "draft" | "needsVerification";

export type TacticPointType =
  | "camera"
  | "tripwire"
  | "cage"
  | "stand"
  | "target"
  | "route"
  | "plant";

export type TacticUtilityType =
  | "camera"
  | "tripwire"
  | "cage"
  | "setup"
  | "retake"
  | "postPlant"
  | "flankWatch";

export interface TacticMapPoint {
  id: string;
  label: string;
  type: TacticPointType;
  x: number;
  y: number;
  title: string;
  description?: string;
}

export interface TacticImage {
  src: string;
  alt: string;
  caption: string;
  type: "map" | "placement" | "pov" | "result";
}

export interface TacticSource {
  title: string;
  url: string;
  sourceType: "official" | "vct" | "guide" | "community";
}

export interface CypherTactic {
  id: string;
  slug: string;
  titleZh: string;
  titleEn: string;
  shortDescriptionZh: string;
  shortDescriptionEn?: string;
  side: TacticSide;
  site: string;
  area: string;
  difficulty: TacticDifficulty;
  status: TacticStatus;
  categories: string[];
  utilityTypes: TacticUtilityType[];
  purpose: string;
  exactLocation: string;
  setupSteps: string[];
  howToPlay: string[];
  timing: string;
  playerPosition: string;
  informationResponse: string[];
  teamSynergy: string[];
  strengths: string[];
  weaknesses: string[];
  counters: string[];
  variations: string[];
  haoReview?: string;
  mapPoints: TacticMapPoint[];
  images: TacticImage[];
  verifiedPatch?: string;
  lastVerifiedAt?: string;
  verificationNotes?: string;
  requiresInGameVerification: boolean;
  sources?: TacticSource[];
}
