import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-md border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:border-valorant hover:bg-valorant hover:text-white focus:outline-none focus:ring-2 focus:ring-valorant/60"
      : "inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/30";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
