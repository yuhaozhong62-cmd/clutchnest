import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternalCrosshairRenderer } from "@/components/InternalCrosshairRenderer";
import { getCrosshairRecordById, publishedCrosshairs } from "@/lib/data/crosshairs";

type PreviewPageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Internal Crosshair Preview",
  robots: { index: false, follow: false }
};

export const dynamicParams = false;

export function generateStaticParams() {
  if (process.env.NODE_ENV === "production") return [];

  return publishedCrosshairs
    .filter((crosshair) => crosshair.contentType === "pro-reference")
    .map((crosshair) => ({ id: crosshair.id }));
}

export default async function InternalCrosshairPreviewPage({ params }: PreviewPageProps) {
  if (process.env.NODE_ENV === "production") notFound();

  const { id } = await params;
  const crosshair = getCrosshairRecordById(id);

  if (!crosshair || crosshair.contentType !== "pro-reference" || crosshair.status !== "published") notFound();

  return <InternalCrosshairRenderer crosshair={crosshair} />;
}
