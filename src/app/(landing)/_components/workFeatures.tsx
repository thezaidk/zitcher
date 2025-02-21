import { 
    Briefcase, 
    ChartBar, 
    Gavel, 
    Globe, 
    MessageCircleQuestion, 
    ShieldCheck 
} from "lucide-react";

const workFeaturesData = [
    {
        icon: ChartBar,
        title: "Client Reviews",
        desc: "Read detailed feedback and reviews from other professionals to make informed decisions."
    },
    {
        icon: Briefcase,
        title: "Trusted Jobs",
        desc: "Our dedicated team and advanced tools work around the clock to detect and reduce fraud."
    },
    {
        icon: ShieldCheck,
        title: "Protected Payments",
        desc: "Receive payments securely with multiple options, all fully protected by our platform."
    },
    {
        icon: Gavel,
        title: "Help with Disputes",
        desc: "Our support team is here to assist and resolve any issues or disputes that may arise."
    },
    {
        icon: MessageCircleQuestion,
        title: "Answers to Questions",
        desc: "Access our help center, resources, and community for all the answers and support you need."
    },
    {
        icon: Globe,
        title: "Global Opportunities",
        desc: "Connect with clients and explore job opportunities from all around the world, anytime, anywhere."
    }
];

export default function WorkFeatures() {
    return (
        <section className="w-full flex justify-center mb-10">
            <div className="w-full max-w-[70rem] px-2">
                <h1 className="text-3xl sm:text-4xl font-bold">What You&apos;ll Get</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    {workFeaturesData.map((feature, index) => (
                        <Item 
                            key={index} 
                            icon={feature.icon} 
                            title={feature.title} 
                            desc={feature.desc} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

const Item = ({ icon: Icon, title, desc } : {
    icon: React.ElementType,
    title: string,
    desc: string
}) => {
    return (
        <div className="flex">
            <div className="pr-2 md:pr-5">
                <Icon strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-2">{desc}</p>
            </div>
        </div>
    )
}
