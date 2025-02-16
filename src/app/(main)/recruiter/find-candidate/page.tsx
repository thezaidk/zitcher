import { authOptions } from "@/config/auth.config";
import { recruiterSlides } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { getRecruiter } from "@/actions/User";

import CandidateTab from "@/components/CandidateTab";
import NewsCarousel from "@/components/NewsCarousel";
import ProfileCards from "@/components/ProfileCards";

export default async function FindCandidate() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/signin");

    const { user } = await getRecruiter(session.user.id);
    
    if (!user) {
        redirect("/auth/signin");
    }

    return (
        <main className="flex justify-center mx-5 my-3 h-full md:mx-10 xl:mx-20">
            <div className="container grid grid-cols-8 gap-6 h-full">
                <div className="col-span-8 space-y-7 h-full w-full md:col-span-6">
                    <NewsCarousel slides={recruiterSlides} role={"RECRUITER"} />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl">Candidates you might like</h2>
                        <CandidateTab />
                    </div>
                </div>
                <aside className="hidden sticky overflow-auto h-full md:block md:col-span-2">
                    <div className="flex flex-col gap-3">
                        <ProfileCards user={user} />
                    </div>
                </aside>
            </div>
        </main>
    )
}