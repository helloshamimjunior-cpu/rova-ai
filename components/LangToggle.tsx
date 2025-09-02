"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LangToggle() {
  const pathname = usePathname();
  const params = useSearchParams(); // ReadonlyURLSearchParams

  const makeUrl = (lang: "bn" | "en") => {
    const next = new URLSearchParams(params.toString());
    next.set("lang", lang);
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <div className="text-sm flex items-center gap-2">
      <Link href={makeUrl("bn")} className="underline">বাংলা</Link>
      <span> | </span>
      <Link href={makeUrl("en")} className="underline">English</Link>
    </div>
  );
}
