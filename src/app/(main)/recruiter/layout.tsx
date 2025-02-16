import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { recruiterNavLinks } from "@/lib/data";

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
            <AppSidebar navLinks={recruiterNavLinks} role={session.user.role} />
            <main className="min-h-screen min-w-full">
                <Header navLinks={recruiterNavLinks} role={session.user.role} />
                { children }
            </main>
        </Provider>
    )
}