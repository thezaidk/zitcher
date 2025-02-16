"use client";

import { getPinProjects, getProjects } from "@/actions/Projects";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProjectCard from "@/components/ProjectCard";
import { Spinner } from "@/components/Spinner";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";

type Recruiter = {
    id: string;
    region: string | null;
    emailVerified: Date | null;
};

type Technology = {
    id: string;
    name: string;
};

type ProjectType = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    recruiter: Recruiter;
    technologies: Technology[];
    pinnedByUsers: {
        id: string
    }[];
    _count: {
        pinnedByUsers: number;
        submissions: number;
    }
}

type PinProjectType = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    recruiter: Recruiter;
    technologies: Technology[];
    _count: {
        pinnedByUsers: number;
        submissions: number;
    }
}

export default function ProjectsTabs() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [pinProjects, setPinProjects] = useState<PinProjectType[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const fetchData = useCallback(async () => {
        try {
            const projectsData = await getProjects();
            const pinProjectsData = await getPinProjects();
            
            setProjects(projectsData.data || []);
            setPinProjects(pinProjectsData.data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    } ,[]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <Tabs defaultValue="projects" className="w-full">
                <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="pinprojects">Pin Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="projects">
                    {loading ? (
                        <div className="flex justify-center items-center pt-5">
                            <Spinner size={"lg"} />
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="pt-2">
                            {projects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="cursor-pointer"
                                    onClick={() => router.push(`/candidate/project/${project.id}`)}
                                >
                                    <ProjectCard
                                        id={project.id}
                                        title={project.title}
                                        description={project.description}
                                        postedOn={project.createdAt}
                                        technologies={project.technologies.map((tech) => tech.name)}
                                        emailVerified={project.recruiter.emailVerified}
                                        location={project.recruiter.region}
                                        contributions={project._count.submissions}
                                        isPinned={project.pinnedByUsers.length === 1}
                                        pinnedByUsers={project._count.pinnedByUsers}
                                        fetchData={fetchData}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center pt-5">
                            <h3 className="font-bold text-lg">No project found!</h3>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="pinprojects">
                    {loading ? (
                        <div>Loading...</div>
                    ) : pinProjects.length > 0 ? (
                        <div className="pt-2">
                            {pinProjects.map((project) => (
                                <div 
                                    key={project.id}
                                    className="cursor-pointer"
                                    onClick={() => router.push(`/candidate/project/${project.id}`)}
                                >
                                    <ProjectCard
                                        id={project.id}
                                        title={project.title}
                                        description={project.description}
                                        postedOn={project.createdAt}
                                        technologies={project.technologies.map((tech) => tech.name)}
                                        emailVerified={project.recruiter.emailVerified}
                                        location={project.recruiter.region}
                                        contributions={project._count.submissions}
                                        isPinned={true}
                                        pinnedByUsers={project._count.pinnedByUsers}
                                        fetchData={fetchData}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center pt-5">
                            <h3 className="font-bold text-lg">No pin project found!</h3>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}