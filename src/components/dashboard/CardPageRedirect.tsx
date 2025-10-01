import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CardPageRedirect({
                                            label,
                                            value
    }: {
    label: string,
    value: string
    }){
    return (
        <Card className="shadow-none border bg-card h-35">
            <CardHeader className="h-14 flex flex-row items-center justify-between pb-2 py-1">
                {/* Title on the left */}
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {label}
                </CardTitle>

                {/* Rounded arrow button on the right */}
                <Button
                    size="icon"
                    className="h-7 w-7 rounded-full bg-orange-500 text-black hover:bg-orange-400"
                >
                    <MoveRight className="h-1 w-1" />
                </Button>
            </CardHeader>
            <hr/>
            <CardContent className="pt-0">
                {value && (
                    <div className="py-5 text-sm text-base text-foreground">{value}</div>
                )}
            </CardContent>
        </Card>


    );

}
