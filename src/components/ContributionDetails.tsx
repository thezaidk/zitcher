"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export type Project = {
    id: string,
    title: string;
    description: string;
}

export type Candidate = {
    name: string;
}

export type SubmissionProps = {
    id: string;
    projectId: string;
    candidateId: string;
    title: string;
    link: string;
    description: string | null;
    bounty: number | null;
    paidAt: Date | null;
    project: Project;
    candidate: Candidate;
    status: "PENDING" | "SHORTLISTED" | "REJECTED" | "COMPLETED";
    createdAt: Date;
    updateAt: Date;
}

export default function ContributionDetails({ submission }: { submission: SubmissionProps}) {
    const router = useRouter();

    return (
        <main className="flex justify-center mx-5 my-5 md:mx-10 xl:mx-20">
            <div className="flex flex-col w-full max-w-[1536px] md:flex-row">
                <div className="flex-1 flex flex-col gap-5 md:border-r-[1.1px]">
                    <div className="space-y-10 md:py-5 md:pr-5">
                        <div className="space-y-2">
                            <h5 className="text-sm text-muted-foreground">Submission title:</h5>
                            <p className="text-xl font-semibold md:text-2xl">{submission.title}</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-sm text-muted-foreground">Code link:</h5>
                            <Button onClick={() => router.push(submission.link)}>Submitted Code</Button>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-sm text-muted-foreground">Contribution description:</h5>
                            <p className="p-3 leading-7 rounded-lg bg-secondary md:p-5">{submission.description}</p>
                        </div>
                    </div>
                    <div className="pt-5 border-t">
                        <h3 className="pb-3 text-xl text-muted-foreground font-semibold">About project</h3>
                        <Link href={`/candidate/project/${submission.project.id}`}>
                            <div className="p-3 space-y-3 border rounded-lg md:py-5 md:mr-5 md:hover:bg-secondary">
                                <h1 className="text-lg font-medium md:text-xl">{submission.project.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: submission.project.description.length > 300 ? submission.project.description.slice(0, 300)+"..." : submission.project.description} } />
                            </div>
                        </Link>
                        <div className="flex items-center gap-2 py-5 text-xs border-b-[1.1px]">
                            <Link
                                href={`/candidate/project/${submission.project.id}`} 
                                className="p-2 rounded-full bg-secondary"
                            >
                                {submission.project.title.length > 20 ? 
                                    `${submission.project.title.slice(0,20)}...` : submission.project.title
                                }
                            </Link>
                            <ArrowRight size={15} />
                            <Link
                                href={`/candidate/contributions`}
                                className="p-2 rounded-full bg-secondary"
                            >
                                contributions/{submission.candidate.name}
                            </Link>
                        </div>
                    </div>
                </div>
                <aside className="space-y-10 px-3 pt-8 lg:px-10 xl:min-w-[20rem]">
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <h5 className="text-sm">Contribution status:</h5>
                            <h3 className={`p-2 text-center font-bold border-2 rounded-full lg:p-5 ${submission.status === "PENDING" ? "border-yellow-500" : submission.status === "REJECTED" ? "border-red-500" : "border-green-500"}`}>{submission.status}</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                            <p>contribution created: {new Date(submission.createdAt).toLocaleDateString()}</p>
                            <p>last update: {new Date(submission.updateAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}