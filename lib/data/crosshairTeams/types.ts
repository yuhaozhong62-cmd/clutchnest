export type VerificationStatus = "verified" | "likely" | "unverified" | "verificationPending";

export type CrosshairVersionStatus = "primary" | "alternative" | "previous" | "verificationPending";

export type RosterStatus = "starter" | "rotation" | "substitute" | "active" | "inactive";

export type CrosshairSource = {
  title: string;
  url: string;
  sourceType: "player" | "official" | "match" | "stream" | "database" | "community";
  publishedAt?: string;
  accessedAt: string;
  notes?: string;
};

export type NormalizedCrosshairSettings = {
  colorName?: string;
  colorHex?: string;
  outlinesEnabled?: boolean;
  outlineOpacity?: number;
  outlineThickness?: number;
  centerDotEnabled?: boolean;
  centerDotOpacity?: number;
  centerDotThickness?: number;
  innerLinesEnabled?: boolean;
  innerLineOpacity?: number;
  innerLineLength?: number;
  innerLineVerticalLength?: number;
  innerLineThickness?: number;
  innerLineOffset?: number;
  innerMovementError?: boolean;
  innerFiringError?: boolean;
  outerLinesEnabled?: boolean;
  outerLineOpacity?: number;
  outerLineLength?: number;
  outerLineVerticalLength?: number;
  outerLineThickness?: number;
  outerLineOffset?: number;
  outerMovementError?: boolean;
  outerFiringError?: boolean;
  sniperCenterDotColor?: string;
  sniperCenterDotEnabled?: boolean;
  sniperCenterDotOpacity?: number;
  sniperCenterDotThickness?: number;
};

export type CrosshairVersion = {
  id: string;
  slug: string;
  titleZh: string;
  titleEn: string;
  code?: string;
  versionStatus: CrosshairVersionStatus;
  verificationStatus: VerificationStatus;
  normalizedSettings?: NormalizedCrosshairSettings;
  summaryZh: string;
  summaryEn?: string;
  styleTags: string[];
  recommendedFor: string[];
  strengths: string[];
  weaknesses: string[];
  lastVerifiedAt?: string;
  verificationNotes?: string;
  sources: CrosshairSource[];
  haoTestStatus: "untested" | "testing" | "tested";
  haoReview?: string;
};

export type ProPlayerCrosshairProfile = {
  playerId: string;
  displayName: string;
  nameZh?: string;
  realNameZh: string;
  teamId: "edg";
  isCurrentRoster: boolean;
  rosterStatus: RosterStatus;
  rosterVerifiedAt: string;
  rosterSources: CrosshairSource[];
  role?: string;
  initials: string;
  crosshairs: CrosshairVersion[];
};
