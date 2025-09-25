// FILE: components/dashboard/InsightPill.tsx
"use client";

import { Check, AlertTriangle, AlertCircle, Zap } from "lucide-react";

/** Visual buckets for styling/icons */
type Variant = "success" | "neutral" | "error" | "warning";

/** Heuristic: infer variant from the label text */
function detectVariant(label: string): Variant {
    const l = label.toLowerCase();

    // success
    if (/(healthy|on track|good|within limit|stable trend)/.test(l)) return "success";

    // error
    if (/(over[- ]?limit|declined|blocked|failed|critical|alert)/.test(l)) return "error";

    // warning (orange)
    if (/(underutilized|low usage|needs attention|spike|anomaly|bolt)/.test(l)) return "warning";

    // neutral gray (e.g., likely to exceed soon / projections)
    if (/(likely|projected|forecast|approaching|exceed soon|in \d+ days)/.test(l)) return "neutral";

    // default → neutral
    return "neutral";
}

const styles: Record<
    Variant,
    { icon: React.ElementType; className: string }
> = {
    // ✅ same as Active status badge colorway
    success: {
        icon: Check,
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    // ⚠ light gray background, dark gray text
    neutral: {
        icon: AlertTriangle,
        className:
            "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700/60 dark:bg-gray-800/40 dark:text-gray-300",
    },
    // ⭕ same as Inactive status badge colorway
    error: {
        icon: AlertCircle,
        className:
            "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-700/60 dark:bg-rose-900/30 dark:text-rose-300",
    },
    // ⚡ light orange background, dark orange text
    warning: {
        icon: Zap,
        className:
            "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-700/60 dark:bg-orange-900/30 dark:text-orange-300",
    },
};

export default function InsightPill({
                                        label,
                                        variant, // optional override
                                    }: {
    label: string;
    variant?: Variant;
}) {
    const v = variant ?? detectVariant(label);
    const Icon = styles[v].icon;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${styles[v].className}`}
            title={label}
        >
      <Icon className="h-3.5 w-3.5" />
            {label}
    </span>
    );
}
