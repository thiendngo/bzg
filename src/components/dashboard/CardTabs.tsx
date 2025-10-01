"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardsTable from "./CardsTable";
import Kpi from "./Kpi";
import { CreditCard, DollarSign, AlertTriangle, Ban } from "lucide-react";
import { cards } from "@/data/cards";

export default function CardTabs() {
    const activeCards = cards.filter((c) => c.status === "Active").length;
    const monthlySpend = cards.reduce((sum, c) => sum + c.spend, 0);
    const aiAlerts = cards.filter((c) => c.insight.includes("Over limit")).length;
    const unusedCards = cards.filter((c) => c.status === "Inactive").length;

    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 border-b bg-transparent px-0 overflow-x-auto whitespace-nowrap scrollbar-none sm:overflow-visible sm:whitespace-normal">
                <div className="flex gap-6">
                    <TabsTrigger
                        value="overview"
                        className="
              rounded-none border-b-2 border-transparent px-0 shadow-none
              data-[state=active]:border-primary
              focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
            "
                    >
                        Card Overview
                    </TabsTrigger>

                    <TabsTrigger
                        value="detail"
                        className="
              rounded-none border-b-2 border-transparent px-0 shadow-none
              data-[state=active]:border-primary
              focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
            "
                    >
                        Card Detail
                    </TabsTrigger>

                    <TabsTrigger
                        value="management"
                        className="
              rounded-none border-b-2 border-transparent px-0 shadow-none
              data-[state=active]:border-primary
              focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
            "
                    >
                        Card Management
                    </TabsTrigger>
                </div>
            </TabsList>

            <TabsContent value="overview">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Kpi icon={CreditCard} label="Active Cards" value={42} trend="positive"/>

                    <Kpi
                        icon={DollarSign}
                        label="Monthly Spend"
                        value="$183,000"
                        trend="positive"
                        trendValue="36.8%"
                        subtext="vs last month"
                    />

                    <Kpi
                        icon={AlertTriangle}
                        label="AI Alerts"
                        value={4}
                        subtext="Unusual transactions"
                        trend="positive"
                    />

                    <Kpi
                        icon={Ban}
                        label="Unused Cards"
                        value={4}
                        subtext="Inactive > 60 days"
                        trend="positive"
                    />
                </div>

                <div className="mt-6">
                    <CardsTable />
                </div>
            </TabsContent>


            <TabsContent value="detail">
                <div className="rounded-md border bg-card p-6">Card Detail Placeholder</div>
            </TabsContent>

            <TabsContent value="management">
                <div className="rounded-md border bg-card p-6">Card Management Placeholder</div>
            </TabsContent>
        </Tabs>
    );
}
