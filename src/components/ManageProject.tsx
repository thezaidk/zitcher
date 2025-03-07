"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SquareChartGantt } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectSchemaType } from "@/lib/validators/project.validator";
import { useToast } from "@/hooks/use-toast";

import { createProject, updateProject } from "@/actions/Projects";

import SelectTech from "@/components/SelectTech";
import DatePicker from "@/components/DatePicker";
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type ManageProjectProps = {
    id?: string,
    title?:  string,
    description?: string,
    codeLink?: string | null,
    deadline?: Date | null,
    star?: number,
    bounty?: number | null,
    difficulty?: "EASY" | "INTERMEDIATE" | "HARD",
    status?: "ONGOING" | "CLOSED",
    technologies?: {
        id: string;
        name: string;
    }[],
    allTechnologies: {
        id: string;
        name: string;
    }[],
    createNew: boolean
}

export default function ManageProject({
    id, title, description, codeLink, deadline, bounty, difficulty, status, technologies, allTechnologies, createNew
}: ManageProjectProps) {
    const { toast } = useToast();
    const router = useRouter();

    const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set(technologies?.map(t => t.id)));

    const form = useForm<ProjectSchemaType>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: title,
            description: description,
            codeLink: codeLink || undefined,
            deadline: deadline || undefined,
            bounty: bounty || undefined,
            difficulty: difficulty,
            status: status,
            technologies: technologies?.map(t => t.id),
        },
    });

    async function submissionHandler(data: ProjectSchemaType) {
        const techArray = Array.from(selectedTech);
        const formData = { ...data, technologies: techArray };

        if(createNew) {
            const { success, message, newProject } = await createProject(formData);

            if(success && newProject){
                toast({ description: message });
                router.push(`/recruiter/project/${newProject.id}`);
            }else{
                toast({ description: message, variant: "destructive" })
            }

        } else {
            if (!id) {
                toast({ description: "Project ID is missing.", variant: "destructive" });
                return;
            }

            const { success, message } = await updateProject(id, formData);
            if(success){
                toast({ description: message });
            }else{
                toast({ description: message, variant: "destructive" })
            }
        }
    }

    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(submissionHandler)}
            className="space-y-6 w-full"
        >
        <div className="flex flex-col p-5 gap-10 border-b lg:flex-row">
            <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-2 mb-3">
                    <h1 className="text-2xl font-semibold">{createNew ? "Create Project" : "Manage Project"}</h1>
                    <SquareChartGantt />
                </div>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                                <TextEditor 
                                    text={field.value} 
                                    setText={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="codeLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code Link</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="github.com/..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-2">
                                    <FormLabel>Deadline</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value} 
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bounty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bounty</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <FormControl>
                                    <Select 
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EASY">Easy</SelectItem>
                                            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                            <SelectItem value="HARD">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="flex flex-col gap-2">
                            <h4>Technologies:</h4>
                            <div className="flex gap-5">
                                <SelectTech
                                    options={allTechnologies}
                                    selectedTech={selectedTech}
                                    onSelectionChange={setSelectedTech}
                                />
                                <div className="flex flex-wrap gap-3 p-3 border rounded-lg w-[20rem]">
                                    {selectedTech.size ?
                                        Array.from(selectedTech).map((techId) => {
                                            const techName = allTechnologies.find((tech) => tech.id === techId)?.name || techId; // Find name by ID
                                            return (
                                                <h3 key={techId} className="text-sm p-2 rounded-lg bg-secondary">
                                                    {techName}
                                                </h3>
                                            );
                                        }) : (
                                            <div>
                                                <p className="text-xs text-muted-foreground">Empty, select the tech stack</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select 
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ONGOING">Ongoing</SelectItem>
                                                <SelectItem value="CLOSED">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                </div>
            </div>
            <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className=""
            >
                {form.formState.isSubmitting ? 'Please wait...' : createNew ? 'Create project' : 'Save changes' }
            </Button>
        </div>
        </form>
    </Form>
    )
}