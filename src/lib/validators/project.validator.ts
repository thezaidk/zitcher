import { z } from 'zod';

export const ProjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    codeLink: z.string().optional(),
    deadline: z.date().optional(),
    bounty: z.preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value), // Convert string to number
        z.number().optional()
    ),
    difficulty: z.enum(["EASY", "INTERMEDIATE", "HARD"]),
    status: z.enum(["ONGOING", "CLOSED"]),
    technologies: z.array(z.string()).optional(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;