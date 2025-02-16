import { candidateNavLinks } from "@/lib/data";
import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Provider from "../provider";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

export default async function Layout({
    children
} : { children: React.ReactNode}) {
    const session = await getServerSession(authOptions);
    if(!session) {
        return redirect("/auth/signin");
    }

    return (
        <Provider>
            <AppSidebar navLinks={candidateNavLinks} role={session.user.role} />
            <main className="relative min-h-svh min-w-full">
                <Header navLinks={candidateNavLinks} role={session.user.role} />
                { children }
            </main>
        </Provider>
    )
}