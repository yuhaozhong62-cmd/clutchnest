# ClutchNest 中国访问双部署准备

本文档描述代码兼容性和未来部署流程。当前任务不会购买云服务、修改 DNS、申请 ICP 备案，或把站点部署到未经授权的服务器。

## 1. 当前全球部署

ClutchNest 当前全球主站由 Vercel 托管：

```text
https://clutchnest.vercel.app
```

普通 Vercel 构建继续使用：

```bash
pnpm build
```

该命令不会启用 `output: "export"`，也不会改变现有 Next.js Production 的构建方式。

## 2. 为什么不能保证中国大陆可用

Vercel 没有为这个项目提供中国大陆境内节点或可用性承诺。跨境网络路由、运营商策略、TLS 握手、DNS 解析和境外服务可达性都可能随地区和时间变化。因此，即使某次测试可以访问，也不能据此保证中国大陆长期稳定访问。

目标架构建议为：

```text
www.example.com  -> Vercel 全球主站
cn.example.com   -> 香港或备案后的中国大陆静态镜像
```

以上域名只用于说明结构，不代表已经购买或配置。

## 3. 自定义域名测试步骤

在未来获得域名和托管授权后：

1. 先在托管平台添加测试子域名，不直接切换正式流量。
2. 按平台要求配置 DNS 记录，并等待证书签发完成。
3. 分别从中国大陆不同地区和运营商测试首页、深层路由、图片、JS、CSS、XML 和 Web Manifest。
4. 检查浏览器控制台、网络错误、TLS 证书链和 DNS 解析结果。
5. 检查 canonical、Open Graph、`robots.txt` 和 `sitemap.xml` 是否使用该部署自己的绝对域名。
6. 验证通过后再决定是否切换正式入口；不要只依赖单一网络或单次测速结果。

## 4. 静态构建

本地兼容性验证可以直接执行：

```bash
pnpm build:static
```

`build:static` 通过 pnpm 提供的 `npm_lifecycle_event` 启用静态导出，并在构建后删除只用于本地开发的 `out/internal/`。CI 或托管平台也可以显式设置：

```text
CLUTCHNEST_STATIC_EXPORT=1
```

然后执行 `pnpm build`。两种方式只应在静态镜像构建中使用。

发布镜像前必须设置该镜像自己的绝对站点地址。PowerShell 示例：

```powershell
$env:NEXT_PUBLIC_SITE_URL="https://cn.example.com"
pnpm build:static
```

Bash 示例：

```bash
NEXT_PUBLIC_SITE_URL=https://cn.example.com pnpm build:static
```

没有设置时，本地构建会回退到 `http://localhost:3000`，只适合本地验证，不能直接作为正式镜像发布。

## 5. `out/` 文件夹

静态构建输出位于 `out/`。它包含 HTML、客户端 JS、CSS、本地图片、公开准星详情、搜索、metadata 路由和 `404.html`。

`out/` 是可重复生成的构建产物，已经在 `.gitignore` 中忽略，禁止提交到 Git。上传时应上传其内容，而不是把 `out` 作为额外的 URL 路径层级。

## 6. 香港静态镜像要求

第一阶段的香港托管平台至少需要：

- 静态文件托管和自定义域名 HTTPS。
- 正确支持目录式路径，例如 `/crosshairs/calm-headshot-dot/` 映射到对应 `index.html`。
- 未命中路径返回 `404.html`，并保留 HTTP 404 状态码。
- 为 `.xml`、`.webmanifest`、`.js`、`.css`、`.png` 和 `.webp` 设置正确的 Content-Type。
- 对带哈希的 `/_next/static/` 资源使用长期缓存；HTML、`robots.txt`、sitemap 和 manifest 使用可控的短缓存。
- 支持原子发布或版本目录，便于回滚。
- 不注入依赖境外 CDN 的关键脚本、字体、CSS 或图片。

静态镜像没有 Next.js 图片优化服务、Route Handler 或 Server Action。当前静态模式已经把 `next/image` 切换为 `unoptimized`，图片直接从同源静态文件加载。

## 7. 中国大陆部署与 ICP 备案

若第二阶段把站点托管到中国大陆境内服务器或 CDN，应先根据实际主体、域名、云服务商和服务内容完成适用的 ICP 备案流程。备案规则和平台要求可能变化，正式操作前应以主管部门和服务商的最新要求为准。

