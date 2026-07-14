# XLG Crosshair Research Notes - 2026-07-14

本文件记录检索路径和事实摘要，不复制来源站点长段文字。

## 阵容检索

- 查询：`XLG VALORANT current roster 2026`、`Xi Lai Gaming VALORANT roster`、`XLG 无畏契约 阵容公告`。
- XLG 2026-06-02 官方伦敦名单：happywei、Rarga、NoMan、Lysoar、WsLeo；hvoya、steady 为教练。
- VLR 当前队伍页在上述五人之外列出 Sharks。
- 继续追踪后找到 XLG 2026-07-13 官方晋升公告和 VLR 第六人报道，确认 Sharks 从二队升入一队。
- 结论：现役注册名单按六人收录；Sharks 先标记为 substitute。候选名单少一人。

## 准星检索

### Rarga

- 查询：`XLG Rarga Valorant crosshair 2026`、`Rarga crosshair code`。
- ProSettings 与 VPEsports 显示同一完整代码：`0;P;o;1;d;1;0b;0;1b;0`。
- 两个站点可能共享资料链，缺少选手本人设置页或近期比赛设置画面，因此定为 likely。

### lysoar

- 查询：`XLG lysoar crosshair`、`梁优好 准星`。
- ProSettings 显示完整代码：`0;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0`。
- 没有找到第二项独立强证据，定为 likely。

### NoMan

- 查询时始终组合 `XLG NoMan Valorant crosshair`，排除同名无关结果。
- Specs.gg 明确将 Crosshair Code 标为 UNKNOWN，多个设置字段同样未知。
- 不从可见字段拼接代码；保留 verificationPending。

### WsLeo

- 查询：`XLG WsLeo crosshair`、`WsLeo VALORANT settings`、`黄品维 准星`，同时检查 Wsleo / WSLeo 大小写。
- 研究摘要只能确认青色视觉方向，并明确指出来源数值有差异。
- 无法得到可安全发布的完整代码，保留 verificationPending。

### happywei

- 查询：`XLG happywei crosshair`、`邓闵维 准星`、`happywei settings`。
- ProSettings 与设置研究摘要显示相同代码：`0;P;o;1;d;1;a;0.66;0b;0;1b;0`。
- 第二页面可能整理自同一数据库，保守定为 likely。

### Sharks

- 查询：`XLG Sharks Valorant crosshair`、`邱戈 准星`，并检查晋升公告、VLR 资料与近期赛事线索。
- 只确认一队身份，未找到可靠完整代码，保留 verificationPending。

## 发布规则检查

- 通过本地代码校验器后才开放复制。
- verificationPending 不生成预览、不开放复制。
- 代码和 normalizedSettings 分别人工比对颜色、描边、中心点、内线、外线与误差字段。
- 所有条目使用 `contentType: "pro-reference"`、`createdBy: "ClutchNest Research"`、`haoTestStatus: "untested"`。
- 下次复查日期：2026-08-13，或出现阵容变更、选手直播设置页、本人代码时提前复查。
