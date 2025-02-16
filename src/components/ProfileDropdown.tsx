"use client"

import { signOut, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "./ui/dropdown-menu";

export default function ProfileDropdown() {
    const router = useRouter();
    const { data } = useSession();

    const handleLogout = () => {
        signOut();
        router.push("/auth/signin");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-gray-200 text-gray-800 flex items-center justify-center rounded-full h-8 w-8 mr-2 cursor-pointer">
                    {data?.user.name && data.user.name[0].toUpperCase()}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {router.push(`/${data?.user.role.toLowerCase()}/profile`)}}>
                    {data?.user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}