在备案完成前，不要把本项目部署到要求备案的中国大陆境内服务，也不要展示虚假、借用或占位备案号。

## 8. Footer 备案信息位置

备案成功后，可在 `components/SiteFooter.tsx` 的 Riot Games 非官方项目免责声明下方加入备案信息链接。实现时应：

- 使用真实获批的备案号。
- 链接到主管部门要求的备案查询地址。
- 只在需要展示备案信息的部署环境中渲染。
- 不删除现有 Riot Games 非官方项目免责声明。

当前代码不会加入任何虚假备案号。

## 9. 公安联网备案

完成 ICP 备案和站点上线后，还应根据站点所在地及适用要求评估公安联网备案。若需要，应在规定期限内办理，并按要求在 Footer 展示真实编号和链接。该流程不属于本次代码任务。

## 10. 环境变量

全球 Vercel 主站建议设置：

```text
NEXT_PUBLIC_SITE_URL=https://clutchnest.vercel.app
```

未来静态镜像设置：

```text
NEXT_PUBLIC_SITE_URL=https://cn.example.com
CLUTCHNEST_STATIC_EXPORT=1
```

`NEXT_PUBLIC_SITE_URL` 在构建时写入 canonical、Open Graph、robots host 和 sitemap。全球站和镜像必须分别构建，不能把一个部署的构建产物直接改域名后复用。

`VERCEL_URL` 只是 Vercel 环境的后备值。正式全球 Production 应优先显式设置 `NEXT_PUBLIC_SITE_URL`，避免 Preview 域名进入 canonical 或 sitemap。

## 11. 发布和回滚

发布静态镜像：

1. 从经过审核的 `main` 创建发布提交或标签。
2. 设置镜像自己的 `NEXT_PUBLIC_SITE_URL`。
3. 执行 `pnpm install --frozen-lockfile`、`pnpm lint` 和 `pnpm build:static`。
4. 使用本地静态服务器检查首页、深层路由、查询参数、交互、图片、404 和 metadata 文件。
5. 将 `out/` 内容上传到新的版本目录或平台新部署。
6. 在测试域名验证后，再将镜像流量指向新版本。
7. 记录 Git commit、构建时间、环境变量域名和托管版本 ID。

回滚：

1. 将流量或托管别名切回上一个已验证版本。
2. 确认旧版本的 HTML、静态资源和 metadata 文件可用。
3. 保留失败版本日志，但不要继续对失败产物提供正式流量。
4. 从对应 Git commit 重新构建，不能只手工替换少量文件。

## 12. 密钥与云凭证

以下内容不得提交到仓库、PR、构建日志或 `out/`：

- 云服务 Access Key、Secret Key 或临时凭证。
- DNS API Token。
- Vercel Token。
- GitHub Token。
- 私钥、证书私钥或账号密码。
- 含秘密值的 `.env` 文件。

应通过托管平台的加密环境变量、最小权限服务账号和密钥轮换机制管理凭证。

## 13. 静态兼容性审计结果

- App Router 的公开页面均可预渲染。
- `/crosshairs/[id]` 使用本地数据和 `generateStaticParams` 生成所有公开详情页。
- internal 动态预览页必须在 Next 构建阶段枚举本地参数；生产页面守卫返回 404，构建后脚本会从静态产物中删除整个 `out/internal/`。
- sitemap、robots 和 manifest 已显式设为静态 metadata 路由。
- 搜索页和准星库在静态模式使用稳定的基础 metadata；普通 Vercel 模式继续保留查询参数相关 metadata。
- 搜索、筛选、复制、详情抽屉、地图点位和移动流程均为客户端状态，可在静态托管中运行。
- `next/image` 在静态模式禁用服务端优化，继续加载 `public/` 中的同源图片。
- 项目没有 Route Handler、middleware、cookies、请求 headers、redirects、rewrites、Server Actions 或运行时 API 请求。
- 页面没有 Google Fonts、远程字体、国外分析脚本、外部 JS、外部 CSS 或关键远程图片依赖。
- 外部链接仅用于资料来源、官方页面或主播频道；目标网站不可访问不会阻止 ClutchNest 页面渲染。
