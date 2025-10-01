// FILE: components/dashboard/Topbar.tsx
"use client";

import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    LogOut,
    User,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./SideBar";
import profileImage from "@/data/images/imageProfile.png";

/** --- Search index: add your pages here --- */
const ROUTES: Array<{ label: string; href: string; keywords?: string[] }> = [
    { label: "Setup Guide", href: "/setup-guide", keywords: ["getting started"] },
    { label: "Setup • Account", href: "/setup-guide/account" },
    { label: "Setup • Password", href: "/setup-guide/password" },
    { label: "Setup • Misc", href: "/setup-guide/misc" },

    { label: "Dashboard", href: "/dashboard", keywords: ["home", "overview"] },
    { label: "Dashboard • Analytics", href: "/dashboard/analytics" },
    { label: "Dashboard • Reports", href: "/dashboard/reports" },
    { label: "Dashboard • Team", href: "/dashboard/team" },

    { label: "My Account", href: "/my-account", keywords: ["profile"] },
    { label: "Account", href: "/account" },
    { label: "Card", href: "/card" },

    { label: "Approvals", href: "/approvals" },
    { label: "Expenses", href: "/expenses" },
    { label: "Accounting", href: "/accounting" },
    { label: "Users / Team", href: "/users", keywords: ["members"] },
    { label: "Settings", href: "/settings" },
    { label: "Help Center", href: "/help", keywords: ["support", "docs"] },
];

export default function Topbar() {
    const router = useRouter();

    // --- Search state ---
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const popRef = useRef<HTMLDivElement | null>(null);

    // Filter routes by query
    const results = useMemo(() => {
        const needle = q.trim().toLowerCase();
        if (!needle) return [];
        const match = (s?: string) => (s ?? "").toLowerCase().includes(needle);
        return ROUTES.filter(
            (r) => match(r.label) || r.keywords?.some(match) || match(r.href)
        ).slice(0, 8);
    }, [q]);

    // Open dropdown when typing; reset active index on new results
    useEffect(() => {
        setOpen(results.length > 0);
        setActiveIndex(0);
    }, [results.length]);

    // Close when clicking outside
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const target = e.target as Node;
            if (
                !inputRef.current?.contains(target) &&
                !popRef.current?.contains(target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    // Keyboard navigation
    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open && e.key === "ArrowDown" && results.length) {
            setOpen(true);
            return;
        }
        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const hit = results[activeIndex];
            if (hit) {
                router.push(hit.href);
                setOpen(false);
                setQ("");
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    return (
        <header className="sticky top-0 z-30 border-b bg-[--topbar] text-[--topbar-foreground]">
            <div className="relative mx-auto flex h-16 w-full items-center px-6">
                {/* Mobile hamburger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-6 top-1/2 -translate-y-1/2 md:hidden"
                            aria-label="Open sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>

                {/* LEFT: search */}
                <div className="flex flex-1">
                    <div className="relative w-[260px] md:w-[360px]">
                        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            ref={inputRef}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={onKeyDown}
                            onFocus={() => results.length && setOpen(true)}
                            className="w-full pl-8"
                            placeholder="Search pages…"
                            aria-autocomplete="list"
                            aria-expanded={open}
                            aria-controls="topbar-search-listbox"
                            role="combobox"
                        />
                        {/* Dropdown */}
                        {open && results.length > 0 && (
                            <div
                                ref={popRef}
                                id="topbar-search-listbox"
                                role="listbox"
                                className="absolute z-40 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
                            >
                                {results.map((r, idx) => {
                                    const active = idx === activeIndex;
                                    return (
                                        <button
                                            key={r.href}
                                            role="option"
                                            aria-selected={active}
                                            onMouseEnter={() => setActiveIndex(idx)}
                                            onClick={() => {
                                                router.push(r.href);
                                                setOpen(false);
                                                setQ("");
                                            }}
                                            className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
                                                active
                                                    ? "bg-accent text-accent-foreground"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            }`}
                                        >
                                            <span className="truncate">{r.label}</span>
                                            <span className="ml-3 truncate text-xs text-muted-foreground">
                        {r.href}
                      </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: actions */}
                <div className="ml-2 flex items-center gap-2">
                    <Button variant="secondary" className="hidden sm:inline-flex">
                        Move Money <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Notifications">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={profileImage.src} alt="Profile picture" />
                                    <AvatarFallback>
                                        <User className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                Jane
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                <LogOut className="mr-2 h-4 w-4" /> Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
