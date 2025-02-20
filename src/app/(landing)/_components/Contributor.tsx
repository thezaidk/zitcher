"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Contributor() {
    const router = useRouter();

    return (
        <section className="flex justify-center w-full">
            <div className="flex w-full max-w-[70rem] mx-auto mt-[10rem] bg-orange-900 text-white rounded-lg">
                <div className="hidden md:flex relative flex-1 min-h-[300px] md:min-h-full">
                    <Image 
                        src="/images/client.png"
                        alt="client"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-s-lg"
                    />
                </div>
                <div className="p-8 flex-1">
                    <div>
                        <h3 className="text-lg sm:text-xl">For Contributors</h3>
                        <div className="text-3xl sm:text-5xl mt-8 mb-5">
                            <h1 className="font-bold">
                                Find exciting
                            </h1>
                            <div className="text-orange-300 font-bold">
                                projects
                            </div>
                        </div>
                        <p className="sm:text-lg font-light">
                            Contribute to innovative projects, enhance your skills, and build your portfolio by working with leading recruiters and organizations.
                        </p>
                    </div>
                    <hr className="h-[1px] bg-neutral-100 mt-10 sm:mt-28" />
                    <div className="flex flex-wrap justify-start mt-5 gap-4">
                        <Point title="Showcase your skills through real-world projects" />
                        <Point title="Collaborate with experienced professionals" />
                        <Point title="Find freelance or open-source opportunities" />
                    </div>
                    <Button 
                        size="lg" 
                        className="bg-white text-black mt-5 hover:text-white"
                        onClick={() => {
                            router.push("/auth/signin")
                        }}
                    >
                        Find opportunities
                    </Button>
                </div>
            </div>
        </section>
    );
}

const Point = ({ title }: { title: string; }) => {
    return (
        <div className="flex w-[10rem]">
            <p className="text-sm">{title}</p>
        </div>
    );
};
