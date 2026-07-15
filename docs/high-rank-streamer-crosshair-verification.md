# 高分主播准星发布核验

核验日期：2026-07-15；下次复核：2026-08-14。

## 发布清单

| 主播 | 地区 | 频道 | 段位状态 | 准星代码 | 状态 | HAO 实测 |
| --- | --- | --- | --- | --- | --- | --- |
| Meiy | 亚太 | Twitch / meiy_vl | V26 Act I Radiant #43 | 完整、可导入 | 较可信 | 否 |
| Dep | 亚太 | Twitch / dep_ow | V26 Act I Radiant #60 | 完整、可导入 | 较可信 | 否 |
| SkRossi | 亚太 | YouTube / SkRossi | V25 Act II Radiant；近期 Immortal 3 | 完整、可导入 | 较可信 | 否 |
| yamahamu | 亚太 | Twitch / yamahamu | V26 Act I Radiant #14 | 完整、可导入 | 较可信 | 否 |
| Wo0t | 欧洲 | Twitch / wo0t | V26 Act II Radiant #197 | 完整、双来源一致 | 已验证 | 否 |
| nAts | 欧洲 | Twitch / nats | V25 Act II Radiant #150；近期 Immortal 3 | 完整、可导入 | 较可信 | 否 |
| nataNk | 欧洲 | Twitch / natank | V26 Act III Radiant #4 | 完整、可导入 | 较可信 | 否 |
| Subroza | 北美 | Twitch / subroza | V26 Act IV Radiant #56 | 完整、双来源一致 | 已验证 | 否 |
| Eggsterr | 北美 | Twitch / eggsterr | V26 Act III Radiant #23 | 完整、可导入 | 较可信 | 否 |
| Shanks | 北美 | Twitch / shanks_ttv | V26 Act III Radiant #64 | 完整、可导入 | 较可信 | 否 |

## 发布前自动检查

- 10 位主播 ID、10 条准星 ID 和 10 个代码均唯一。
- 地区数量固定为亚太 4、欧洲 3、北美 3，界面计数从数据自动生成。
- 每条记录包含频道、活动来源、天梯来源、代码来源、核验日期和下次复核日期。
- 每条代码通过项目的 VALORANT 导入代码校验器后才启用复制按钮。
- 搜索索引同时收录主播资料与主播准星，支持姓名、频道、地区、段位、样式和代码匹配。
- 详情面板明确显示公开设置参考、可信状态与“HAO 尚未实战测试”提示。

## 完整代码与标准化参数

所有来源访问与 ClutchNest 核验日期均为 2026-07-15。代码来源日期见研究记录；以下参数用于站内原创实时预览。

| 主播 | 完整导入代码 | 标准化参数摘要 |
| --- | --- | --- |
| Meiy | `0;s;1;P;c;8;u;005AFFFF;o;1;d;1;b;1;0b;0;1b;0;S;d;0` | 蓝色 #005AFF；描边 1/1；中心点 1/2；内外线关闭 |
| Dep | `0;P;c;5;h;0;0l;4;0o;2;0a;1;0f;0;1b;0` | 青色；无描边/中心点；内线 1/4/2/2；误差关闭 |
| SkRossi | `0;s;1;P;c;8;u;C0C0C0FF;o;1;d;1;b;1;0b;0;1l;0;1a;0;S;c;0;o;1` | 银灰 #C0C0C0；描边 1/1；中心点 1/2；线条关闭 |
| yamahamu | `0;s;1;P;u;000000FF;o;0.43;f;0;0l;4;0v;4;0a;1;0f;0;1b;0;S;s;1.0;o;1` | 黑色；描边 0.43/1；内线 1/4x4/2/0；误差关闭 |
| Wo0t | `0;P;c;7;o;1;d;1;0l;0;0o;2;0a;1;0f;0;1b;0` | 红色；描边 1/1；中心点 1/2；内线长度 0、厚度 2、偏移 2 |
| nAts | `0;P;c;1;o;1;0t;1;0l;2;0o;2;0a;1;0f;0;1b;0` | 绿色；描边 1/1；内线 1/2/1/2；误差关闭 |
| nataNk | `0;P;o;1;d;1;0b;0;1b;0` | 白色；描边 1/1；中心点 1/2；内外线关闭 |
| Subroza | `0;P;c;5;o;0.715;0t;1;0l;3;0a;1;0f;0;1b;0` | 青色；描边 0.715/1；内线 1/3/1/3；误差关闭 |
| Eggsterr | `0;P;h;0;f;0;0l;5;0o;0;0a;1;0f;0;1b;0` | 白色；无描边/中心点；内线 1/5/2/0；误差关闭 |
| Shanks | `0;p;0;c;1;s;1;P;c;5;h;0;f;0;m;1;0l;4;0o;1;0a;0.317;0f;0;1l;3;1o;1;1a;0.616;1m;0;1f;0;A;c;4;o;0.515;m;1;0t;1;0l;3;0o;1;0a;1;0f;0;1b;0;S;c;1;o;1` | 青色；无描边/中心点；内线 0.317/4/2/1；外线 0.616/3/2/1 |

