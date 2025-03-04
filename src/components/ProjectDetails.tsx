"use client"

import { BadgeCheck, BadgeIndianRupee, BrainCog, MapPin, Pin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";

import { togglePinProject } from "@/actions/Projects";

import CopyLink from "@/components/CopyLink";
import SubmitContribution from "@/components/SubmitContribution";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type Technology = {
    id: string;
    name: string;
};
  
export type Recruiter = {
    name: string;
    email: string;
    emailVerified: Date | null;
    bio: string | null;
    region: string | null;
    projectCount?: number;
};

export type ProjectProps = {
    id: string;
    title: string;
    description: string;
    codeLink: string | null;
    bounty?: number | null;
    createdAt: Date;
    status: "ONGOING" | "CLOSED";
    difficulty: "EASY" | "INTERMEDIATE" | "HARD";
    technologies: Technology[];
    _count: {
        submissions: number;
        pinnedByUsers: number;
    };
    pinnedByUsers: { id: string }[];
    recruiter: Recruiter;
};

export default function ProjectDetails({ project } : { project: ProjectProps}) {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const { theme: currTheme } = useTheme();

    const [fullUrl, setFullUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
          const origin = window.location.origin;
          setFullUrl(`${origin}${pathname}`);
        }
    }, [pathname]);
    
    return (
        <main className="flex justify-center mx-5 my-5 md:mx-10 xl:mx-20">
            <div className="flex flex-col w-full max-w-[1536px] md:flex-row">
                <div className="flex-1 md:border-r-[1.1px]">
                    <div className="space-y-3 py-8 border-b-[1.1px] md:pr-5">
                        <h1 className="text-2xl font-semibold">{project.title}</h1>
                        <div className="flex items-center gap-5">
                            <p className="text-sm font-light">Posted on {`${project.createdAt.getDate()}/${(project.createdAt.getMonth() + 1)}/${project.createdAt.getFullYear()}`}</p>
                            <div className="flex items-center gap-1">
                                <MapPin size={"18"} />
                                <p className="text-sm">{project.recruiter.region || "Worldwide"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-8 border-b-[1.1px] md:pr-5">
                        <div dangerouslySetInnerHTML={{ __html: project.description }} />
                    </div>
                    <div className="flex gap-6 py-8 border-b-[1.1px] md:gap-20 md:pr-5">
                        <div className="flex gap-2">
                            <Pin className="hidden mt-1 md:block" strokeWidth={2} size={"18"} fill="black" />
                            <div>
                                <p className="font-semibold">{project._count.pinnedByUsers}</p>
                                <p className="text-xs">Pinned by users</p>
                            </div>
                        </div>
                        {project.bounty && (
                            <div className="flex gap-2">
                                <BadgeIndianRupee className="hidden mt-1 md:block" strokeWidth={2} size={"18"} />
                                <div>
                                    <p className="font-semibold">₹{project.bounty.toFixed(2)}</p>
                                    <p className="text-xs">Bounty-price</p>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <BrainCog className="hidden mt-1 md:block" strokeWidth={2} size={"18"} />
                            <div>
                                <p className={`font-semibold ${project.difficulty === "EASY" ? "text-green-500" : project.difficulty === "INTERMEDIATE" ? "text-yellow-500" : "text-red-500"}`}>{project.difficulty}</p>
                                <p className="text-xs">Difficulty level</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 py-8 border-b-[1.1px] md:pr-5">
                        <p className="text-sm font-semibold">Project status: </p>
                        <p className={`text-sm p-2 border rounded-lg ${project.status === "ONGOING" ? "border-green-500" : "border-red-500"}`}>{project.status}</p>
                    </div>
                    {project.technologies.length > 0 && (
                        <div className="space-y-3 py-8 border-b-[1.1px] md:pr-5">
                            <h1 className="text-lg font-medium">Skills and Expertise</h1>
                            <div className="flex flex-wrap gap-3 max-w-[40rem]">
                                {project.technologies.map((tech: Technology) => (
                                    <h4 key={tech.id} className="p-2 text-sm rounded-full bg-secondary">
                                        {tech.name}
                                    </h4>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="space-y-2 py-8 md:pr-5">
                        <h1 className="text-lg font-medium">Activity on this project</h1>
                        <p className="text-sm">Contributions: <span className="font-bold">{project._count.submissions}</span></p>
                    </div>
                </div>
                <aside className="space-y-10 px-3 pt-8 xl:px-10 md:w-[15rem] xl:w-[20rem]">
                    <div className="relative flex flex-col items-center gap-3">
                        {project.codeLink && (
                            <Button
                                className="rounded-xl w-full"
                                onClick={() => router.push(project.codeLink || "")}
                            >Go to Code</Button>
                        )}
                        <SubmitContribution projectId={project.id} />
                        <Button
                            className="gap-2 rounded-xl w-full"
                            variant={"outline"}
                            onClick={async () => {
                                const { success, message } = await togglePinProject(project.id)
                                if(success){
                                    toast({
                                        title: message
                                    })
                                } else {
                                    toast({
                                        title: message,
                                        variant: "destructive"
                                    })
                                }
                            }}
                        >
                            <Pin size={"15"} fill={project.pinnedByUsers.length === 1 ? "purple" : currTheme === "light" ? "white" : "black"} />
                            Pin project
                        </Button>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm">Contributions on this project: <span className="font-bold">{project._count.submissions}</span></p>
                    </div>
                    <div className="space-y-3 py-3 border-y">
                        <h2 className="text-lg font-semibold">About the recruiter</h2>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                {project.recruiter.emailVerified && (
                                    <div className="flex items-center gap-1">
                                        <BadgeCheck size={12} fill="green" />
                                        <p className="text-xs">Recruiter verified</p>
                                    </div>
                                )}
                                <p className="font-medium">{project.recruiter.name}</p>
                                <p className="text-xs">{project.recruiter.bio}</p>
                            </div>
                            {project.recruiter.region && (
                                <div className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    <p className="text-xs">{project.recruiter.region}</p>
                                </div>
                            )}
                            <p className="text-sm">No of projects: <span className="font-bold">{project.recruiter.projectCount}</span></p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold">Project link</h2>
                        <CopyLink link={fullUrl} />
                    </div>
                </aside>
            </div>
        </main>
    )
}