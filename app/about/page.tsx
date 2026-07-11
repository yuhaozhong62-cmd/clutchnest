import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 / About",
  description: "了解由 HAO 创建的独立非商业 Valorant 玩家知识项目 ClutchNest。",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" }
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-black text-white sm:text-5xl">关于 ClutchNest</h1>
        <div className="mt-10 space-y-6 text-base leading-8 text-zinc-300 sm:text-lg">
          <p>ClutchNest 是一个由 HAO 创建的 Valorant 个人知识库。</p>
          <p>这里分享经过实战测试的准星、职业选手公开设置、地图点位和个人游戏理解。</p>
          <p>内容会持续更新，但始终坚持质量优先。</p>
          <p className="pt-3 text-sm text-zinc-600">Quality over quantity.</p>
        </div>
      </section>
    </div>
  );
}
