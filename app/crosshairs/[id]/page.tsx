import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrosshairDetail } from "@/components/CrosshairDetail";
import { getCrosshairById, publishedCrosshairs } from "@/lib/data/crosshairs";

type CrosshairPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return publishedCrosshairs.map((crosshair) => ({ id: crosshair.id }));
}

export async function generateMetadata({ params }: CrosshairPageProps): Promise<Metadata> {
  const { id } = await params;
  const crosshair = getCrosshairById(id);

  if (!crosshair) {
    return {
      title: "未找到这个准星",
      description: "ClutchNest 准星库中没有找到这个准星。",
      robots: { index: false, follow: false }
    };
  }

  const styleCn = crosshair.style.split(" / ")[0];
  const pageTitle = crosshair.contentType === "pro-reference" ? `${crosshair.nameCn}参考` : crosshair.nameCn;
  const canonicalPath = `/crosshairs/${crosshair.id}`;
  const description =
    crosshair.contentType === "pro-reference"
      ? `ClutchNest 最近核验的 ${crosshair.playerName} Valorant ${styleCn}公开设置。${crosshair.recommendedForCn}`
      : `HAO 测试整理的 Valorant ${styleCn}，${crosshair.recommendedForCn}`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${pageTitle}｜ClutchNest`,
      description,
      url: canonicalPath,
      type: "article",
      images: [{ url: crosshair.image, width: 1200, height: 675, alt: `${crosshair.nameCn} 准星预览` }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle}｜ClutchNest`,
      description,
      images: [crosshair.image]
    },
    robots: { index: true, follow: true }
  };
}

export default async function CrosshairPage({ params }: CrosshairPageProps) {
  const { id } = await params;
  const crosshair = getCrosshairById(id);

  if (!crosshair) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-20">
      <Link
        href="/crosshairs"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <span aria-hidden="true">←</span>
        <span>返回准星库</span>
      </Link>
      <CrosshairDetail crosshair={crosshair} />
    </div>
  );
}
