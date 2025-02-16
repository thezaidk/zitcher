"use client"

import Link from "next/link";
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarGroupLabel, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem, 
    useSidebar 
} from "./ui/sidebar";

type HeaderProps = {
    title: string;
    links: {
        linkName: string;
        linkPath: string;
    }[];
}[];

export default function AppSidebar({ navLinks, role }: { navLinks: HeaderProps, role: string }) {
    const { setOpenMobile } = useSidebar();

    return (
        <div>
            <Sidebar>
                <SidebarHeader className="pt-5 pl-5">
                    <Link href="/candidate/find-project" onClick={() => setOpenMobile(false)}>
                        <h1 className={`font-bold font-cal text-xl drop-shadow-md ${role === "CANDIDATE" ? "text-purple-900 dark:text-purple-400" : "text-slate-900 dark:text-slate-400" }`}>
                            ZITCHER
                        </h1>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="pl-3">
                    <SidebarGroup />
                        <SidebarGroupLabel>Pages</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="px-3">
                                {navLinks.map(item => (
                                    item.links.length === 1 ? (
                                        <div key={item.title}>
                                            <SidebarMenuItem key={item.links[0].linkName}>
                                                <Link href={item.links[0].linkPath} onClick={() => setOpenMobile(false)} className="font-bold">
                                                    <SidebarMenuButton>
                                                        {item.links[0].linkName}
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuItem>
                                        </div>
                                    ) : (
                                        <div className="px-2" key={item.title}>
                                            <p className="font-bold">{item.title}</p>
                                            {item.links.map(link => (
                                                <SidebarMenuItem key={link.linkName}>
                                                    <Link href={link.linkPath} onClick={() => setOpenMobile(false)}>
                                                        <SidebarMenuButton>
                                                            {link.linkName}
                                                        </SidebarMenuButton>
                                                    </Link>
                                            </SidebarMenuItem>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </div>
    )
}