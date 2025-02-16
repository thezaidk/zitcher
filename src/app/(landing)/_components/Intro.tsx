import { Button } from "@/components/ui/button";
import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Intro() {
    const session = await getServerSession(authOptions);

    return (
        <section className="h-screen flex flex-col items-center justify-center text-center mx-5">
            <div className="space-y-5">
                <h1 className="text-5xl sm:text-7xl font-bold">
                    <span>
                        Pitch Your Projects, <br />
                        Showcase Your Talent, Get Hired!
                    </span>
                </h1>
                <p className="text-lg font-medium text-foreground mt-4 md:text-xl">
                    <span>
                        Recruiters can <span className="underline bg-purple-200">post projects, assignments, or open-source work,</span> <br />
                        while developers and contributors <span className="underline bg-purple-200">showcase their skills to land jobs</span> or make a difference. <br />
                        <span className="hidden text-md sm:block">Empowering recruiters and candidates on one seamless platform.</span>
                    </span>
                </p>
                <Link href="/auth/signin">
                    <Button
                        size="lg" 
                        className="mt-6"
                    >
                        {session?.user ? "Enter Zitcher" : "Get Started"}
                    </Button>
                </Link>
            </div>
        </section>
    )
}