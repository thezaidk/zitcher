import { getSubmission } from "@/actions/Submission";

import ContributionDetails from "@/components/ContributionDetails";

export default async function Contribution({ params } : { params : { id: string}}) {
    const submissionId = params.id;
    const { success, submission } = await getSubmission(submissionId);

    if (!success || !submission) {
        return (
            <main className="flex justify-center mx-5 my-10">
                <p className="text-red-500">Failed to load project details. Please try again later.</p>
            </main>
        );
    }

    return (
        <ContributionDetails submission={submission} />
    )
}