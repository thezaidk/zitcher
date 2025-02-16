"use client"

import Link from "next/link";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UpdateSubmissionSchema, UpdateSubmissionSchemaType } from "@/lib/validators/submission.validator";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateSubmission } from "@/actions/Submission";

import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";

type SubmissionCardProps = {
    id: string;
    title: string | null;
    candidateId: string;
    candidateName: string;
    createdAt: Date;
    link: string;
    description: string | null;
    remark: string | null;
    status: "PENDING" | "COMPLETED" | "SHORTLISTED" | "REJECTED";
    star: number;
    bounty: number | null;
    paidAt: Date | null;
    fetchSubmissions: () => void;
}

export default function SubmissionCard(Submission: SubmissionCardProps) {
    const { toast } = useToast();

    const form = useForm<UpdateSubmissionSchemaType>({
        resolver: zodResolver(UpdateSubmissionSchema),
        defaultValues: {
            remark: Submission.remark || undefined,
            status: Submission.status || undefined,
            star: Submission.star || undefined,
        },
    });

    async function submissionHandler(data: UpdateSubmissionSchemaType) {
        const { success, message } = await updateSubmission({
            id: Submission.id, 
            remark: data.remark, 
            status: data.status, 
            star: data.star
        })

        if(success) {
            toast({
                title: message,
            })
        }else {
            toast({
                title: message,
                variant: "destructive"
            })
        }

        Submission.fetchSubmissions();
    }

    return (
        <Accordion type="single" className="px-3 border-b rounded-lg" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                    <div className="pr-2 w-full lg:pr-8">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-lg font-medium">{Submission.title}</h1>
                            <div className="flex items-center gap-3">
                                <p className="text-xs">Contributer: <Link href={`/recruiter/candidate/${Submission.candidateId}`} className="hover:underline">{Submission.candidateName}</Link></p>
                                <p className="text-xs text-muted-foreground">{`${Submission.createdAt.getDate()}-${(Submission.createdAt.getMonth() + 1)}-${Submission.createdAt.getFullYear()}`}</p>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2 px-1">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">Submission Link:</p>
                                <Link href={Submission.link} className="underline">{Submission.link}</Link>
                            </div>
                            {Submission.description && (
                                <div className="space-y-1">
                                    <p className="font-medium">Description:</p>
                                    <div>{Submission.description}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Separator className="mb-2" />

                            <Form {...form}>
                                <form 
                                    onSubmit={form.handleSubmit(submissionHandler)}
                                    className="space-y-6 w-full"
                                >
                                    <div className="space-y-1 px-1">
                                        <FormField
                                            control={form.control}
                                            name="remark"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Remark:</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                                        <div className="flex items-center gap-5">
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem className={`${field.value === "PENDING" ? "text-yellow-500" : field.value === "REJECTED" ? "text-red-500" : "text-green-500"}`}>
                                                        <FormControl>
                                                            <Select 
                                                                defaultValue={Submission.status}
                                                                onValueChange={(value) => field.onChange(value)}
                                                            >
                                                                <SelectTrigger className="space-x-1 max-w-[180px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                                                    <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                                                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="star"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-medium">Stars:</FormLabel>
                                                            <div className="flex items-center gap-1">
                                                                {Array.from({ length: 5 }, (_, index) => (
                                                                    <Star
                                                                        key={index}
                                                                        size={18}
                                                                        strokeWidth={0.5}
                                                                        style={{
                                                                            fill: index < (field.value ?? 0) ? "gold" : "none",
                                                                        }}
                                                                        onClick={() => {
                                                                            if((index+1) === field.value)
                                                                                form.setValue("star", 0)
                                                                            else
                                                                                form.setValue("star", index + 1)
                                                                        }}
                                                                        className="cursor-pointer"
                                                                    />
                                                                ))}
                                                            </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => toast({title:"This bounty feature is under development!"})}
                                        >
                                            Pay Bounty
                                        </Button>
                                    </div>
                                    <Button className="max-w-[180px]">Update submission</Button>
                                </form>
                            </Form>
                        </div>     
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}