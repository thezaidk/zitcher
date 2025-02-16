import { z } from 'zod';

export const SubmissionSchema = z.object({
    title: z.string().min(1, "title is required"),
    link: z.string().min(1, "link is required"),
    description: z.string().optional(),
});

export type SubmissionSchemaType = z.infer<typeof SubmissionSchema>;

export const UpdateSubmissionSchema = z.object({
    remark: z.string().optional(),
    status: z.enum(["PENDING", "COMPLETED", "SHORTLISTED", "REJECTED"]),
    star: z.number().optional(),
})

export type UpdateSubmissionSchemaType = z.infer<typeof UpdateSubmissionSchema>;