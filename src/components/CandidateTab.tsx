"use client"

import { useEffect, useState } from "react";

import { getCandidates, getPinCandidates } from "@/actions/User";

import { Spinner } from "@/components/Spinner";
import CandidateCard from "@/components/CandidateCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CandidateType = {
    id: string;
    name: string;
    bio: string | null;
    points: number;
    emailVerified: Date | null;
    _count: {
        submissions: number;
    };
}

export default function CandidateTab() {
    const [allCandidates, setAllCandidates] = useState<CandidateType[]>([]);
    const [pinCandidates, setPinCandidates] = useState<CandidateType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { candidates }= await getCandidates();
                const { pinnedCandidates }= await getPinCandidates();
    
                setAllCandidates(candidates || []);
                setPinCandidates(pinnedCandidates || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    
    return (
        <div>
            <Tabs defaultValue="candidates" className="w-full">
                <TabsList className="mb-3">
                    <TabsTrigger value="candidates">Candidates</TabsTrigger>
                    <TabsTrigger value="pincandidates">Pin Candidates</TabsTrigger>
                </TabsList>
                <TabsContent value="candidates">
                    {loading ? (
                        <div className="flex justify-center items-center pt-5">
                            <Spinner size={"lg"} />
                        </div>
                    ) : allCandidates.length > 0 ? (
                        <div className="grid grid-cols-6 gap-5">
                            {allCandidates.map(candidate => (
                                <CandidateCard candidate={candidate} key={candidate.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center pt-5">
                            <h3 className="text-lg font-bold">No candidate found!</h3>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="pincandidates">
                    {loading ? (
                        <div className="flex justify-center items-center pt-5">
                            <Spinner size={"lg"} />
                        </div>
                    ) : pinCandidates.length > 0 ? (
                        <div className="grid grid-cols-6 gap-5">
                            {pinCandidates.map(candidate => (
                                <CandidateCard candidate={candidate} key={candidate.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center pt-5">
                            <h3 className="text-lg font-bold">No pinned candidate found!</h3>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}