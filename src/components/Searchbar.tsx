"use client"

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CommandGroup } from "cmdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

type CommandProps = {
    topic: string,
    data: { 
        label: string,
        link: string;
    }[],
    ktag?: boolean,
}

export default function Searchbar({ commands } : {
    commands : CommandProps
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                "relative justify-start text-sm font-normal text-muted-foreground shadow-none rounded-[0.5rem] bg-muted/50 h-8 w-full sm:pr-12"
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">{commands.topic}</span>
                <span className="inline-flex lg:hidden">Search...</span>
                {commands.ktag && (
                    <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                    </kbd>
                )}
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup >
                        {commands.data.map((i) => (
                            <CommandItem
                                key={i.link}
                                onSelect={() => router.push(i.link)}
                            >
                                {i.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}