import { validateValorantCrosshairCode } from "@/lib/crosshairCode";
import type { CrosshairVersion, ProPlayerCrosshairProfile } from "@/lib/data/crosshairTeams/types";

export function getCrosshairVersion(profile: ProPlayerCrosshairProfile, versionId?: string): CrosshairVersion {
  if (versionId) {
    const selected = profile.crosshairs.find(
      (version) => version.id === versionId || version.slug === versionId || version.versionStatus === versionId
    );
    if (selected) return selected;
  }

  return profile.crosshairs.find((version) => version.versionStatus === "primary") ?? profile.crosshairs[0];
}

export function warnInvalidCrosshairCodes(profiles: ProPlayerCrosshairProfile[]) {
  if (process.env.NODE_ENV === "production") return;

  for (const profile of profiles) {
    for (const version of profile.crosshairs) {
      if (!version.code) continue;
      const validation = validateValorantCrosshairCode(version.code);
      if (!validation.valid) {
        console.warn(`[crosshair] ${profile.teamId}/${profile.playerId}/${version.id}: ${validation.reasons.join("；")}`);
      }
    }
  }
}
