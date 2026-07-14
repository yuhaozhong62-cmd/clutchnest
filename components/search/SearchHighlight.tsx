import { Fragment } from "react";
import { tokenizeSearchQuery } from "@/lib/search/normalizeSearchQuery";

export function SearchHighlight({ text, query }: { text: string; query: string }) {
  const terms = tokenizeSearchQuery(query).filter((term) => term.length > 0);
  if (!terms.length) return text;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(pattern);
  return parts.map((part, index) => terms.some((term) => part.toLocaleLowerCase() === term)
    ? <mark key={`${part}-${index}`} className="bg-valorant/20 text-inherit">{part}</mark>
    : <Fragment key={`${part}-${index}`}>{part}</Fragment>);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
