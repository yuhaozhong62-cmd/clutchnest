# PRX Crosshair Verification

核验日期：2026-07-14

## 发布规则

- 选手本人公开、官方资料或两项独立强证据一致，才可标记为“已验证”。
- 只有一个近期专业设置数据库提供完整代码时，标记为“较可信”。
- 缺少完整代码时显示“待核实”，不反推、不拼接、不开放复制。
- 历史代码只有在来源和时间都清楚时才收录；旧数据库结果不会自动成为历史版本。
- 所有职业选手条目均为参考资料，HAO 未实测前不写成个人实战结论。

## 现役名单

当前收录五名现役选手：f0rsakeN、d4v41、Jinggg、something、invy。

名单依据：

- Paper Rex 官方队伍页：<https://pprx.team/teams/valorant>
- Paper Rex 官方新闻：<https://pprx.team/news>
- VLR 当前队伍页：<https://www.vlr.gg/team/624/paper-rex>
- Liquipedia 队伍页：<https://liquipedia.net/valorant/Paper_Rex>

未发现额外注册替补。Tommy、alecks、Wendler、Panda 属于管理或教练团队，不计入现役选手。PatMen、mindfreak、Monyet、Benkai、CGRS 等历史成员不放入当前筛选。

## 逐人状态

| 选手 | 当前状态 | 最近代码来源 | 最近核实 | 处理结果 |
| --- | --- | --- | --- | --- |
| f0rsakeN | 较可信 | ProSettings | 2026-07-13 | 发布完整代码和规范化预览 |
| d4v41 | 较可信 | ProSettings | 2026-07-13 | 发布完整代码；未知自定义色值不额外猜测 |
| Jinggg | 较可信 | ProSettings | 2026-07-13 | 发布数据库当前代码；未直接确认的 Nightbot 变体不收录 |
| something | 较可信 | ProSettings | 2026-06-22 | 发布较新代码；2026-01 的不同旧代码不作为当前版本 |
| invy | 待核实 | ProSettings、Specs.gg | 2026-07-01 | `0` 和 `N/A` 均不是完整代码，禁用复制与预览 |

完整代码与规范化参数记录见 `research/prx-crosshairs-2026-07-14.md`。四条可发布记录均只有第三方数据库证据，没有可直接核实的选手本人同期完整设置，因此没有任何条目标记为“已验证”。建议在 2026-08-14 前完成下一轮复查。

## 冲突与排除

- Jinggg：ProSettings 评论提到一个 Nightbot 垂直长度变体，但目标命令无法直接读取核实，且评论本身不是足够强的发布证据。
- something：VCRDB 的 2026-01 代码与 ProSettings 的 2026-06 代码不同；采用时间更近的记录，旧结果只留在研究记录中。
- invy：禁止把 ProSettings 显示的 `0` 当成可导入代码，也不从比赛画面估算线长、厚度或偏移。

## 免责声明

职业选手可能随时更改设置。ClutchNest 与 Paper Rex 及其选手不存在官方合作或隶属关系。相同准星不会带来相同竞技表现。
