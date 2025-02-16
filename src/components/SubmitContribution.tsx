import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmissionSchema, SubmissionSchemaType } from "@/lib/validators/submission.validator";
import { submitContribution } from "@/actions/Submission";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function SubmitContribution({ projectId}: { projectId:string }) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<SubmissionSchemaType>({
        resolver: zodResolver(SubmissionSchema),
    });

    async function submissionHandler(data: SubmissionSchemaType) {
        try {
            const response = await submitContribution({projectId, title: data.title, link: data.link, description: data.description});
            if(!response.data) {
                toast({
                    title: response.message || 'Something went wrong',
                    variant: 'destructive'
                });
            } else {
                toast({
                    title: response.message || 'Submitted successfully!'
                })
                router.push(`/candidate/contribution/${response.data.id}`);
            }
        } catch {
            toast({
                title: 'something went wrong',
                variant: 'destructive',
            })
        }
    }

    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full rounded-xl flex gap-1"
                    variant={"outline"}
                >Submit<span className="hidden sm:block">Contribution</span></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Submit Contribution</DialogTitle>
                <DialogDescription>
                    Submit your code to get hired.
                </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(submissionHandler)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="added Navbar to the project..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="github.com/..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="write about submission..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full h-10"
                    >
                        {form.formState.isSubmitting ? 'Please wait...' : 'Submit contribution' }
                    </Button>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
        </>
    )
}