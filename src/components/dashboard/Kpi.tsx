import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Trend = "positive" | "negative" | "neutral";

export default function Kpi({
                                icon: Icon,
                                label,
                                value,
                                subtext,
                                trend = "neutral",
                                trendValue,
                            }: {
    icon?: React.ElementType;
    label: string;
    value: string | number;
    subtext?: string;
    trend?: Trend;
    trendValue?: string; // e.g. "36.8%"
}) {
    const trendClasses =
        trend === "positive"
            ? "text-green-700 bg-green-100 border-green-300"
            : trend === "negative"
                ? "text-red-700 bg-red-100 border-red-300"
                : "text-gray-700 bg-gray-100 border-gray-300";

    const valueColor =
        trend === "positive"
            ? "text-green-600"
            : trend === "negative"
                ? "text-red-600"
                : "text-foreground";

    return (
        <Card className="shadow-none border bg-card">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="grid grid-cols-2 items-start gap-2">
                    {/* Left column: big number */}
                    <div
                        className={`text-3xl font-semibold tracking-tight text-left ${valueColor}`}
                    >
                        {value}
                    </div>

                    {/* Right column: small badge + subtext */}
                    <div className="flex flex-col items-start gap-1">
                        {trendValue && (
                            <span
                                className={`text-l font-medium px-2 py-0.5 rounded-full border ${trendClasses}`}
                            >
                {trend === "positive" ? "↑ " : trend === "negative" ? "↓ " : ""}
                                {trendValue}
              </span>
                        )}
                        {subtext && (
                            <span className="text-l text-muted-foreground">{subtext}</span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
