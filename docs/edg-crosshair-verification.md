# EDG Crosshair Verification

核实日期：2026-07-14

## 当前名单

本次前台“EDG 现役”统计采用 VCT 2026 China Stage 2 官方名单的公开整理结果：

| 选手 | 姓名 | 状态 | 身份来源 |
| --- | --- | --- | --- |
| ZmjjKK | 郑永康（康康） | 现役 | VCT CN Stage 2 名单、VLR team profile |
| CHICHOO | 万顺治 | 现役 | VCT CN Stage 2 名单、VLR team profile |
| nobody | 王森旭 | 现役 | VCT CN Stage 2 名单、VLR team profile |
| Smoggy | 张钊 | 现役 | VCT CN Stage 2 名单、VLR team profile |
| Jieni7 | 张君泰 | 现役 | VCT CN Stage 2 名单、VLR player profile |

主要名单来源：

- https://valorantnews.jp/archives/120851 （引用 2026-07-08 VCT CN 官方名单帖）
- https://www.vlr.gg/team/1120/edward-gaming
- https://www.vlr.gg/team/transactions/1120/edward-gaming/

## 名单变化与冲突

- CB（王晴川）于 2026-07-02 离开 EDG。前台只在“历史资料”中展示其 EDG 时期代码，不显示“EDG 现役”标签。
- CB 离队来源：https://weibo.com/7601012575/R6P3K34Wn
- VLR 的 team profile 在核实时仍列出 zjc 为替补，但最新 Stage 2 参赛名单没有 zjc，ProSettings 于 2026-07-13 也将其队伍更新为 Free Agent。由于来源状态存在同步时间差，zjc 不进入本次“EDG 现役全员准星”前台统计。
- 建议在每个 VCT 赛事报名名单发布后重新检查一次，常规周期不超过 30 天。

## 准星记录

| 选手 | 版本 | 代码状态 | 来源日期 | 可信度 |
| --- | --- | --- | --- | --- |
| ZmjjKK | primary-2026-07 | 完整、格式通过 | ProSettings 2026-07-05；VPEsports 2026-07-14 访问 | 较可信，两个数据库代码一致 |
| CHICHOO | primary-2026-05 | 完整、格式通过 | ProSettings 2026-05-26 | 较可信，缺少选手本人直接证据 |
| nobody | primary-2026-07 | 完整、格式通过 | ProSettings 2026-07-13 | 较可信，数据库更新较新 |
| Smoggy | primary-2026-05 | 完整、格式通过 | ProSettings 2026-05-21 | 较可信，存在近期点准星冲突线索 |
| Smoggy | alternative-dot-pending | 无完整代码 | 2026-05-13 直播回放线索 | 待核实 |
| Jieni7 | verification-pending | 无完整代码 | 2026-07-14 调查 | 待核实 |
| CB | previous-edg-2026-03 | 完整、格式通过 | ProSettings 2026-03-09 记录 | 历史版本，不属于现役 EDG |

## 完整代码

### ZmjjKK

`0;P;h;0;d;1;f;0;0l;2;0v;2;0g;1;0o;1;0f;0;1b;0`

### CHICHOO

`0;s;1;P;c;5;h;0;f;0;s;0;0l;3;0o;0;0a;1;0f;0;1b;0`

### nobody

`0;s;1;P;o;1;m;1;0t;1;0l;2;0v;2;0g;1;0o;2;0a;1;0f;0;1b;0;S;c;5;o;1`

### Smoggy

`0;p;0;s;1;P;o;0.3;f;0;0l;3;0o;2;0a;1;0f;0;1b;0;A;o;0.3;d;1;0b;0;1b;0`

### CB（历史）

`0;s;1;P;c;5;h;0;f;0;0l;3;0o;1;0a;1;0f;0;1b;0;S;c;5;s;0.6;o;1`

## Jieni7 调查结果

已检查近期比赛资料、VLR / Liquipedia 选手页、专业设置数据库和公开搜索结果。没有找到选手本人直接展示的设置，也没有两个独立来源提供同一条近期完整代码。根据“不编造、不使用相似准星代替”的规则，前台保留 Jieni7 现役卡片，禁用复制并显示“准星待核实”。

## 来源性质

- 本次准星代码均来自第三方专业数据库，没有任何一条被标记为 Riot 或 EDG 官方准星代码。
- ZmjjKK 有两个数据库展示相同代码，但仍缺少本次核实周期内的选手本人设置页证据。
- Smoggy 的直播线索只用于记录冲突，不用于反推或生成代码。
- 玩家社区评论不作为任何已发布代码的唯一依据。

## 后续检查

1. 每 30 天检查一次 ProSettings 页面更新时间。
2. 每次 VCT 报名名单发布后重新核对队伍状态。
3. 优先寻找选手本人直播中的设置页面或 `/cc` 分享证据。
4. 若来源冲突，保留多版本，不覆盖历史记录。
5. HAO 完成实战测试前，不添加“亲测”评价或评分。
