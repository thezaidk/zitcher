"use client"

import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HireDesc() {
    const router = useRouter();

    return (
        <section className="w-full mx-5 mt-[10rem] flex justify-center">
            <div className="w-full max-w-[70rem] flex justify-between mx-2 md:mx-0">
                <div className="hidden md:block">
                    <Image
                        src="/images/hireDesc.jpg"
                        alt="Hire Intro"
                        className="rounded-lg shadow-xl"
                        height={1000}
                        width={1200}
                    />
                </div>
                
                <div className="flex flex-col justify-center items-start gap-5 md:ml-8">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold">Post today, hire tomorrow</h1>
                        <p className="md:text-lg  md:font-medium">
                            We&apos;ve got you covered from idea to delivery. Post your job, and you&apos;ll start receiving proposals in no time. Once you&apos;ve found the right expert, discuss timelines, availability, and pricing before moving ahead.
                        </p>
                        <div className="flex mt-5">
                            <div className="flex items-center">
                                <DollarSign strokeWidth={2} size={30} />
                            </div>
                            <div className="ml-2">
                                <h1 className="text-lg md:text-xl font-semibold">Zitcher Payment Protection</h1>
                                <p className="md:text-lg font-medium text-gray-600">
                                    Provides security and peace of mind
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="md:px-20"
                        onClick={() => {
                            router.push("/auth/signin")
                        }}
                    >
                        Post a job
                    </Button>
                </div>
            </div>
        </section>
    )
}
