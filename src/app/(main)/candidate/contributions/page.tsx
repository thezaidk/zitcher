import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSubmissionsByUser } from "@/actions/Submission";

import ProjectCard from "@/components/ProjectCard";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Contributions() {
    const session = await getServerSession(authOptions);
    if(!session || session.user === undefined){
        {redirect("/auth/signin")}
    }

    const { submissions } = await getSubmissionsByUser(session.user.id);

    return (
        <main className="flex justify-center mx-5 my-3 h-screen md:mx-20">
            <div className="flex flex-col gap-10 w-full max-w-[1536px]">
                <div className="flex flex-col gap-5 mt-5">
                    <h1 className="text-4xl font-medium">All contributions</h1>
                    <div className="flex justify-between items-center">
                        <div className="w-full md:w-80 lg:w-[30rem]">
                            {submissions && (
                                <Searchbar 
                                    commands={{
                                        topic: "Search contributions...",
                                        data: submissions?.map(c => ({
                                            label: c.project.title,
                                            link:`/candidate/contribution/${c.id}`,
                                        })),
                                    }} 
                                /> 
                            )}
                        </div>
                        <div className="hidden md:block">
                            <p>Total contributions: <span className={`${submissions ? "text-green-500" : "text-red-500"}`}>{submissions?.length ? submissions.length : 0}</span></p>
                        </div>
                    </div>
                    <Separator />
                </div>
                {submissions === undefined ? (
                    <div className="flex flex-col items-start gap-5 px-5 py-8 rounded-lg bg-secondary md:items-center md:px-0 md:py-16">
                    <h3 className="text-lg md:text-2xl">You don&apos;t have any contributions yet.</h3>
                    <p className="text-sm">Your pending, active, completed and shortlisted contributions will be available here when you start working on projects.</p>
                    <Link href={"/candidate/find-project"}><Button>Search for new projects</Button></Link>
                </div>
                ) : (
                    <div>
                        {submissions.map(c => (
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