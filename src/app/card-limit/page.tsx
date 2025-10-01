"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardPageRedirect from "@/components/dashboard/CardPageRedirect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilter, Search, Settings, Maximize2 } from "lucide-react";

import { cards } from "@/data/cards";

export default function CardAndLimitsPage() {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(cards.length / pageSize);

    const start = (page - 1) * pageSize;
    const paginated = cards.slice(start, start + pageSize);

    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight py-5">Cards and Limits</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <CardPageRedirect
                    label="Issue card"
                    value="Create cards with built-in limits for T&E and operational spend"
                />
                <CardPageRedirect
                    label="Create spend limit"
                    value="Distribute funds for stipends or events that can be spent via employee card or reimburse"
                />
                <CardPageRedirect
                    label="Manage request types"
                    value="Set what users can request spend for, info they must provide, and approvers"
                />
                <CardPageRedirect
                    label="Manage policy"
                    value="Customize expense flagging, blocking, and documentation rules"
                />
            </div>

            {/* set default to the visible tab */}
            <Tabs defaultValue="cards" className="w-full">
                <TabsList className="mb-4 border-b bg-transparent px-0 overflow-x-auto whitespace-nowrap scrollbar-none sm:overflow-visible sm:whitespace-normal">
                    <div className="flex gap-6">
                        <TabsTrigger
                            value="cards"
                            className="rounded-none border-b-2 border-transparent px-0 shadow-none data-[state=active]:border-primary focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            Cards
                        </TabsTrigger>
                        <TabsTrigger
                            value="spendLimits"
                            className="rounded-none border-b-2 border-transparent px-0 shadow-none data-[state=active]:border-primary focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            Spend limits
                        </TabsTrigger>
                    </div>
                </TabsList>

                <TabsContent value="cards">
                    {/* ROW 1: left buttons, right search + settings */}
                    <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between"
                            style={{ borderBottom: '2px solid grey' }}>
                        {/* left side: separate buttons */}
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline">All</Button>
                            <Button variant="outline">Employee Cards</Button>
                            <Button variant="outline">Purchasing Cards</Button>
                            <Button variant="outline">+ Save As</Button>
                        </div>

                        {/* right side: search + settings */}
                        <div className="flex items-center gap-2">
                            <div className="relative w-[260px]">
                                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Button>
                            <div className="h-6 w-px bg-border" />

                            <Button variant="outline" size="icon">
                                <Maximize2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* ROW 2: smaller Add filter button */}
                    <div className="pb-3 pt-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <ListFilter className="h-4 w-4" />
                            Add filter
                        </Button>
                    </div>

                    {/* ROW 3: table */}
                    <div className="overflow-x-auto rounded-md border">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                            <tr className="bg-muted">
                                <th className="p-3 text-left font-medium">Cardholder</th>
                                <th className="p-3 text-left font-medium">Card</th>
                                <th className="p-3 text-left font-medium">Status</th>
                                <th className="p-3 text-left font-medium">Card Type</th>
                                <th className="p-3 text-left font-medium">Card Format</th>
                                <th className="p-3 text-left font-medium">Assigned Limit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginated.map((card) => (
                                <tr key={card.id} className="border-t">
                                    <td className="p-3">{card.holder}</td>
                                    <td className="p-3">N/A</td>
                                    <td className="p-3">{card.status}</td>
                                    <td className="p-3">{card.type}</td>
                                    <td className="p-3">Format</td>
                                    <td className="p-3">{card.limit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="spendLimits">
                    <div className="rounded-md border bg-card p-6">Spend Limits</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
