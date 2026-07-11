import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.defaultTitle,
    template: `%s｜${site.siteName}`
  },
  description: site.descriptionCn,
  applicationName: site.siteName,
  authors: [{ name: site.creator }],
  creator: site.creator,
  category: "Gaming",
  keywords: [
    "Valorant",
    "无畏契约",
    "Valorant 准星",
    "职业选手准星",
    "游戏理解",
    "地图攻略",
    "ClutchNest",
    "HAO"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.defaultTitle,
    description: site.descriptionCn,
    url: "/",
    siteName: site.siteName,
    locale: "zh_CN",
    alternateLocale: "en_US",
    type: "website",
    images: [{ url: site.socialImage, width: 1200, height: 630, alt: `${site.siteName} 社交分享图` }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitleEn,
    description: site.descriptionEn,
    images: [site.socialImage]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
