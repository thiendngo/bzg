import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Kpi({
                                icon: Icon,
                                label,
                                value,
                            }: {
    icon?: React.ElementType;
    label: string;
    value: string | number;
}) {
    return (
        <Card
            className="
        shadow-none border bg-card
        focus-visible:ring-0 focus-visible:ring-offset-0
        active:shadow-none
      "
        >
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="text-3xl font-semibold tracking-tight">{value}</div>
            </CardContent>
        </Card>
    );
}
