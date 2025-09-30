// components/dashboard/Topbar.tsx
"use client";

import { Bell, ChevronDown, Menu, Search, LogOut, User } from "lucide-react";
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

//  Import profile image
import profileImage from "@/data/images/imageProfile.png";

export default function Topbar() {
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
                    <div className="relative w-[260px] md:w-[320px]">
                        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="w-full pl-8"
                            placeholder="Search or jump to"
                        />
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
                                {/* Avatar with fallback */}
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