## 身份与来源索引

- Meiy（Ibuki Seki）：[频道](https://www.twitch.tv/meiy_vl)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=3ea2b318-423b-cf86-25da-7cbb0eefbe2d&page=1&platform=pc&region=ap)、[设置](https://prosettings.net/players/meiy/)；日语；设置日期 2026-06-01。
- Dep（Yuma Hashimoto）：[频道](https://www.twitch.tv/dep_ow)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=3ea2b318-423b-cf86-25da-7cbb0eefbe2d&page=1&platform=pc&region=ap)、[设置](https://prosettings.net/players/dep/)；日语；设置日期 2026-02-23。
- SkRossi（Ganesh Gangadhar）：[频道](https://www.youtube.com/@SkRossi)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/default?act=16118998-4705-5813-86dd-0292a2439d90&country=in&page=1&platform=pc&region=ap)、[设置来源一](https://www.indiatodaygaming.com/news/story/best-valorant-crosshair-codes-used-by-esports-pros-in-2025-8261)、[来源二](https://esports.gg/news/valorant/valorant-pro-player-crosshair-codes/)；英语 / 印地语；来源一日期 2025-05-01。
- yamahamu：[频道](https://www.twitch.tv/yamahamuliszt)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=3ea2b318-423b-cf86-25da-7cbb0eefbe2d&page=1&platform=pc&region=ap)、[设置](https://www.vcrdb.net/crosshair/8749)；日语；设置日期 2026-02-20。
- Wo0t（Mert Alkan）：[频道](https://www.twitch.tv/wo0t)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/default?act=9d85c932-4820-c060-09c3-668636d4df1b&page=2&platform=pc&region=global)、[设置来源一](https://prosettings.net/players/wo0t/)、[来源二](https://www.valorant-crosshairs.com/en/pros/wo0t)；土耳其语 / 英语；设置日期 2026-06-26 / 2026-06-05。
- nAts（Ayaz Akhmetshin）：[频道](https://www.twitch.tv/nats)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=16118998-4705-5813-86dd-0292a2439d90&page=2&platform=pc&region=eu)、[设置](https://prosettings.net/players/nats/)；俄语 / 英语；设置日期 2026-06-30。
- nataNk（Nathan Bocqueho）：[频道](https://www.twitch.tv/natank1wnl)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=ce2783e8-44fc-dd48-3da3-33b5ba6c4a22&platform=all&region=eu&type=ranked)、[设置](https://prosettings.net/players/natank/)；法语 / 英语；设置日期 2026-04-14。
- Subroza（Yassine Taoufik）：[频道](https://www.twitch.tv/subroza)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/161742?act=4f0864e2-40af-28a4-de2c-0e9e64e75f23&page=1&platform=pc&region=na)、[设置来源一](https://prosettings.net/players/subroza/)、[来源二](https://valorant.vpesports.com/players/subroza/)；英语；设置日期 2026-05-12。
- Eggsterr：[频道](https://www.twitch.tv/eggsterr)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=ce2783e8-44fc-dd48-3da3-33b5ba6c4a22&platform=all&region=na&type=ranked)、[设置](https://prosettings.net/players/eggster/)；英语；设置日期 2026-07-01。
- Shanks（Ryan Ngo）：[频道](https://www.twitch.tv/shanks_ttv)、[天梯](https://tracker.gg/valorant/leaderboards/ranked/all/ranked?act=ce2783e8-44fc-dd48-3da3-33b5ba6c4a22&platform=all&region=na&type=ranked)、[设置](https://prosettings.net/players/shanks/)；英语；设置日期 2026-03-11。
