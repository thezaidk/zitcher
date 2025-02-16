import { ChartBar } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth.config";

import { getActiveProjects } from "@/actions/Projects";

import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function activeProjects() {
    const session = await getServerSession(authOptions);
    if(session === undefined || session?.user === undefined) {
        redirect("/auth/signin");
    }

    const { activeProjects } = await getActiveProjects(session.user.id);
    
    return (
        <main className="flex justify-center h-full">
            <div className="flex flex-col gap-3 mx-5 my-5 w-full max-w-[1536px] md:gap-10 md:mx-20 md:mt-10">
                <div className="space-y-2">
                    <div className="flex gap-5">
                        <ChartBar className="mt-1" size={30}  />
                        <div className="pb-2">
                            <h1 className="text-2xl font-semibold md:text-3xl">Active project</h1>
                            <h3 className="text-sm md:text-lg">Your active projects: <span className={`${activeProjects ? "text-green-500" : "text-red-500"}`}>{activeProjects ? activeProjects.length : 0}</span></h3>
                        </div>
                    </div>
                    <Separator />
                </div>
                {activeProjects === undefined || activeProjects.length === 0 ? (
                    <div className="flex flex-col items-start gap-5 px-5 py-8 rounded-lg bg-secondary md:items-center md:px-0 md:py-16">
                    <h3 className="text-lg font-semibold md:text-2xl">There are no active projects.</h3>
                    <p className="text-sm">Projects you&apos;re actively working on will appear here.</p>
                    <Link href={"/recruiter/find-candidate"}><Button>Search for new candidates</Button></Link>
                </div>
                ) : (
                    <div>
                        {activeProjects.map(c => (
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