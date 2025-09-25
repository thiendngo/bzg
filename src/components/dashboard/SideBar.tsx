"use client";
import React from "react";
import Link from "next/link";
import {
    Home, BarChart3, ShieldCheck, CreditCard, Wallet,
    DollarSign, Settings, Users, HelpCircle
} from "lucide-react";

export function SidebarContent() {
    return (
        <>
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">BZ</div>
                <div className="text-sm font-semibold tracking-tight">BZG LOGO</div>
            </div>

            <nav className="flex-1 p-2">
                <SectionLabel>MAIN MENU</SectionLabel>
                <SidebarItem icon={Home} active>Setup guide</SidebarItem>
                <SidebarItem icon={BarChart3}>Dashboard</SidebarItem>
                <SidebarItem icon={ShieldCheck}>My account</SidebarItem>
                <SidebarItem icon={CreditCard}>Account</SidebarItem>
                <SidebarItem icon={Wallet}>Card</SidebarItem>

                <SectionLabel>WORKFLOW</SectionLabel>
                <SidebarItem icon={ShieldCheck}>Approvals</SidebarItem>
                <SidebarItem icon={DollarSign}>Expenses</SidebarItem>
                <SidebarItem icon={Settings}>Accounting</SidebarItem>
                <SidebarItem icon={Users}>Users/Team</SidebarItem>
                <SidebarItem icon={Settings}>Settings</SidebarItem>
                <SidebarItem icon={HelpCircle}>Support</SidebarItem>
            </nav>

            <div className="border-t p-3 text-xs text-muted-foreground">Help Center</div>
        </>
    );
}

export default function Sidebar() {
    return (
        // Desktop-only
        <aside className="hidden md:flex md:flex-col w-72 min-h-screen border-r bg-sidebar text-sidebar-foreground">
            <SidebarContent />
        </aside>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-3 pt-3 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
            {children}
        </div>
    );
}

function SidebarItem({
                         icon: Icon,
                         children,
                         active,
                     }: {
    icon: React.ElementType;
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <Link
            href="#"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-foreground"
            }`}
        >
            <Icon className="h-4 w-4" />
            <span className="truncate">{children}</span>
        </Link>
    );
}
