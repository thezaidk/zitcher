"use client"

import { Button } from "@/components/ui/button";
import { GraduationCap, Pin, SquarePen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Features data
const featuresData = [
    {
        icon: SquarePen,
        title: "Free to Join and Contribute",
        desc: "Register and start pitching or contributing to projects. Whether it's for job opportunities or open-source projects, it's free to join."
    },
    {
        icon: Pin,
        title: "Pitch Projects Easily",
        desc: "Recruiters can post assignments, freelance projects, or open-source collaborations with a few clicks, making it easy to attract talent."
    },
    {
        icon: GraduationCap,
        title: "Showcase Your Skills",
        desc: "Candidates can submit assignments, showcase their work portfolio, and collaborate on projects to land job opportunities or gain experience."
    }
];

export default function Features() {
    const router = useRouter();

    return (
        <section className="max-w-[70rem] mx-2 md:mx-5">
            <div className="flex justify-between">
                <div className="hidden md:block">
                    <Image
                        src="/images/features-img.png"
                        alt="features"
                        width={500}
                        height={500}
                        className="rounded-lg border shadow-lg"
                    />
                </div>
                <div className="flex flex-col gap-3 md:ml-8">
                    <h1 className="text-3xl font-bold">Simplifying Project Collaboration</h1>
                    <div className="flex flex-col gap-5 mt-5">
                        {featuresData.map((feature, index) => (
                            <Feature 
                                key={index} 
                                icon={feature.icon} 
                                title={feature.title} 
                                desc={feature.desc} 
                            />
                        ))}
                    </div>
                    <div className="mt-2 space-x-3">
                        <Button 
                            onClick={() => {
                                router.push("/auth/signin")
                            }}
                        >
                            Sign up for free
                        </Button>
                        <Button 
                            onClick={() => {
                                router.push("/auth/signin")
                            }}
                            variant="outline"
                        >
                            Learn more
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Feature = ({ icon: Icon, title, desc }: {
    icon: React.ElementType,
    title: string,
    desc: string
}) => {
    return (
        <div className="flex">
            <Icon strokeWidth={1.5} className="hidden sm:block mr-2" />
            <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-gray-600">{desc}</p>
            </div>
        </div>
    );
}
