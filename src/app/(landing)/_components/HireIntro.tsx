"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HireIntro() {
    const router = useRouter();

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center mx-5 xl:mt-16">
            <div className="flex justify-center h-[35rem] w-full max-w-[70rem] bg-neutral-50 bg-opacity-30 backdrop-blur-[0.5rem] rounded-xl shadow-md">
                <div className="flex flex-col gap-5 text-center md:items-start justify-center md:text-start px-10">
                    <div className="space-y-2">
                    <h1 className="text-5xl font-bold">
                        Post your project today,
                        <br />
                        find talent tomorrow
                    </h1>
                    <p className="text-lg font-medium">
                        Share your assignment, and connect with skilled contributors
                        <br />
                        ready to bring your project to life.
                    </p>
                    </div>
                    <Button
                        size="lg"
                        className="mt-5" 
                        onClick={() => {
                            router.push("/auth/signin")
                        }}
                    >
                        Find Candidates
                    </Button>
                </div>
                <div className="hidden md:flex relative flex-1 min-h-[300px] md:min-h-full">
                    <Image
                        src="/images/hireIntro.jpg"
                        alt="Hire Intro"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-e-lg"
                    />
                </div>
            </div>
        </section>
    );
}