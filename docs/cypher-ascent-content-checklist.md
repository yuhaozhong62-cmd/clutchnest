# Cypher × Ascent 内容补拍清单

更新时间：2026-07-13

## 通用拍摄标准

- 使用当前 Patch 13.00 的自定义房间。
- 每条战术至少补齐：完整地图位置、道具近景、玩家站位、结果视角。
- 摄像头战术额外补充摄像头最终视野；陷阱线战术额外补充触发高度和攻方第一视角。
- 图片建议使用 16:9 WebP，宽度不低于 1600px；隐藏聊天、好友信息和账号隐私内容。
- 每个像素点从攻防双方视角复核。无法重复放置或双方视野不成立时，不发布。

## 公开战术补拍

| 战术目录 | 必拍内容 | 推荐文件名 |
| --- | --- | --- |
| `a-main-default-camera` | A Site 站位、摄像头附着面、A Main 观察视野 | `map-location.webp`, `placement.webp`, `camera-view.webp` |
| `a-main-anti-rush-net` | 陷阱线两端与高度、烟笼落点、后点处理枪线 | `map-location.webp`, `trip-placement.webp`, `cage-placement.webp`, `player-position.webp` |
| `a-site-retake-anchor` | 后置陷阱、回防摄像头、Tree / Spawn 回防 POV | `map-location.webp`, `trip-placement.webp`, `camera-view.webp`, `retake-pov.webp` |
| `b-main-default-camera` | B Site 站位、摄像头附着面、B Main 观察视野 | `map-location.webp`, `placement.webp`, `camera-view.webp` |
| `b-main-anti-rush-net` | 陷阱线高度、烟笼切割区、B 后点撤退路线 | `map-location.webp`, `trip-placement.webp`, `cage-placement.webp`, `player-position.webp` |
| `mid-market-information-net` | Mid 摄像头、Market 内侧陷阱、Market 响应枪线 | `map-location.webp`, `camera-placement.webp`, `trip-placement.webp`, `market-pov.webp` |
| `tree-rotation-insurance` | Tree / A Link 线高、队友轮转不受阻视角 | `map-location.webp`, `trip-placement.webp`, `rotation-pov.webp` |
| `a-lobby-flank-watch` | A Lobby 隐蔽线、绕后方第一视角、跟队路线 | `map-location.webp`, `trip-placement.webp`, `flanker-pov.webp` |
| `b-lobby-flank-watch` | B Lobby 隐蔽线、绕后方第一视角、跟队路线 | `map-location.webp`, `trip-placement.webp`, `flanker-pov.webp` |
| `mid-default-information` | 后路线、Mid 摄像头、Mid Top 安全站位 | `map-location.webp`, `trip-placement.webp`, `camera-placement.webp`, `camera-view.webp` |
| `a-site-post-plant-control` | 推荐包位、Tree / Link 线、烟笼与守包枪线 | `map-location.webp`, `plant-position.webp`, `trip-placement.webp`, `result.webp` |
| `b-site-post-plant-control` | 推荐包位、Market 线、烟笼与 B Main 守包枪线 | `map-location.webp`, `plant-position.webp`, `trip-placement.webp`, `result.webp` |

目标目录：`public/valorant/cypher/ascent/<战术目录>/`

## 待验证研究项

- `a-main-one-way-cage-research`：验证落点重复性、双方腿部视野和常见反制。
- `b-main-one-way-cage-research`：验证不同距离和角色模型下是否仍有真实单向效果。
- `a-site-high-camera-research`：验证附着面、包点覆盖、进点方第一眼可见度。
- `b-site-high-camera-research`：验证 B Main、Market、包点覆盖与镜头存活时间。
- 所有公开战术的地图标记目前是区域标记；正式截图发布前，逐条确认陷阱线高度、摄像头附着面和烟笼落点。

## 版本更新复查

- Cypher 摄像头、陷阱线、烟笼的放置规则、启动时间、触发和破坏机制。
- Ascent 的 A Main、B Main、Market、Tree、门和可破坏结构是否变化。
- 位移技能和召唤物能否越过或破坏现有陷阱线。
- 不恢复 Patch 9.08 已影响的旧 Mid Window 破窗陷阱，除非 Riot 再次修改交互并完成实机验证。
- 每次大版本后更新 `verifiedPatch`、`lastVerifiedAt` 和战术状态。
