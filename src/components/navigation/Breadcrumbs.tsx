"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

// Optional: central pretty labels for routes/segments
const LABELS: Record<string, string> = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/my-account": "My Account",
    "analytics": "Analytics",
    "reports": "Reports",
    "team": "Team",
};

function pretty(segOrHref: string) {
    if (LABELS[segOrHref]) return LABELS[segOrHref];
    // fallback: "my-account" -> "My Account"
    return segOrHref
        .replace(/^\//, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase()) || "Home";
}

export default function Breadcrumbs({
                                        className = "",
                                        hideOn = [], // optional list of exact paths to hide on (e.g. ["/"])
                                    }: { className?: string; hideOn?: string[] }) {
    const pathname = usePathname() || "/";
    if (hideOn.includes(pathname)) return null;

    const segments = pathname.split("/").filter(Boolean); // ["dashboard","analytics"]
    // Hide on top-level routes (no subpage)
    if (segments.length === 0) return null;

    const crumbs = segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        return { seg, href };
    });

    return (
        <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                {pretty("/")}
            </Link>
            {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                const label = LABELS[c.href] ?? pretty(c.seg);
                return (
                    <span key={c.href} className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        {isLast ? (
                            <span aria-current="page" className="font-medium text-foreground">{label}</span>
                        ) : (
                            <Link href={c.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                {label}
                            </Link>
                        )}
          </span>
                );
            })}
        </nav>
    );
}
