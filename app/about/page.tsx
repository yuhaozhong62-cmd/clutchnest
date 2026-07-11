import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 / About",
  description: "了解由 HAO 创建的独立非商业 Valorant 玩家知识项目 ClutchNest。",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" }
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <section className="grid gap-10 rounded-lg border border-white/10 bg-panel/70 p-7 shadow-glow lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-valorant">关于 / About</p>
          <h1 className="mt-4 text-5xl font-black text-white">ClutchNest</h1>
          <p className="mt-4 text-sm text-zinc-400">由 HAO 创建</p>
          <p className="mt-1 text-xs text-zinc-600">Created by HAO</p>
        </div>
        <div className="space-y-6 text-base leading-8 text-zinc-300">
          <p>ClutchNest 是一个由 HAO 创建的 Valorant 个人知识库。</p>
          <p>
            这个网站不是为了堆大量资料，而是为了记录和分享真正经过实战测试的准星、地图点位、英雄理解和游戏思路。
          </p>
          <p>
            我希望它慢慢成长成一个干净、实用、有个人风格的 Valorant 学习空间。
          </p>
          <p className="text-zinc-500">Quality over quantity.</p>
        </div>
      </section>
    </div>
  );
}
