import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BrandAssetPageProps = {
  searchParams: Promise<{ asset?: string }>;
};

export const metadata: Metadata = {
  title: "Internal Brand Asset Renderer",
  robots: { index: false, follow: false }
};

export default async function BrandAssetPage({ searchParams }: BrandAssetPageProps) {
  if (process.env.NODE_ENV === "production") notFound();

  const { asset } = await searchParams;

  return asset === "icon" ? <IconAsset /> : <SocialAsset />;
}

function SocialAsset() {
  return (
    <div className="fixed left-0 top-0 z-[100] h-[630px] w-[1200px] overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 grid-surface opacity-35" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-1 bg-valorant" aria-hidden="true" />
      <div className="absolute right-20 top-20 h-48 w-48 border border-white/10" aria-hidden="true">
        <span className="absolute left-1/2 top-6 h-36 w-px -translate-x-1/2 bg-white/15" />
        <span className="absolute left-6 top-1/2 h-px w-36 -translate-y-1/2 bg-white/15" />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-valorant" />
      </div>
      <div className="absolute bottom-16 left-20 right-20">
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 place-items-center border border-white/20 bg-white text-2xl font-black text-black">CN</div>
          <div>
            <p className="text-4xl font-black tracking-[0.12em]">CLUTCHNEST</p>
            <p className="mt-2 text-sm text-zinc-500">Learn. Improve. Clutch.</p>
          </div>
        </div>
        <div className="mt-16 border-l-4 border-valorant pl-8">
          <h1 className="text-5xl font-black leading-tight">HAO 的 Valorant 准星与游戏理解</h1>
          <p className="mt-5 text-xl text-zinc-400">Crosshairs. Game Sense. Improvement.</p>
        </div>
      </div>
    </div>
  );
}

function IconAsset() {
  return (
    <div className="fixed left-0 top-0 z-[100] grid h-[512px] w-[512px] place-items-center overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-10 border border-white/15" aria-hidden="true" />
      <div className="absolute left-1/2 top-16 h-96 w-px -translate-x-1/2 bg-white/10" aria-hidden="true" />
      <div className="absolute left-16 top-1/2 h-px w-96 -translate-y-1/2 bg-white/10" aria-hidden="true" />
      <div className="relative grid h-[264px] w-[264px] place-items-center border-4 border-white bg-[#050505]">
        <span className="text-[112px] font-black tracking-[0.06em]">CN</span>
        <span className="absolute left-1/2 top-0 h-8 w-1 -translate-x-1/2 -translate-y-full bg-valorant" aria-hidden="true" />
        <span className="absolute bottom-0 left-1/2 h-8 w-1 -translate-x-1/2 translate-y-full bg-valorant" aria-hidden="true" />
        <span className="absolute left-0 top-1/2 h-1 w-8 -translate-x-full -translate-y-1/2 bg-valorant" aria-hidden="true" />
        <span className="absolute right-0 top-1/2 h-1 w-8 translate-x-full -translate-y-1/2 bg-valorant" aria-hidden="true" />
      </div>
    </div>
  );
}
