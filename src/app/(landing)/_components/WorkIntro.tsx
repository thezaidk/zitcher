"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WorkIntro() {
    const router = useRouter();

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center mx-5 xl:mt-16">
            <div className="flex justify-center h-[35rem] w-full max-w-[70rem] bg-neutral-50 bg-opacity-30 backdrop-blur-[0.5rem] rounded-xl shadow-md">
                <div className="flex flex-col md:items-start justify-center text-center md:text-start px-10">
                    <h1 className="text-5xl font-bold">
                        Find Projects You Love, 
                        <br />
                        Your Way
                    </h1>
                    <p className="mt-5 text-lg font-medium">
                        Discover and contribute to exciting projects in our vibrant marketplace. 
                        <br />
                        Your gateway to meaningful work opportunities.
                    </p>
                    <Button
                        size="lg"
                        className="mt-5" 
                        onClick={() => {
                            router.push("/auth/signin")
                        }}
                    >
                        Explore Projects
                    </Button>
                </div>
                <div className="hidden md:flex relative flex-1 min-h-[300px] md:min-h-full">
                    <Image
                        src="/workIntro.jpg"
                        alt="Work Intro"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-e-lg"
                    />
                </div>
            </div>
        </section>
    )
}
