import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth.config";

import { getRecruiterProjects } from "@/actions/Projects";

import ProjectCard from "@/components/ProjectCard";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Projects() {
    const session = await getServerSession(authOptions);
    if(!session || session.user === undefined){
        {redirect("/auth/signin")}
    }

    const { projects } = await getRecruiterProjects(session.user.id);
    
    return (
        <main className="flex justify-center mx-5 my-3 h-screen md:mx-20">
            <div className="flex flex-col gap-10 w-full max-w-[1536px]">
                <div className="flex flex-col gap-5 mt-5">
                    <h1 className="text-4xl font-medium">Your all projects</h1>
                    <div className="flex justify-between items-center">
                        <div className="w-full md:w-80 lg:w-[30rem]">
                            {projects && (
                                <Searchbar
                                    commands={{
                                        topic: "Search your project...",
                                        data: projects?.map(c => ({
                                            label: c.title,
                                            link:`/recruiter/project/${c.id}`,
                                        })),
                                    }} 
                                /> 
                            )}
                        </div>
                        <div className="hidden md:block">
                            <p>Total projects: <span className={`${projects?.length ? "text-green-500" : "text-red-500"}`}>{projects?.length ? projects.length : 0}</span></p>
                        </div>
                    </div>
                    <Separator />
                </div>
                {projects === undefined || projects.length === 0 ? (
                    <div className="flex flex-col items-start gap-5 px-5 py-8 rounded-lg bg-secondary md:items-center md:px-0 md:py-16">
                    <h3 className="text-lg md:text-2xl">You did not posted project yet.</h3>
                    <p className="text-sm">Your Ongoing and Closed projects will be available here when you start posting the projects.</p>
                    <Link href={"/recruiter/find-candidate"}><Button>Search suitable candidates</Button></Link>
                </div>
                ) : (
                    <div>
                        {projects.map(c => (
                            <Link href={`/recruiter/project/${c.id}`} key={c.id}>
                                <ProjectCard
                                    key={c.id}
                                    id={c.id}
                                    title={c.title}
                                    description={c.description}
                                    postedOn={c.createdAt}
                                    technologies={c.technologies.map(tech => tech.name)}
                                    location={c.recruiter.region}
                                    status={c.status}
                                    contributions={c._count.submissions}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}