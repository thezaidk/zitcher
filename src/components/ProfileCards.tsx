import Link from "next/link";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type ProfileCardsProps = {
    id: string;
    name: string;
    bio: string | null;
    role: string;
    total: number;
    active: {
        id: string;
        name: string;
    }[];
}

export default async function ProfileCards({ user }: { user: ProfileCardsProps }) {
    const { active }= user;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg overflow-hidden bg-secondary lg:p-5">
                <div className="flex justify-center items-center text-gray-800 font-bold rounded-full bg-gray-200 cursor-pointer h-10 w-10 lg:text-xl lg:h-16 lg:w-16">
                    {user?.name && user?.name[0].toUpperCase()}
                </div>
                <div>
                    <Link href={`/${user.role.toLowerCase()}/profile`}><h1 className="text-xs font-bold underline md:text-base">{user?.name.slice(0, 15)}</h1></Link>
                    <p className="text-xs lg:text-sm">{user?.bio?.slice(0, 25)}</p>
                </div>
            </div>

            <div className="flex p-3 rounded-lg bg-secondary overflow-hidden lg:p-5">
                <p className="font-medium">
                    {user.role === "CANDIDATE" ? ("Total Contributions:") : ("Total Projects:")}<Link href={`/${user.role.toLowerCase()}/${user.role === "CANDIDATE" ? "contributions" : "projects"}`}><span className="font-bold pl-2 hover:underline">{user.total}</span></Link>
                </p>
            </div>

            <div className="p-3 rounded-lg bg-secondary lg:p-5">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="lg:text-lg">{user.role === "CANDIDATE" ? "Active Contributions" : "Active Projects"}</AccordionTrigger>
                        <AccordionContent>
                            <ul>
                                {active && active.length > 0 ? (
                                    active.map((i, index) => (
                                        <li
                                            key={index}
                                            className="p-2 rounded underline hover:bg-background"
                                        >
                                            <Link href={`/candidate/contribution/${i.id}`}>
                                                <p className="truncate text-ellipsis hover:overflow-visible hover:whitespace-normal hover:text-clip">
                                                    {i.name}
                                                </p>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>{user.role === "CANDIDATE" ? ("No active contributions found.") : ("No active project found.")}</li>
                                )}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
