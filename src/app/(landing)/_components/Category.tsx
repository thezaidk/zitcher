"use client"

import { AppWindow, Code2, FileCode, Users, FileSearch2, DollarSign, Code, Share } from "lucide-react";
import CategoryItem from "./CategoryItem"

const categoryData = [
    {
        icon: Code2,
        title: "Software Development",
        desc: "Contribute to innovative software development projects and build your portfolio."
    },
    {
        icon: FileCode,
        title: "Open Source Contributions",
        desc: "Join exciting open-source projects and collaborate with global talent."
    },
    {
        icon: Users,
        title: "Project Management",
        desc: "Oversee and manage project lifecycles from start to finish."
    },
    {
        icon: FileSearch2,
        title: "Research & Analysis",
        desc: "Conduct research or market analysis to help projects achieve their goals."
    },
    {
        icon: DollarSign,
        title: "Freelance & Paid Projects",
        desc: "Find paid project assignments and freelance opportunities with ease."
    },
    {
        icon: Code,
        title: "Technical Writing",
        desc: "Contribute to technical documentation and writing for various projects."
    },
    {
        icon: Share,
        title: "Collaboration & Mentorship",
        desc: "Work with others or provide mentorship in collaborative team environments."
    },
    {
        icon: AppWindow,
        title: "Web Development",
        desc: "Join web development projects focused on frontend, backend, or full-stack technologies."
    },
]

export default function Category() {
    return (
        <section className="max-w-[70rem] mt-[15rem] mx-2 md:mx-5">
            <div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Browse Projects by Category</h1>
                    <div className="flex items-center">
                        <p className="text-gray-600 font-semibold">Looking to contribute?</p>
                        <a className="ml-2 text-[#6652fb] underline text-sm font-medium" href="/candidate/find-project">Browse projects</a>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {categoryData.map((data, index) => (
                        <CategoryItem
                            key={index}
                            Icon={data.icon}
                            title={data.title}
                            desc={data.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
