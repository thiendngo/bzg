"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import type { CardStatus } from "@/data/cards";


export default function StatusBadge({ status }: { status: CardStatus }) {
    const map = {
        Active:  "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-300",
        Frozen:"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700/60 dark:bg-violet-900/30 dark:text-violet-300",
        Inactive:  "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-700/60 dark:bg-rose-900/30 dark:text-rose-300",
    } as const;
    return <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${map[status]}`}>{status}</span>;

}
