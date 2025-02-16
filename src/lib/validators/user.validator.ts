import { z } from "zod"

export const CandidateProfileSchema = z.object({
  name : z.string().min(2).max(50),
  bio: z.string().optional(),
  upiId: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  region: z.string().optional(),
})

export type CandidateProfileSchemaType = z.infer<typeof CandidateProfileSchema>;

export const RecruiterProfileSchema = z.object({
    name : z.string().min(2).max(50),
    bio: z.string().optional(),
    upiId: z.string().optional(),
    linkedin: z.string().optional(),
    region: z.string().optional(),
})
  
export type RecruiterProfileSchemaType = z.infer<typeof RecruiterProfileSchema>;