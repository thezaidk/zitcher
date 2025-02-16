import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth.config";
import { ChartBar } from "lucide-react";

import { getActiveSubmission } from "@/actions/Submission";

import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function ActiveContributions() {
    const session = await getServerSession(authOptions);
    if(session === undefined || session?.user === undefined) {
        redirect("/auth/signin");
    }

    const { activeSubmissions } = await getActiveSubmission(session.user.id);

    return (
        <main className="flex justify-center h-full">
            <div className="flex flex-col gap-3 mx-5 my-3 w-full max-w-[1536px] md:gap-10 md:mx-20">
                <div className="space-y-2 mt-5 lg:mt-10">
                    <div className="flex gap-5">
                        <ChartBar className="mt-1" size={30}  />
                        <div className="pb-2 ">
                            <h1 className="text-2xl font-semibold md:text-3xl">Active contribution</h1>
                            <h3 className="text-sm md:text-lg">Your active contribution: <span className={`${activeSubmissions ? "text-green-500" : "text-red-500"}`}>{activeSubmissions ? activeSubmissions.length : 0}</span></h3>
                        </div>
                    </div>
                    <Separator />
                </div>
                {activeSubmissions === undefined || activeSubmissions.length === 0 ? (
                    <div className="flex flex-col items-start gap-5 px-5 py-8 bg-secondary rounded-lg md:items-center md:px-0 md:py-16">
                    <h3 className="text-lg md:text-xl">There are no active contributions.</h3>
                    <p className="text-sm">Projects you&apos;re actively working on will appear here.</p>
                    <Link href={"/candidate/find-project"}><Button>Search for new projects</Button></Link>
                </div>
                ) : (
                    <div>
                        {activeSubmissions.map(c => (
                            <Link href={`/candidate/contribution/${c.id}`} key={c.id}>
                                <ProjectCard
                                    key={c.id}
                                    id={c.id}
                                    title={c.project.title}
                                    description={c.project.description}
                                    submissionOn={c.createdAt}
                                    technologies={c.project.technologies.map(tech => tech.name)}
                                    emailVerified={c.project.recruiter.emailVerified}
                                    location={c.project.recruiter.region}
                                    status={c.status}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}