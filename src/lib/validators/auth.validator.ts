import { z } from "zod";

export const SigninSchema = z.object({
    email: z.string().email("Email is invalid").min(1, "Email is required"),
    password: z.string().min(1, 'Password is required')
});
export type SigninSchemaType = z.infer<typeof SigninSchema>;

export const SignupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is invalid").min(1, "Email is required"),
    role: z.enum(["CANDIDATE", "RECRUITER"], {
        errorMap: () => ({ message: "Role must be either Candidate or Recruiter" })
    }),
    password: z.string().min(6, "Password must be at least 6 characters long")
})
export type SignupSchemaType = z.infer<typeof SignupSchema>

export const oauthSignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is invalid").min(1, "Email is required"),
    role: z.enum(["CANDIDATE", "RECRUITER"], {
        errorMap: () => ({ message: "Role must be either Contributor or Recruiter" })
    }),
    oauthProvider: z.enum(["GOOGLE", "GITHUB"], {
        errorMap: () => ({ message: "oauth provider must be either Google or GitHub" })
    }),
    oauthId: z.string().min(1, "oauthId is required"),
})

export type oauthSignUpSchemaType = z.infer<typeof oauthSignUpSchema>