# ClutchNest Premium Visual Audit

## Audit scope

The production baseline was reviewed across the home page, crosshair library, HAO-tested content, EDG/XLG/PRX team sections, streamer section, crosshair details, global search page and dialog, agents and maps, Cypher on Ascent, About, mobile navigation, and footer.

## Current visual issues

| Area | Observed issue | Refinement principle |
| --- | --- | --- |
| Global layout | Pages use similar but not explicit width and spacing rules; vertical gaps vary between 64 and 96 pixels without a shared system. | Use one 1200px content container, one 768px reading width, and a restrained spacing scale. |
| Color and contrast | Pure black surfaces feel flat while many `zinc-600/700` labels are too dim for comfortable reading. | Use three near-black layers, softer white, readable neutral gray, and one low-saturation red accent. |
| Typography | The home display reaches 8xl while page titles and section headings use several unrelated sizes. English support copy sometimes competes with Chinese. | Define display, H1, H2, H3, lead, body and support-copy roles. Keep Chinese dominant and English smaller and quieter. |
| Navigation | Blur is strong, hover backgrounds and active underline compete, and mobile active links become large white blocks. | Stabilize height, reduce blur, use brighter text plus a thin accent line as the single active cue. |
| Home | The hero is oversized and leaves a large featureless black region. Repeated card patterns make sections feel similar. | Reduce display size, add a nearly invisible technical grid, strengthen editorial rhythm, and vary section presentation without changing content. |
| Cards | Radius, border intensity, padding and hover behavior vary. Some cards feel detached from the page. | Standardize small and large surfaces, 10-14px radii, 1px borders, 1px hover lift and no glow. |
| Crosshair cards | Preview, metadata, tags and actions have competing weights; code blocks can resemble developer tooling. | Make preview the visual anchor, show at most two tags, use a quiet monospace code well, and separate the detail action. |
| Team sections | Five equal statistic cells read like an admin dashboard and outweigh the content. Player tabs use full white selected states. | Convert stats to a concise inline summary and use a subtle accent selection state. |
| Streamer section | Two full rows of equally strong filters add density before content. | Keep region as primary filters and soften streamer selection as secondary controls. |
| Search | Result content occupies a narrow portion of a wide page; dialog overlay and card selection feel heavy. | Use the shared reading rhythm, compact result surfaces, low-blur overlay and a quiet selected border/background. |
| Agents and maps | Agent placeholders create large empty blocks; selected red borders dominate. Map and control panels use several border levels. | Keep fixed media ratios, strengthen graceful fallbacks, and use one subtle selected treatment while maximizing the map. |
| Detail drawers | Headers, metadata and long sections have similar weights, creating dense reading. | Put identity, preview and primary action first; use calmer section separators and stable desktop/mobile widths. |
| Footer | Essential links and year are absent, while the English disclaimer is visually long. | Add compact navigation and year, retain the required fan disclaimer, and keep legal support text quiet. |
| Motion | Page entrance moves 8px over 420ms; transitions vary across components. | Use 140ms feedback and 220ms standard transitions, limit movement to 1-2px, and fully respect reduced motion. |
| Mobile | Filters and metadata can stack too densely; active navigation blocks are visually heavy. | Preserve horizontal filter scrolling, 20px safe gutters, 44px touch targets and lightweight active states. |

## Before and after

Before, the interface is functional and coherent but relies on pure black, repeated bordered panels, oversized white selections, and inconsistent type/spacing. After refinement, the same routes and content use a warmer near-black depth system, one container grid, quieter controls, stronger Chinese-first hierarchy, consistent card proportions, and restrained motion.

## Preserved design elements

- Black minimalist direction and Chinese-first bilingual content
- ClutchNest wordmark and compact CN monogram
- Valorant-red direction as the single brand accent
- Existing navigation structure, URLs, search parameters and all published data
- Real crosshair previews, interactive maps, drawers, copy controls and filters
- Thin lines, technical grid motifs and editorial content presentation

## Removed or weakened elements

- Pure-black-on-pure-black page flattening
- Oversized hero typography and excessive empty first-screen space
- Bright white selected filter blocks
- Repeated dashboard-style statistic cards
- Excessive uppercase English labels and very dim support copy
- Strong hover background shifts, large blur and long entrance movement
- Inconsistent radii, button heights and focus treatments

## Acceptance guardrails

No published codes, verification states, rosters, streamer data, HAO reviews, map data, tactic content, search meaning, route, canonical, sitemap, robots or fan-project disclaimer may change. The refinement remains dependency-free and does not introduce remote fonts, animation libraries, video, WebGL or additional client-side feature code.
