"use client"

import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, MapPin, Pin } from "lucide-react";

import { togglePinProject } from "@/actions/Projects";

import { Separator } from "@/components/ui/separator";

type ProjectCardProps = {
    id: string
    title: string;
    description: string;
    postedOn?: Date;
    submissionOn?: Date;
    technologies?: string[];
    emailVerified?: Date | null;
    location: string | null;
    contributions?: number;
    status?: string;
    isPinned?: boolean;
    pinnedByUsers?: number;
    fetchData?: () => void;
};

export default function ProjectCard(project: ProjectCardProps) {
    const { toast } = useToast();
    const { theme: currTheme } = useTheme();
    
    return (
        <div className="group flex flex-col justify-between gap-2 px-3 pt-3 rounded-lg min-h-[17rem] hover:bg-secondary">
            <div className="flex justify-between items-center pt-1">
                <div>
                    {project.postedOn && <p className="text-xs ">Posted: {`${project.postedOn.getDate()}-${(project.postedOn.getMonth() + 1)}-${project.postedOn.getFullYear()}`}</p>}
                    {project.submissionOn && <p className="text-xs ">Submitted: {`${project.submissionOn.getDate()}-${(project.submissionOn.getMonth() + 1)}-${project.submissionOn.getFullYear()}`}</p>}
                    <h3 className="text-lg font-semibold md:text-xl">{project.title}</h3>
                </div>
                { project.isPinned !== undefined && typeof project.fetchData === "function" && (
                    <button onClick={async (event) => {
                        event.stopPropagation();
                        const response = await togglePinProject(project.id)
                        toast({
                            title: response.message,
                            variant: response.success ? "default" : "destructive",
                        })
                        project.fetchData?.();
                    }}>
                        <div className="p-1 rounded group-hover:bg-background">
                            <Pin size={"20"} fill={project.isPinned ? "purple" : currTheme === "light" ? "white" : "black"} />
                        </div>
                    </button>
                )}
            </div>

            <div 
                className="text-sm font-normal md:text-md" 
                dangerouslySetInnerHTML={{ __html: project.description.length > 260 ? project.description.slice(0, 260)+"..." : project.description} } 
            />

            <div className="flex justify-between">
                <div className="space-y-4">
                    {project.technologies && (
                    <div className="flex flex-wrap items-center gap-2">
                        {project.technologies.map((tech, index) => (
                            <p key={index} className="px-2 py-1 text-sm rounded-full bg-secondary md:px-3 md:py-2 group-hover:bg-background">{tech}</p>
                        ))}
                    </div>)}
                    <div className="flex items-center gap-4">
                        { project.emailVerified && <div className="flex items-center gap-1">
                            <BadgeCheck size={"18"} />
                            <p className="text-sm">Recruiter verified</p>
                        </div> }
                        { project.pinnedByUsers !== undefined && <div className="flex items-center gap-2 p-1 rounded bg-secondary group-hover:bg-background">
                                <Pin strokeWidth={2} size={18} fill="purple" />
                                <div className="text-sm">Pinned by <span className="font-semibold">{project.pinnedByUsers}</span></div>
                        </div> }
                        <div className="flex items-center gap-1">
                            <MapPin size={"18"} />
                            <p className="text-sm">{project.location ? project.location : "Worldwide"}</p>
                        </div>
                    </div>
                    {project.contributions !== undefined && (
                        <div>
                            <p className="text-sm">Contributions: {project.contributions}</p>
                        </div>  
                    )}
                </div>
                {project.status && (
                    <div className="flex items-center">
                        <h3 className={`p-3 text-sm border rounded-lg ${project.status === "PENDING" ? "border-yellow-500" : project.status === "SHORTLISTED" ? "border-blue-500" : project.status === "COMPLETED" || project.status === "ONGOING" ? "border-green-500" : "border-red-500"}`}>
                            {project.status}
                        </h3>
                    </div>
                )}
            </div>
            <Separator />
        </div>
    )
}