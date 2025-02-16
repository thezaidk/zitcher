"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type NavbarType = {
    title: string,
    links: {
        linkName: string,
        linkPath: string,
    }[]
}[];

export default function Navbar({ navLinks, role }: {
    navLinks : NavbarType
    role: string
}) {
    const router = useRouter();

    return (
        <div className="flex gap-5 items-center">
            {navLinks.map((item, index) => (
                item.links.length <= 1 ? (
                    <Button 
                        key={index}
                        onClick={() => router.push(item.links[0].linkPath)}
                        variant={"ghost"}
                        className={`p-0 font-sans font-semibold hover:bg-transparent ${role === "CANDIDATE" ? "hover:text-purple-500" : "hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        {item.links[0].linkName}
                    </Button>
                ) : ( 
                    <DropdownMenu key={index}> 
                        <DropdownMenuTrigger className={`text-sm font-sans font-semibold rounded border-none focus:outline-none ${role === "CANDIDATE" ? "hover:text-purple-500" : "hover:text-slate-700 dark:hover:text-slate-300"}`}>
                            {item.title}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {item.links.map((link, linkIndex) => (
                                <DropdownMenuItem 
                                    key={linkIndex}
                                    onClick={() => router.push(link.linkPath)}
                                >
                                    {link.linkName}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            ))}
        </div>
    )
}