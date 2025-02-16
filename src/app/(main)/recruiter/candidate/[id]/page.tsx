import Link from "next/link";
import { Mail, Github, Globe, Link2, Linkedin, History, Star } from "lucide-react";

import { getCandidate } from "@/actions/User";

import CandidateIntro from "@/components/CandidateIntro";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";

export default async function Candidate({ params } : { params : { id: string}}) {
    const { message, user } = await getCandidate(params.id);
    if(!user) {
        return <div>
            <h1>{message}</h1>
        </div>
    }

    type successContributionType = {
        id: string;
        star: number;
        createdAt: Date;
        remark: string | null;
        status: "PENDING" | "SHORTLISTED" | "REJECTED" | "COMPLETED";
        updateAt: Date;
        project: {
            title: string;
        };
    }[];

    const total = user.submissions.length;
    const successContribution: successContributionType = user.submissions
    .filter(submission => submission.status === 'COMPLETED' || submission.status === "SHORTLISTED");

    return (
        <main className="flex justify-center">
        <div className="flex flex-col border rounded-lg h-full w-full max-w-[1536px] lg:mx-20 lg:my-10">
            <CandidateIntro
                id={user.id}
                name={user.name}
                location={user.region}
                emailVerified={user.emailVerified}
                joinedAt={user.createdAt}
                github={user.github}
            />
            <div className="flex flex-col h-full md:flex-row">
                <div className="md:border-r xl:min-w-[25rem]">
                    <div className="flex justify-between gap-2 p-5 text-center md:px-2 md:border-b lg:px-5 lg:py-8">
                        <div>
                            <h3 className="text-lg font-bold">{ total }</h3>
                            <p className="text-xs text-wrap lg:text-sm">Total<br className="xl:hidden"/> Contributions</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{ user.points }</h3>
                            <p className="text-xs text-wrap lg:text-sm">Points</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{successContribution.length}</h3>
                            <p className="text-xs text-wrap lg:text-sm">Success<br className="xl:hidden"/> Contributions</p>
                        </div>
                    </div>
                    <div className="space-y-5 px-5 py-5 lg:px-10">
                        <h2 className="text-lg lg:text-xl">Accounts</h2>
                        <div className="space-y-5">
                            {user.github && (
                                <AccountCard
                                    icon={<Github size={20} />}
                                    title={"GitHub"}
                                    link={user.github}
                                />
                            )}
                            {user.website && (
                                <AccountCard
                                    icon={<Globe size={20} />}
                                    title={"Portfolio"}
                                    link={user.website}
                                />
                            )}
                            {user.linkedin && (
                                <AccountCard
                                    icon={<Linkedin size={20} />}
                                    title={"Linkedin"}
                                    link={user.linkedin}
                                />
                            )}
                            {user.email && (
                                <AccountCard
                                    icon={<Mail className="h-18 w-18" size={20} />}
                                    title={"Email"}
                                    link={`mailto:${user.email}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    {user.bio && (
                        <div className="space-y-4 p-5 border-b md:p-10">
                            <h2 className="text-lg md:text-xl">About:</h2>
                            <p className="leading-6 md:leading-7">
                                {user.bio}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col gap-5 p-5 md:p-10">
                        <div className="flex items-center gap-2">
                            <History className="h-18 w-18" />
                            <h2 className="text-lg md:text-2xl">Contribution History:</h2>
                        </div>
                        <Tabs defaultValue="allContributions">
                            <TabsList className="mb-3">
                                <TabsTrigger value="allContributions">All Contributions</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="allContributions">
                                {user.submissions.length > 0 ? (
                                    user.submissions.map(submission => (
                                        <ContributionCard 
                                            key={submission.id}
                                            title={submission.project.title} 
                                            star={submission.star}
                                            postedOn={submission.createdAt}
                                            updatedOn={submission.updateAt}
                                            remark={submission.remark}
                                            status={submission.status}
                                        />
                                    ))) : (
                                        <div className="flex justify-center pt-5">
                                            <h3 className="text-lg font-bold">No contribution found!</h3>
                                        </div>
                                    )}
                            </TabsContent>
                            <TabsContent value="completed">
                                {successContribution.length > 0 ? (
                                    successContribution.map(submission => (
                                        <ContributionCard 
                                            key={submission.id}
                                            title={submission.project.title} 
                                            star={submission.star}
                                            postedOn={submission.createdAt}
                                            updatedOn={submission.updateAt}
                                            remark={submission.remark}
                                            status={submission.status}
                                        />
                                    ))
                                ) : (
                                    <div className="flex justify-center pt-5">
                                        <h3 className="text-lg font-bold">No contribution found!</h3>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

const AccountCard = ({ icon, title, link } : { icon: JSX.Element; title: string; link: string }) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary md:flex-col md:items-start md:gap-2 lg:p-5">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-lg lg:text-xl lg:font-medium">{title}</h3>
            </div>
            <Link href={link} className="flex items-center gap-2">
                <Link2 size={18} />
                <p className="text-sm underline lg:text-base">View link</p>
            </Link>
        </div>
    )
}

const ContributionCard = ({ title, star, postedOn, updatedOn, remark, status }: {
    title: string,
    star: number,
    postedOn: Date,
    updatedOn: Date,
    remark: string | null,
    status: string,
}) => {
    return (
        <div className="space-y-5 p-1 py-2 border-b rounded-lg hover:bg-secondary md:px-2 md:py-5">
            <div className="space-y-2">
                <h1 className="text-lg lg:text-xl">{title}</h1>
                <div className="flex items-center text-sm gap-5">
                    {star > 0 && (
                        <>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: star }, (_, index) => (
                                <Star size={18} fill="#e6b800" strokeWidth={0} key={index} />
                            ))}
                        </div>
                        <p>|</p>
                        </>
                    )}
                    <p><span>{`${postedOn.getDate()}/${(postedOn.getMonth() + 1)}/${postedOn.getFullYear()}`}</span> - <span>{status === "PENDING" ? "Present" : `${updatedOn.getDate()}/${(updatedOn.getMonth() + 1)}/${updatedOn.getFullYear()}`}</span></p>
                </div>
            </div>
            {remark && (<p>{remark}</p>)}
            <p className={`inline-block p-2 text-sm border-2 rounded-full lg:text-base ${status === "COMPLETED" ? "border-green-500" : status === "SHORTLISTED" ? "border-blue-500" : status === "PENDING" ? "border-yellow-500" : "border-red-500"} `}>{status}</p>
        </div>
    )
}