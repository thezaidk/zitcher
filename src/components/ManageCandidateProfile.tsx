"use client"

import { useToast } from "@/hooks/use-toast";
import { CandidateProfileSchema, CandidateProfileSchemaType } from "@/lib/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateCandidate } from "@/actions/User";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserPen } from "lucide-react";

export default function ManageCandidateProfile ({userId, user}: {userId: string, user: CandidateProfileSchemaType}) {

    const { toast } = useToast();

    const form = useForm<CandidateProfileSchemaType>({
        resolver: zodResolver(CandidateProfileSchema),
        defaultValues: {
            name: user.name,
            bio: user.bio,
            region: user.region,
            website: user.website,
            github: user.github,
            linkedin: user.linkedin,
            upiId: user.upiId,
        }
    });

    async function submissionHandler(data: CandidateProfileSchemaType) {
        const {success, message, updatedCandidate} = await updateCandidate(userId, data);
        
        if(!success || !updatedCandidate) {
            toast({
                title: message || "Internal server error",
                variant: "destructive",
            });
        } else {
            toast({
                title: message,
            });
        }
    }

    return (
        <div className="flex justify-center">
            <div className="border rounded-lg w-full max-w-[1536px] lg:mx-20 lg:my-10">
                <Form {...form}>
                    <form
                        className="flex flex-col gap-10 p-5 w-full lg:flex-row"
                        onSubmit={form.handleSubmit(submissionHandler)}
                    > 
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex items-center gap-2 pb-5 border-b">
                                <UserPen />
                                <h1 className="text-2xl font-semibold">Manage Profile</h1>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Zaid Karigar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="I am a full stack developer..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem className="pb-5 border-b md:pb-10">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Pune, India" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>GitHub</FormLabel>
                                    <FormControl>
                                        <Input placeholder="www.github.com/the_zaid_k" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Linkedin</FormLabel>
                                    <FormControl>
                                        <Input placeholder="www.linkedin.com/the_zaid_k" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem className="pb-5 border-b md:pb-10">
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="www.zaidportfolio.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="upiId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>UPI ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="zaidkarigar03@ok_hdfc" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}