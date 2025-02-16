import { Headset, PencilLine, ShieldCheck, Wallet } from "lucide-react"

const hireFeaturesData = [
    {
        icon: ShieldCheck,
        title: "Find the right contributors fast",
        points: [
            "Post a project and receive proposals from interested candidates",
            "Review candidates' previous work and contributions",
            "Invite up to 30 candidates per project post",
            "Use advanced filters to narrow down the best talent"
        ]
    },
    {
        icon: PencilLine,
        title: "Seamless project collaboration",
        points: [
            "Chat, video call, and share project files directly on the platform",
            "Monitor project progress with integrated tracking tools",
            "Manage team permissions for multi-contributor projects",
            "Customizable invoices and billing for easy tracking"
        ]
    },
    {
        icon: Wallet,
        title: "Secure and flexible payments",
        points: [
            "Enjoy secure payments with integrated protection for both parties",
            "Set milestones for payment on project completion",
            "Only pay when the work is verified and approved"
        ]
    },
    {
        icon: Headset,
        title: "Support and guidance",
        points: [
            "Access dedicated support for managing projects and talent",
            "Get guidance on best practices for finding and hiring talent"
        ]
    }
]

export default function HireFeatures() {
    return (
        <section className="w-full flex justify-center">
            <div className="w-full max-w-[70rem] px-5 xl:px-0">
                <h1 className="text-3xl sm:text-4xl font-bold">What you’ll get</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    {hireFeaturesData.map((feature, index) => (
                        <Item 
                            key={index} 
                            icon={feature.icon} 
                            title={feature.title} 
                            points={feature.points} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

const Item = ({ icon: Icon, title, points }: {
    icon: React.ElementType,
    title: string,
    points: string[]
}) => {
    return (
        <div className="flex">
            <div className="pr-2 sm:px-5">
                <Icon strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <ul className="mt-2">
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
