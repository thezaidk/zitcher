import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/User";

import ManageRecruiterProfile from "@/components/ManageRecruiterProfile";

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
            <ManageRecruiterProfile
                userId={session.user.id}
                user={
                    {
                        name: user.name,
                        bio: user.bio || undefined,
                        region: user.region || undefined,
                        upiId: user.upiId || undefined,
                        linkedin: user.linkedin || undefined,
                    }
                }   
            />
        </div>
    )
}