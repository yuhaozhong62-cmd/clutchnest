# ClutchNest

ClutchNest 是一个由 HAO 创建的中文优先 Valorant 个人知识库，分享 HAO 实测准星、最近核验的职业选手准星参考、英雄地图打法和个人游戏理解。

ClutchNest is a Chinese-first personal Valorant knowledge base created by HAO.

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- 本地 TypeScript 数据文件
- pnpm

项目不包含后端、数据库、登录、评论或用户账户。

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

## 生产构建

```bash
pnpm lint
pnpm build
pnpm start
```

## 环境变量

复制 `.env.example` 为 `.env.local`，并设置：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

部署后必须改为实际的 HTTPS 域名。Vercel 首次部署时也会自动使用 `VERCEL_URL` 生成绝对站点地址；绑定正式域名后仍建议显式设置 `NEXT_PUBLIC_SITE_URL`。

## Vercel 部署

1. 将项目推送到 GitHub。
2. 在 Vercel 选择 **Add New Project** 并导入仓库。
3. Framework Preset 选择 Next.js，包管理器保持 pnpm。
4. 添加 `NEXT_PUBLIC_SITE_URL`，值为最终的 `https://...` 公开地址。
5. 部署后重新部署一次，确认 canonical、Open Graph、`sitemap.xml` 和 `robots.txt` 使用正式域名。

## 更新准星内容

准星数据位于 `lib/data/crosshairs.ts`。

- 公开条目使用 `status: "published"`。
- 草稿使用 `status: "draft"`，不会进入公开列表、详情页或 sitemap。
- HAO 实测内容使用 `contentType: "hao-tested"`。
- 职业公开设置参考使用 `contentType: "pro-reference"`，并填写来源和核验日期。
- 准星图片放在 `public/crosshairs/`，职业参考图片放在 `public/crosshairs/pro/`。

职业选手可能随时更换准星。更新职业条目前应重新核验来源和日期，不应将旧设置描述为永久当前设置。

## 搜索引擎文件

- Sitemap：`/sitemap.xml`
- Robots：`/robots.txt`
- Web App Manifest：`/manifest.webmanifest`

内部渲染工具位于 `/internal/`，不出现在导航或 sitemap 中，并在生产环境返回 404。

## 免责声明

ClutchNest 是一个独立的非商业玩家项目，与 Riot Games 无隶属、赞助或官方认可关系。

ClutchNest is an independent, non-commercial fan project and is not affiliated with, sponsored by, or endorsed by Riot Games.
