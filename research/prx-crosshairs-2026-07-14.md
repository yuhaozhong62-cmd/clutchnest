# PRX Crosshair Research - 2026-07-14

## 目标

建立 PRX 现役全队专题，优先保证名单完整、代码可追溯和状态标签诚实。

## 名单调查

- 官方队伍页：<https://pprx.team/teams/valorant>
- 官方新闻：<https://pprx.team/news>
- VLR：<https://www.vlr.gg/team/624/paper-rex>
- Liquipedia：<https://liquipedia.net/valorant/Paper_Rex>
- 官方阵容服商品页：<https://shop.pprx.team/products/prx-london-tee>

交叉结果为 f0rsakeN、d4v41、Jinggg、something、invy 五人。官方新闻记录 invy 于 2025-12-16 加入、PatMen 于 2025-12-15 离队、mindfreak 于 2025-10-20 离队；没有把工作人员或内容创作者算作选手。

## 准星调查

### 发布数据总表

| 选手 | 完整代码 | 规范化参数摘要 | 版本 / 可信度 | 本人直接证据 |
| --- | --- | --- | --- | --- |
| f0rsakeN | `0;p;0;c;1;s;1;P;h;0;f;0;s;0;0l;3;0v;3;0g;1;0o;0;0a;1;0f;0;1b;0;A;o;1;d;1;0b;0;1b;0;S;d;0` | 白色；描边关；中心点关；内线 1/3/3/2/0；移动与射击误差关；外线关 | primary / likely | 无 |
| d4v41 | `0;P;c;8;o;1;d;1;b;1;z;1;0t;1;0l;1;0o;0;0a;1;0f;0;1b;0` | 来源页显示白色；描边 1/1；中心点 1/1；内线 1/1/1/0；误差关；外线关 | primary / likely | 无 |
| Jinggg | `0;s;1;P;c;8;u;FF99FFFF;o;1;b;1;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;S;c;5;o;1` | 自定义粉色 `#ff99ff`；描边 1/1；中心点关；内线 1/3/3/2/2；误差关；外线关 | primary / likely | 无可直接核实记录 |
| something | `0;s;1;P;h;0;0l;2;0o;1;0a;1;0f;0;1b;0;S;c;0;s;0.713;o;1` | 白色；描边关；中心点关；内线 1/2/2/2/1；误差关；外线关；未确认狙击镜细分参数不补写 | primary / likely | 无 |
| invy | 未公开 | 未公开 / Unknown | verificationPending | 无 |

规范化内线顺序为“不透明度 / 水平长度 / 垂直长度 / 厚度 / 偏移”。所有第三方代码均在 2026-07-14 由 ClutchNest 重新检查字符串完整性。

### f0rsakeN

- 来源：<https://prosettings.net/players/f0rsaken/>
- 页面记录更新时间：2026-07-13
- 完整代码存在，白色短十字，无描边。
- 只有一个近期数据库来源，状态为“较可信”。

### d4v41

- 来源：<https://prosettings.net/players/d4v41/>
- 页面记录更新时间：2026-07-13
- 完整代码存在，中心点、描边和极短内线开启。
- 自定义颜色字段没有独立可确认值，不额外补造色值。

### Jinggg

- 来源：<https://prosettings.net/players/jinggg/>
- 页面记录更新时间：2026-07-13
- 当前数据库代码为粉色紧凑十字。
- 页面评论提到玩家 Nightbot 命令中的垂直长度变体，但无法直接读取目标命令；不升级为已验证，也不发布该变体。

### something

- 当前来源：<https://prosettings.net/players/something/>
- 当前记录更新时间：2026-06-22
- 冲突旧来源：<https://www.vcrdb.net/crosshair/8084>，记录日期为 2026-01-24。
- 当前发布较新的 ProSettings 版本；旧代码不满足明确的近期使用证据，暂不作为历史卡片。

### invy

- ProSettings：<https://prosettings.net/players/invy/>，代码显示 `0`。
- Specs.gg：<https://specs.gg/Invy>，Crosshair Code 显示 `N/A`。
- 两项来源均未给出完整代码，因此标记“待核实”，禁用复制，不绘制假预览。

## 后续复核

- 关注选手本人直播命令、公开设置展示与赛事第一视角。
- 每 30 天复查一次数据库时间戳。
- 新代码出现时保留当前来源、核实日期和差异说明，不直接覆盖历史记录。
- 推荐下一次完整核验日期：2026-08-14。
