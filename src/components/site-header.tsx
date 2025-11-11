"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/lib/constants";
import { CartSheet } from "./cart-sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="py-4">
              <Logo />
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium",
                    pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Logo */}
            <div className="flex justify-center md:hidden">
                <Logo />
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
                {NAV_LINKS.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "font-medium transition-colors",
                            pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 border-r pr-2 mr-2">
                <Search className="h-5 w-5 text-muted-foreground"/>
                <Input type="search" placeholder="Search..." className="h-9 md:w-[150px] lg:w-[250px]" />
            </div>
             <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <CartSheet />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User Account</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
