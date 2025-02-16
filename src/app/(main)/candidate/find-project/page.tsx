import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth.config";
import { candidateSlides } from "@/lib/data";

import { getCandidate } from "@/actions/User";

import NewsCarousel from "@/components/NewsCarousel";
import ProfileCards from "@/components/ProfileCards";
import ProjectTab from "@/components/ProjectTab";

export default async function FindProject() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    const { user } = await getCandidate(session.user.id);
    
    if (!user) {
        redirect("/auth/signin");
    }

    const userDetails = {
        id: user.id,
        name: user.name,
        bio: user.bio,
        role: user.role,
        total: user.submissions.length,
        active: user.submissions
        .filter(submission => submission.status === "PENDING")
        .map(submission => ({
            id: submission.id,
            name: submission.title,
        }))
    }

    return (
        <main className="flex justify-center mx-5 my-5 md:mx-10 xl:mx-20">
            <div className="container grid grid-cols-8 gap-6 h-full">
                <div className="col-span-8 space-y-7 h-full w-full md:col-span-6">
                    <NewsCarousel slides={candidateSlides} role={"CANDIDATE"} />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl">Projects you might like</h2>
                        <ProjectTab />
                    </div>
                </div>
                <aside className="hidden sticky h-full overflow-auto md:block md:col-span-2">
                    <div className="flex flex-col gap-3">
                        <ProfileCards user={userDetails} />
                    </div>
                </aside>
            </div>
        </main>
    )
}