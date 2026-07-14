export type SearchContentType = "crosshair" | "player" | "team" | "agent" | "map" | "tactic";

export type SearchContentStatus = "published" | "draft" | "sample";

export type SearchItemMeta = {
  code?: string;
  player?: string;
  team?: string;
  style?: string;
  role?: string;
  side?: string;
  area?: string;
  utility?: string;
  difficulty?: string;
  rosterStatus?: string;
  currentRotation?: string;
  crosshairCount?: number;
  playerCount?: number;
  verifiedCount?: number;
  guideCount?: number;
};

export interface SearchIndexItem {
  id: string;
  type: SearchContentType;
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  keywords: string[];
  aliases: string[];
  tags: string[];
  teamId?: string;
  playerId?: string;
  agentId?: string;
  mapId?: string;
  tacticId?: string;
  image?: string;
  status: SearchContentStatus;
  featured?: boolean;
  updatedAt?: string;
  searchText: string;
  meta?: SearchItemMeta;
}

export type SearchResult = {
  item: SearchIndexItem;
  score: number;
  matchedTerms: string[];
};

export const searchTypeOrder: SearchContentType[] = ["crosshair", "player", "team", "agent", "map", "tactic"];

export const searchTypeLabels: Record<SearchContentType, string> = {
  crosshair: "准星",
  player: "选手",
  team: "战队",
  agent: "英雄",
  map: "地图",
  tactic: "打法"
};
