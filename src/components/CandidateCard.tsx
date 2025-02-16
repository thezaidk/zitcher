import { BadgeCheck, CircleCheck } from "lucide-react";
import Link from "next/link";

type CandidateCardProps = {
    id: string;
    name: string;
    bio: string | null;
    points: number;
    emailVerified: Date | null;
    _count: {
        submissions: number;
    };
};

export default function CandidateCard({ candidate } : { candidate: CandidateCardProps}) {

    return (
        <Link href={`/recruiter/candidate/${candidate.id}`} className="col-span-6 md:col-span-3 w-full border-2 p-5 rounded-lg hover:bg-secondary">
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex gap-5">
                    <h1 className="text-xl">{candidate.name}</h1>
                    {candidate.emailVerified && (
                        <div className="flex items-center gap-1">
                            <BadgeCheck size={18} />
                            <p className="text-sm">verified candidate</p>
                        </div>
                    )}
                </div>
                <p className="text-sm">{candidate.bio && candidate.bio.length>125 ? `${candidate.bio?.slice(0,125)}...` : candidate.bio}</p>
            </div>
            <div className="space-y-1">
                <p>No of contributions: <span>{candidate._count.submissions}</span></p>
                <div className="flex items-center gap-2">
                    <CircleCheck size={18} fill="green"  />
                    <p>Points: <span>{candidate.points}</span></p>
                </div>
            </div>
        </div>
        </Link>
    )
}