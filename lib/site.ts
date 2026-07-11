const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const site = {
  siteName: "ClutchNest",
  siteUrl: configuredSiteUrl.replace(/\/$/, ""),
  creator: "HAO",
  descriptionCn: "由 HAO 创建的 Valorant 个人知识库，分享实测准星、职业选手准星参考、地图打法和游戏理解。",
  descriptionEn: "A personal Valorant knowledge base by HAO with tested crosshairs, professional references, map strategy and game sense.",
  socialImage: "/og/clutchnest-og.png",
  defaultTitle: "ClutchNest｜HAO 的 Valorant 准星与游戏理解",
  defaultTitleEn: "ClutchNest | Valorant Crosshairs and Game Sense by HAO",
  taglineCn: "学习。进步。关键局。",
  taglineEn: "Learn. Improve. Clutch.",
  nav: [
    { labelCn: "首页", labelEn: "Home", href: "/" },
    { labelCn: "准星", labelEn: "Crosshairs", href: "/crosshairs" },
    { labelCn: "英雄与地图", labelEn: "Agents & Maps", href: "/agents-maps" },
    { labelCn: "关于", labelEn: "About", href: "/about" }
  ]
} as const;
