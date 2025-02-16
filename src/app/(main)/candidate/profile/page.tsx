import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/User";

import ManageCandidateProfile from "@/components/ManageCandidateProfile";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(session === undefined || session?.user === undefined) {
        redirect("/auth/signin");
    }

    const { success, user, message } = await getUser(session.user.id);

    if (!success || !user) {
        return (
            <div>
                {message}
            </div>
        )
    }
    return (
        <div>
            <ManageCandidateProfile
                userId={session.user.id}
                user={
                    {
                        name: user.name,
                        bio: user.bio || undefined,
                        region: user.region || undefined,
                        upiId: user.upiId || undefined,
                        website: user.website || undefined,
                        github: user.github || undefined,
                        linkedin: user.linkedin || undefined,
                    }
                }   
            />
        </div>
    )
}