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
      ? "btn-primary"
      : "btn-secondary";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
