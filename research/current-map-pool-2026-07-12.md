# VALORANT 当前竞技地图池核验

- 核验日期：2026-07-12
- 当前版本：Patch 13.00
- 当前赛段：V26 Act 4
- 结论置信度：高

## 当前 Competitive 地图池

1. Ascent
2. Breeze
3. Haven
4. Lotus
5. Split
6. Sunset
7. Summit

## 轮换结论

Patch 13.00 于 2026-06-23 开启 V26 Act 4。Riot 在该补丁中将 Summit 与 Sunset 加入 Competitive 和 Deathmatch，并将 Fracture 与 Pearl 移出。

当前七图由连续官方轮换记录交叉核对：

- Patch 12.05：Lotus、Fracture 加入；Abyss、Corrode 移出。
- Patch 12.08：Ascent 加入；Bind 移出。
- Patch 13.00：Summit、Sunset 加入；Fracture、Pearl 移出。

结合未被后续轮换替换的 Breeze、Haven 与 Split，得到当前七图列表。

## 临时可用性说明

Summit 从 Patch 13.00 发布当天进入 Competitive。Riot 同时提供了首两周 Summit 败局 RR 减免，以及为期 7 天的 Summit Only 队列。这两项均为发布期临时安排，不改变长期地图池结论；截至本次核验日，官方补丁未列出当前地图不可用问题。

## 官方来源

| 来源 | 发布日期 | 用途 |
| --- | --- | --- |
| [VALORANT Patch Notes 13.00](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-00/) | 2026-06-23 | 当前 Act、Summit/Sunset 加入及 Fracture/Pearl 移出 |
| [VALORANT Patch Notes 12.08](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-08/) | 2026-04-28 | Ascent 加入及 Bind 移出 |
| [VALORANT Patch Notes 12.05](https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-12-05/) | 2026-03-17 | Lotus/Fracture 加入及 Abyss/Corrode 移出 |
| [Maps - VALORANT](https://playvalorant.com/en-us/maps/) | 页面未标注发布日期；核验于 2026-07-12 | 地图名称、官方简介、封面和俯视图素材 |
| [Riot Games Legal](https://www.riotgames.com/en/legal) | 页面未标注发布日期；核验于 2026-07-12 | Riot 素材权利与使用边界参考 |

## 素材处理

封面与俯视图均来自官方 VALORANT 地图页使用的 Riot CDN。生产环境只使用下载到 `public/maps/2026-act-4/` 的本地 WebP 文件，不会热链外部图片。封面保留 16:9 构图；俯视图保留完整地图区域，没有添加点位标记。

