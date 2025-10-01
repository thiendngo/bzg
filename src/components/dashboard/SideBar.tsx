// FILE: components/dashboard/SideBar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home, BarChart3, ShieldCheck, CreditCard, Wallet,
    DollarSign, Settings, Users, HelpCircle, ChevronDown, ChevronRight,
    FileBarChart, LineChart, Users2, UserCog, WrenchIcon, Settings2
} from "lucide-react";

/* ---------- Public API ---------- */

export function SidebarContent() {
    return (
        <div className="flex h-full min-h-0 flex-col">
            {/* Header */}
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <div className="text-sm font-semibold tracking-tight">BZG LOGO</div>
            </div>

            {/* Scroll area */}
            <nav className="flex-1 min-h-0 overflow-y-auto p-2">
                <SectionLabel>MAIN MENU</SectionLabel>

                {/* Parent WITHOUT page: clicking parent goes to first child */}
                <SidebarParent
                    icon={Settings}
                    label="Setup Guide (wizard)"
                    baseHref="/setup-guide"     // parent base
                    hasPage={false}             // <-- no page at /setup-guide, go to first child
                    items={[
                        { icon: UserCog,   label: "Account",       href: "/setup-guide/account" },
                        { icon: WrenchIcon,label: "Password",      href: "/setup-guide/password" },
                        { icon: Settings2, label: "Miscellaneous", href: "/setup-guide/misc" },
                    ]}
                />

                {/* Parent WITH page: clicking parent goes to /dashboard */}
                <SidebarParent
                    icon={BarChart3}
                    label="Dashboard"
                    baseHref="/dashboard"
                    hasPage={true} // default; can omit
                    items={[
                        { icon: LineChart,    label: "Analytics", href: "/dashboard/analytics" },
                        { icon: FileBarChart, label: "Reports",   href: "/dashboard/reports" },
                        { icon: Users2,       label: "Team",      href: "/dashboard/team" },
                    ]}
                />

                <SidebarItem icon={ShieldCheck} href="/card-limit">Cards and limits</SidebarItem>
                <SidebarItem icon={CreditCard} href="/account">Account</SidebarItem>
                <SidebarItem icon={Wallet} href="/card">Card</SidebarItem>

                <SectionLabel>WORKFLOW</SectionLabel>
                <SidebarItem icon={ShieldCheck} href="/approvals">Approvals</SidebarItem>
                <SidebarItem icon={DollarSign} href="/expenses">Expenses</SidebarItem>
                <SidebarItem icon={Settings} href="/accounting">Accounting</SidebarItem>
                <SidebarItem icon={Users} href="/users">Users/Team</SidebarItem>
                <SidebarItem icon={Settings} href="/settings">Settings</SidebarItem>
            </nav>

            {/* Footer: left-aligned; icon + text change color on hover (no bg) */}
            <div className="border-t">
                <Link
                    href="/help"
                    className="flex items-center gap-2 px-6 py-6 text-sm text-muted-foreground hover:text-sidebar-primary"
                >
                    <HelpCircle className="h-4 w-4 shrink-0" />
                    <span>Help Center</span>
                </Link>
            </div>
        </div>
    );
}

export default function Sidebar() {
    return (
        <aside className="hidden md:flex md:flex-col w-72 h-[100svh] sticky top-0 border-r bg-sidebar text-sidebar-foreground">
            <SidebarContent />
        </aside>
    );
}

/* ---------- Building blocks ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-3 pt-3 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
            {children}
        </div>
    );
}

function SidebarItem({
                         icon: Icon,
                         href,
                         children,
                     }: {
    icon: React.ElementType;
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = matchExact(pathname, href);

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            }`}
            aria-current={isActive ? "page" : undefined}
        >
            <Icon className="h-4 w-4" />
            <span className="truncate">{children}</span>
        </Link>
    );
}

/**
 * SidebarParent:
 * - If hasPage=true:
 *    Clicking label navigates to baseHref and keeps submenu open.
 * - If hasPage=false:
 *    Clicking label navigates to the FIRST child (auto-switch) and opens submenu.
 * - Chevron toggles submenu only.
 * - Auto-highlights & expands when on base or any child route.
 */
function SidebarParent({
                           icon: Icon,
                           label,
                           baseHref,
                           items,
                           hasPage = true,
                       }: {
    icon: React.ElementType;
    label: string;
    baseHref: string;
    items: { icon: React.ElementType; label: string; href: string }[];
    hasPage?: boolean;
}) {
    const pathname = usePathname();

    const inSection =
        matchExact(pathname, baseHref) ||
        items.some((i) => matchStartsWith(pathname, i.href));

    const [open, setOpen] = React.useState<boolean>(inSection);

    React.useEffect(() => {
        if (inSection) setOpen(true);
    }, [inSection]);

    // When parent has no page, label navigates to first child
    const labelHref = hasPage ? baseHref : (items[0]?.href ?? baseHref);

    const ParentChevron = open ? ChevronDown : ChevronRight;

    const parentClasses = inSection
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground";

    return (
        <div className="mb-1">
            <div className={`flex items-center rounded-lg ${parentClasses}`}>
                {/* Label area navigates */}
                <Link
                    href={labelHref}
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-sm"
                    onClick={() => setOpen(true)}
                    aria-current={matchExact(pathname, labelHref) ? "page" : undefined}
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{label}</span>
                </Link>

                {/* Chevron only toggles */}
                <button
                    type="button"
                    className="px-2 py-2 text-sm"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
                    aria-expanded={open}
                    aria-controls={`submenu-${label}`}
                >
                    <ParentChevron className="h-4 w-4" />
                </button>
            </div>

            {/* Submenu */}
            <div id={`submenu-${label}`} className={`${open ? "block" : "hidden"} mt-1`}>
                {items.map((item) => {
                    const active = matchExact(pathname, item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`ml-2 flex items-center gap-2 rounded-md px-8 py-2 text-sm transition ${
                                active
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-foreground/90 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                            }`}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setOpen(true)}
                        >
                            <item.icon className="h-4 w-4" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

/* ---------- Route helpers ---------- */
function matchExact(pathname: string, href: string) {
    const a = (pathname || "/").replace(/\/+$/, "") || "/";
    const b = (href || "/").replace(/\/+$/, "") || "/";
    return a === b;
}
function matchStartsWith(pathname: string, hrefPrefix: string) {
    const a = (pathname || "/").replace(/\/+$/, "") || "/";
    const b = (hrefPrefix || "/").replace(/\/+$/, "") || "/";
    return a === b || a.startsWith(b + "/");
}
