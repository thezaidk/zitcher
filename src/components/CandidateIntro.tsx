"use client"

import { useToast } from "@/hooks/use-toast";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BadgeCheck, CircleEllipsis, Github, MapPin, Pin, Share } from "lucide-react";
import Link from "next/link";

import { togglePinCandidate } from "@/actions/User";

import CopyLink from "@/components/CopyLink";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CandidateIntroProps = {
    id: string
    name: string,
    location: string | null,
    joinedAt: Date,
    emailVerified: Date | null,
    github: string | null,
}

export default function CandidateIntro({ id, name, location, joinedAt, emailVerified, github}: CandidateIntroProps) {
    const { toast } = useToast();
    const pathname = usePathname();
    const [candidateProfile, setCandidateProfile] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const origin = window.location.origin;
            setCandidateProfile(`${origin}${pathname}`);
          }
    }, [pathname]);

    return (
        <div className="flex justify-between p-5 md:p-8 border-b">
            <div className="flex gap-5">
                <div className="bg-gray-200 text-gray-800 text-lg md:text-2xl flex items-center justify-center rounded-full h-10 md:h-16 w-10 md:w-16 mr-2 cursor-pointer">
                    {name[0].toUpperCase()}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-5">
                        <h1 className="text-xl md:text-3xl">{name}</h1>
                        {emailVerified && (
                            <div className="flex items-center gap-1">
                                <BadgeCheck size={18} fill="#1a8cff" />
                                <p className="hidden md:block text-sm">verified candidate</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {location && (
                            <>
                            <div className="flex items-center gap-1">
                                <MapPin className="hidden md:block" size={18} />
                                <p className="text-xs md:text-sm">Pune, India</p>
                            </div>
                            <p className="text-xs md:text-sm">-</p>
                            </>
                        )}
                        <p className="text-xs md:text-sm">Joined at: {`${joinedAt.getDate()}/${(joinedAt.getMonth() + 1)}/${joinedAt.getFullYear()}`}</p>
                    </div>
                    {github && (
                        <div className="flex items-center gap-2">
                            <Github className="hidden md:block" size={18} />
                            <p className="text-xs md:text-sm">GitHub: <Link href={github} className="hover:underline">github.com/the_zaid_k</Link></p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-between gap-2">
                <div className="text-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CircleEllipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                            <button 
                                className="flex items-center gap-2"
                                onClick={async () => {
                                    const response = await togglePinCandidate(id)

                                    toast({
                                        title: response.message,
                                        variant: response.success ? "default" : "destructive",
                                    })
                                }}
                            >
                                <Pin size={20} /> 
                                <p className="text-sm">Pin candidate</p>
                            </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <p className="text-sm">Share</p>
                                <Share size={18} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <div className="flex flex-col gap-5 p-5">
                                <h1 className="text-lg font-semibold">Copy candidate profile</h1>
                                <CopyLink link={candidateProfile} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}