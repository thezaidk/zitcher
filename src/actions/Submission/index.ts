"use server"

import { authOptions } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getSubmission = async (submissionId: string) => {
    try{
        const submission = await prisma.submission.findUnique({
            where: {
                id: submissionId
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                    }
                },
                candidate: {
                    select: {
                        name: true,
                    }
                }
            }
        })
    
        if (!submission) {
            throw new Error("Submission not found!");
        }
    
        return {
            success: true,
            message: "Successfully fetched the submission.",
            submission: submission
        }
    }catch (error: unknown) {
        console.error("Error fetching project:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        };
    }
}

export const getSubmissionsByUser = async (userId: string) => {
    const submissions = await prisma.submission.findMany({
        where: {
            candidateId: userId
        },
        include: {
            project: {
                include: {
                    technologies: true,
                    recruiter: true,
                }
            }
            
        }
    })

    if(!submissions || submissions.length <= 0) {
        return { 
            message: 'No submission found.'
        }
    }

    return {
        message: 'Successfully retrieved data.',
        submissions,
    }
}

export const getSubmissionsByProject = async (projectId: string) => {
    const submissions = await prisma.submission.findMany({
        where: {
            projectId: projectId,
        },
        include: {
            candidate: {
                select: {
                    name: true,
                }
            }
        }
    })

    if(!submissions || submissions.length <= 0) {
        return { 
            success: false,
            message: 'No submission found.',
        }
    }

    return {
        success: true,
        message: 'Successfully retrieved data.',
        submissions,
    }
}

export const getActiveSubmission = async (userId: string) => {
    const activeSubmissions = await prisma.submission.findMany({
        where: {
            candidateId: userId,
            status: "PENDING",
        },
        include: {
            project: {
                include: {
                    technologies: true,
                    recruiter: true,
                }
            }
            
        }
    })

    if(!activeSubmissions || activeSubmissions.length <= 0)
        return {
            message: "No active contribution found."
        }
    
    return {
        message: 'Successfully retrieved data.',
        activeSubmissions,
    }
}

type submitContributionProps = {
    title: string,
    projectId: string,
    link: string,
    description?: string,
}

export const submitContribution = async ({ title, projectId, link, description } : submitContributionProps ) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: 'Unauthorized or insufficient permissions' };
    }

    const submission = await prisma.submission.create({
        data: {
            title: title,
            candidateId: session.user.id,
            projectId: projectId,
            link: link,
            description: description,
        }
    })

    if(!submission)
        return {
            message: "Submission failed!"
        }
    
    return {
        message: 'Successfully submited the contribution.',
        data: submission,
    }
}

type updateSubmissionProps = {
    id: string;
    remark: string | undefined;
    status: "PENDING" | "COMPLETED" | "SHORTLISTED" | "REJECTED";
    star: number | undefined;
}

export const updateSubmission = async ({ id, remark, status, star}: updateSubmissionProps) => {
    try{
        const submission = await prisma.submission.update({
            where: { id: id },
            data: {
                remark: remark,
                status: status,
                star: star,
            }
        })

        if(status === "COMPLETED" || status === "SHORTLISTED"){
            await prisma.user.update({
                where: {
                    id: submission.candidateId,
                },
                data: {
                    points: {
                        increment: status === "COMPLETED" ? 2 : 4
                    }
                }
            })
        }

        return {
            success: true,
            message: "Successfully update the submission."
        }
    }catch(error: unknown) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update the submission!"
        }
    }
}