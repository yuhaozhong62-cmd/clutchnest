# ClutchNest Professional Crosshair Research

Verification date: 2026-07-10

## Research policy

- These are recently verified public settings, not permanent claims about what a player is using now.
- Player and team names identify the source of public settings only. No endorsement is implied.
- ProSettings was used as the primary structured source. A second independent settings database was required to match the published code.
- Source pages without a visible update date are recorded as undated rather than assigned an invented date.
- Preview images are original ClutchNest renders based on the settings below. No third-party screenshots, player photos, team logos, or watermarks are used.

## aspas

- Professional status: Active professional VALORANT player
- Current team: MIBR
- Crosshair code: `0;s;1;P;o;1;d;1;0b;0;1b;0;S;c;0`
- Primary color: White (`#ffffff`)
- Outlines: On, opacity 1, thickness 1
- Center dot: On, opacity 1, thickness 2
- Inner lines: Off (stored values 1 / 4 / 2 / 0)
- Outer lines: Off (0 / 0 / 0 / 0)
- Movement error: Off for primary inner lines; outer-line stored flags are not rendered because outer lines are disabled
- Firing error: Off for primary inner lines; outer-line stored flags are not rendered because outer lines are disabled
- Sources:
  - ProSettings: https://prosettings.net/players/aspas/ (updated 2026-06-01)
  - VPEsports: https://valorant.vpesports.com/players/aspas/ (no visible update date; checked 2026-07-10)
- Team/status cross-check: both sources identify aspas as an active MIBR player
- Conflicts: Valorant-Crosshairs (added 2026-02-12) lists a cyan thickness-3 dot, and TechGarena (updated 2026-02-20) lists an older white 1/4/2/2 cross. Both are older than the June ProSettings record. The published code is the newer code independently matched by VPEsports.
- Confidence: High

## zekken

- Professional status: Active professional VALORANT player
- Current team: MIBR
- Crosshair code: `0;s;1;P;c;1;t;2;o;1;d;1;0b;0;1b;0;S;b;1;c;8;s;0.823`
- Primary color: Green (`#00ff00`)
- Outlines: On, opacity 1, thickness 2
- Center dot: On, opacity 1, thickness 2
- Inner lines: Off (stored values 1 / 1 / 2 / 1)
- Outer lines: Off (0 / 0 / 0 / 0)
- Movement error: Off
- Firing error: Off
- Sources:
  - ProSettings: https://prosettings.net/players/zekken/ (updated 2026-05-21)
  - VPEsports: https://valorant.vpesports.com/players/zekken/ (no visible update date; checked 2026-07-10)
- Team/status cross-check: Liquipedia identifies zekken as active with MIBR from 2025-12-18
- Conflicts: A low-authority article published 2026-07-09 lists a different green-dot code while also incorrectly describing his team as Sentinels. It was rejected because its identity context is stale. Several independent settings databases match the ProSettings code exactly.
- Confidence: High

## something

- Professional status: Active professional VALORANT player
- Current team: Paper Rex
- Crosshair code: `0;s;1;P;h;0;0l;2;0o;1;0a;1;0f;0;1b;0;S;c;0;s;0.713;o;1`
- Primary color: White (`#ffffff`)
- Outlines: Off
- Center dot: Off
- Inner lines: On, opacity 1, length 2, thickness 2, offset 1
- Outer lines: Off (stored values 1 / 4 / 1 / 0)
- Movement error: Off for visible inner lines
- Firing error: Off for visible inner lines
- Sources:
  - ProSettings: https://prosettings.net/players/something/ (updated 2026-06-22)
  - VPEsports: https://valorant.vpesports.com/players/something/ (no visible update date; checked 2026-07-10)
- Team/status cross-check: ProSettings identifies something as an active Paper Rex player; recent 2026 results also list Paper Rex
- Conflicts: No code conflict found between the two selected sources.
- Confidence: High

## t3xture

- Professional status: Active professional VALORANT player
- Current team: Gen.G
- Crosshair code: `0;s;1;P;o;0;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;S;o;0`
- Primary color: White (`#ffffff`)
- Outlines: Enabled in the profile but opacity 0, so no visible outline; thickness 1
- Center dot: Off
- Inner lines: On, opacity 1, length 3, thickness 2, offset 2
- Outer lines: Off
- Movement error: Off
- Firing error: Off
- Sources:
  - ProSettings: https://prosettings.net/players/t3xture/ (updated 2026-04-27)
  - VPEsports: https://valorant.vpesports.com/players/t3xture/ (no visible update date; checked 2026-07-10)
- Team/status cross-check: Liquipedia lists t3xture as active with Gen.G and was checked against recent 2026 competition records
- Conflicts: A recent unverified ProSettings user comment claims an EWC crosshair with shorter lines (`0;P;h;0;0l;2;0v;2;0o;1;0a;1;0f;0;1b;0`) but provides no footage or player source. Because the two structured sources match exactly and the newer claim is unsupported, the structured code is published with medium confidence rather than presented as permanently current.
- Confidence: Medium

## Alfajer

- Professional status: Active professional VALORANT player
- Current team: Fnatic
- Crosshair code: `0;p;0;s;1;P;h;0;f;0;0l;2;0o;2;0a;1;0f;0;1b;0;A;c;5;o;1;d;1;0b;0;1b;0;S;s;0.628;o;1`
- Primary color: White (`#ffffff`)
- Outlines: Off (stored opacity 1, thickness 1)
- Center dot: Off
- Inner lines: On, opacity 1, length 2, thickness 2, offset 2
- Outer lines: Off
- Movement error: Off for visible primary lines
- Firing error: Off for visible primary lines
- ADS profile note: The code also contains an alternate cyan dot ADS profile. The public preview intentionally renders the primary hip-fire crosshair.
- Sources:
  - ProSettings: https://prosettings.net/players/alfajer/ (updated 2026-05-11)
  - VALMAUK: https://ggmauk.com/valorant/pro/alfajer (no visible update date; checked 2026-07-10)
- Team/status cross-check: Liquipedia lists Alfajer as active with Fnatic
- Conflicts: TechGarena (updated 2026-02) lists an older green dot code. The later May ProSettings code is independently matched by VALMAUK and is used here.
- Confidence: High

## Preview rendering notes

- Output target: 1200 × 675 pixels
- Shared background and scale: fixed for all five players
- Renderer route: `/internal/crosshair-preview/[id]`
- Rendered properties: primary color, visible outline, center dot, inner-line length, thickness, and offset
- Disabled line groups are not drawn even if the imported profile retains stored values for those controls
- All previews must be visually inspected before publication
