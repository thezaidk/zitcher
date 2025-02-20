"use client"

import { Button } from "@/components/ui/button";
import { Briefcase, ClipboardList, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Recruiter() {
    const router = useRouter();

    return (
        <section className="flex justify-center w-full">
            <div className="flex max-w-[70rem] mt-[10rem] bg-purple-900 text-white rounded-lg overflow-hidden">
                <div className="p-8 flex-1 space-y-8">
                    <h3 className="text-lg sm:text-xl">For Recruiters</h3>
                    <div className="text-3xl sm:text-5xl mt-8 mb-5">
                        <h1 className="font-bold">
                            Pitch your project
                        </h1>
                        <div className="text-purple-300 font-bold">
                            find the right talent
                        </div>
                    </div>
                    <p className="sm:text-lg font-light">
                        Post your projects or assignments and connect with a network of skilled candidates, from freelancers to contributors, eager to collaborate and deliver top-notch results.
                    </p>
                    <div className="mt-5 space-y-3">
                        <Point icon={ClipboardList} title="Post projects, assignments, or freelance opportunities" />
                        <Point icon={Briefcase} title="Review submissions and select the best candidates" />
                        <Point icon={Users} title="Collaborate seamlessly and manage project milestones" />
                    </div>
                    <Button 
                        size="lg" 
                        className="bg-white text-black mt-5 hover:text-white"
                        onClick={() => {
                            router.push("/auth/signin")
                        }}
                    >
                        Learn more
                    </Button>
                </div>
                <div className="hidden md:flex relative flex-1 min-h-[300px] md:min-h-full">
                    <Image 
                        src="/images/enterprise.png"
                        alt="enterprise"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
        </section>
    )
}

const Point = ({ icon: Icon, title }: { icon: React.ElementType; title: string; }) => {
    return (
        <div className="flex gap-3">
            <Icon strokeWidth={1.5} color="#d8b4fe" />
            <p className="font-medium">{title}</p>
        </div>
    );
};
