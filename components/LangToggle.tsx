"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LangToggle() {
  const pathname = usePathname();
  const search = new URLSearchParams(useSearchParams() as any);
  const makeUrl = (lang: "bn" | "en") => {
    search.set("lang", lang);
    return `${pathname}?${search.toString()}`;
  };
  return (
    <div className="text-sm flex items-center gap-2">
      <Link href={makeUrl("bn")} className="underline">বাংলা</Link>
      <span> | </span>
      <Link href={makeUrl("en")} className="underline">English</Link>
    </div>
  );
}
