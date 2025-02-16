"use client"

import { useCallback, useEffect, useState } from "react";

import { Spinner } from "@/components/Spinner";
import SubmissionCard from "@/components/SubmissionCard";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { getSubmissionsByProject } from "@/actions/Submission";

type submission = {
    id: string;
    title: string | null;
    description: string | null;
    link: string;
    status: "PENDING" | "COMPLETED" | "SHORTLISTED" | "REJECTED";
    star: number;
    bounty: number | null;
    paidAt: Date | null;
    remark: string | null;
    createdAt: Date;
    updateAt: Date;
    projectId: string;
    candidateId: string;
    candidate: { name: string};
}

type FilteredSubmissions = {
    all: submission[];
    pending: submission[];
    completed: submission[];
    shortlisted: submission[];
    rejected: submission[];
};

export default function SubmissionTab({ projectId }: { projectId: string }) {
    const [filteredSubmissions, setFilteredSubmissions] = useState<FilteredSubmissions>({
        all: [],
        pending: [],
        completed: [],
        shortlisted: [],
        rejected: [],
    });
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = useCallback(async () => {
        try {
            const { submissions } = await getSubmissionsByProject(projectId);

            setFilteredSubmissions({
                all: submissions || [],
                pending: submissions?.filter(s => s.status === "PENDING") || [],
                completed: submissions?.filter(s => s.status === "COMPLETED") || [],
                shortlisted: submissions?.filter(s => s.status === "SHORTLISTED") || [],
                rejected: submissions?.filter(s => s.status === "REJECTED") || [],
            });
        } catch (error) {
            console.log("Error:", error)
        } finally {
            setLoading(false);
        }
    }, [projectId]);
    
    useEffect(() => {
        fetchSubmissions();
    }, [fetchSubmissions]);

    return (
        <section className="space-y-5">
            <h1 className="text-2xl font-semibold">Submissions</h1>
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="h-20 sm:h-min">
                    <div className="overflow-auto leading-9">
                    <TabsTrigger value="all">All submissions</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </div>
                </TabsList>
                {loading ? (
                    <div className="flex justify-center pt-10 w-full min-h-[20rem]">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {Object.entries(filteredSubmissions).map(([key, subs]) => (
                            <TabsContent key={key} value={key} className="min-h-[20rem]">
                                {subs.length === 0 ? (
                                    <NoSubmission />
                                ) : (
                                subs.map(s => (
                                    <SubmissionCard
                                        key={s.id}
                                        id={s.id}
                                        title={s.title}
                                        candidateId={s.candidateId}
                                        candidateName={s.candidate.name}
                                        createdAt={s.createdAt}
                                        link={s.link}
                                        description={s.description}
                                        remark={s.remark}
                                        status={s.status}
                                        star={s.star}
                                        bounty={s.bounty}
                                        paidAt={s.paidAt}
                                        fetchSubmissions={fetchSubmissions}
                                        />
                                    ))
                                )}
                            </TabsContent>
                        ))}
                    </>
                )}
            </Tabs>
        </section>
    )
}

function NoSubmission () {
    return (
        <div className="flex justify-center p-10 rounded bg-secondary">
            <h3 className="text-lg font-semibold">No submission yet!</h3>
        </div>
    )
}