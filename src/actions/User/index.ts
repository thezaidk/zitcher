"use server"

import { authOptions } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { CandidateProfileSchemaType, RecruiterProfileSchemaType } from "@/lib/validators/user.validator";
import { getServerSession } from "next-auth";

export const getCandidates = async () => {
    try {
        const candidates = await prisma.user.findMany({
            where: {
                role: "CANDIDATE"
            },
            select: {
                id: true,
                name: true,
                bio: true,
                points: true,
                emailVerified: true,
                _count: {
                    select: {
                        submissions: true,
                    }
                }
            }
        })

        if(!candidates){
            throw new Error("Candidates not found!")
        }

        return {
            message: "Successfully fetch the candidates.",
            candidates,
        }
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const getPinCandidates = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return { error: 'Unauthorized or insufficient permissions' };
    }

    try {
        const recruiter = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                role: "RECRUITER",
            },
            select: {
                pinnedCandidates: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                        points: true,
                        emailVerified: true,
                        _count: {
                            select: {
                                submissions: true,
                            }
                        }
                    }
                },
            }
        })

        if(!recruiter || recruiter.pinnedCandidates.length <= 0){
            throw new Error("Pinned candidates not found!")
        }

        return {
            message: "Successfully fetch the candidates.",
            pinnedCandidates: recruiter.pinnedCandidates,
        }
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later.",
        }
    }
}

export const getUser = async (userId : string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId }
        })
    
        if(!user) {
            return {
                success: false,
                message: 'User not found!',
            };
        }

        return {
            success: true,
            message: 'Successfully retrieved data.',
            user,
        }

    } catch (error: unknown) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const updateCandidate = async (userId: string, data: CandidateProfileSchemaType) => {
    try {
        const updatedCandidate = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: data.name,
                bio: data.bio,
                region: data.region,
                github: data.github,
                linkedin: data.linkedin,
                website: data.website,
                upiId: data.upiId,
            }
        });

        if(!updateCandidate) {
            return {
                success: false,
                message: "Couldn't able to update the candidate!"
            }
        }

        return {
            success: true,
            message: "Successfully updated the Candidate Details.",
            updatedCandidate
        }

    } catch (error: unknown) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const updateRecruiter = async (userId: string, data: RecruiterProfileSchemaType) => {
    try {
        const updatedRecruiter = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: data.name,
                bio: data.bio,
                region: data.region,
                linkedin: data.linkedin,
                upiId: data.upiId,
            }
        });

        if(!updatedRecruiter) {
            return {
                success: false,
                message: "Couldn't able to update the candidate!"
            }
        }

        return {
            success: true,
            message: "Successfully updated the Candidate Details.",
            updatedRecruiter,
        }
        
    } catch (error: unknown) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export async function getCandidate(userId: string) {
    try {
        const userDetails = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                submissions: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                        updateAt: true,
                        star: true,
                        status: true,
                        remark: true,
                        project: {
                            select: {
                                title: true,
                            }
                        }
                    }
                }
            }
        })
  
        if (!userDetails) {
            throw new Error('User not found');
        }

        return {
            message: "Successfully fetch the data.",
            user: userDetails,
        }
  
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export async function getRecruiter(userId: string) {
    try {
      const recruiterDetails = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          role: true,
          name: true,
          bio: true,
          projects: {
            select: {
              id: true,
              title: true,
              status: true
            }
          }
        }
      });
  
      if (!recruiterDetails) {
        throw new Error('Recruiter not found');
      }
  
      const total = recruiterDetails.projects.length;
      const active = recruiterDetails.projects
        .filter(project => project.status === 'ONGOING')
        .map(project => ({
          id: project.id,
          name: project.title
        }));
  
        return {
            message: "Successfully fetch the data.",
            user: {
                id: recruiterDetails.id,
                role: recruiterDetails.role,
                name: recruiterDetails.name,
                bio: recruiterDetails.bio,
                total,
                active,
            }
        };
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const togglePinCandidate = async (candidateId: string) => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return { error: 'Unauthorized or insufficient permissions' };
    }

    const recruiterId= session.user.id;

    try{
        const recruiter = await prisma.user.findUnique({
            where: { id: recruiterId },
            select: { pinnedCandidates: { select: { id: true } } },
        });

        if (!recruiter) {
            return {
                message: "User not found",
                success: false,
            };
        }

        const isPinned = recruiter.pinnedCandidates.some((c) => c.id === candidateId);

        await prisma.user.update({
            where: {
                id: recruiterId
            },
            data: {
                pinnedCandidates: isPinned 
                ? { disconnect: { id: candidateId }}
                : { connect: { id: candidateId } }
            }
        })

        return {
            message: isPinned ? "Successfully unpinned the candidate." : "Successfully pinned the candidate.",
            success: true,
        }
    } catch(error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later.",
            success: false,
        }
    }
}