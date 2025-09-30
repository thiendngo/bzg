"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cards } from "@/data/cards";
import StatusBadge from "./StatusBadge";
import InsightPill from "./InsightPill";

export default function CardsTable() {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(cards.length / pageSize);

    const start = (page - 1) * pageSize;
    const paginated = cards.slice(start, start + pageSize);

    return (
        <Card className="overflow-hidden">
            <table className="w-full border-collapse text-sm">
                <thead>
                <tr className="bg-muted">
                    <th className="p-3 text-left font-medium">Cardholder</th>
                    <th className="p-3 text-left font-medium">Type</th>
                    <th className="p-3 text-left font-medium">Limit</th>
                    <th className="p-3 text-left font-medium">Spend (MTD)</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">AI Insight</th>
                </tr>
                </thead>
                <tbody>
                {paginated.map((card) => (
                    <tr key={card.id} className="border-b">
                        <td className="p-3">{card.holder}</td>
                        <td className="p-3">{card.type}</td>
                        <td className="p-3">${card.limit.toLocaleString()}</td>
                        <td className="p-3">
                            ${card.spend.toLocaleString()} ({card.percent}%)
                        </td>
                        <td className="p-3">
                            <StatusBadge status={card.status as "Active" | "Inactive" | "Frozen"} />
                        </td>
                        <td className="p-3">
                            <InsightPill label={card.insight} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                <div>
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="
                            rounded-md border px-3 py-1.5
                            transition-colors
                            hover:bg-muted/50 hover:text-foreground
                            disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground
                          "
                    >
                        Previous
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="
                            rounded-md border px-3 py-1.5
                            transition-colors
                            hover:bg-muted/50 hover:text-foreground
                            disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground
                          "
                    >
                        Next
                    </button>
                </div>
            </div>


        </Card>
    );
}
