"use server"

import { authOptions } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { ProjectSchemaType } from "@/lib/validators/project.validator";
import { getServerSession } from "next-auth";

export const getProject = async (projectId: string) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return {
            message: "Unauthorized request",
            success: false
        };
    }

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                recruiter: {
                    select: {
                        name: true,
                        bio: true,
                        email: true,
                        emailVerified: true,
                        region: true,
                    },
                },
                technologies: true,
                _count: {
                    select: {
                        submissions: true,
                        pinnedByUsers: true,
                    },
                },
                pinnedByUsers: {
                    where: { id: session.user.id },
                    select: {
                        id: true
                    }
                }
            },
        });
  
        if (!project) {
            throw new Error("Project not found");
        }
  
        const recruiterProjectCount = await prisma.project.count({
            where: {
                recruiterId: project.recruiterId,
            },
        });

        return {
            success: true,
            project: {
                ...project,
                recruiter: {
                    ...project.recruiter,
                    projectCount: recruiterProjectCount,
                },
            },
        };
    
    } catch (error: unknown) {
      console.error("Error fetching project:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong!, try again later."
      };
    }
};

export const getProjects = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return {
            message: "Unauthorized request",
            success: false
        };
    }
    
    const projects = await prisma.project.findMany({
        where: {
            status: "ONGOING"
        },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            technologies: {
                select: {
                    id: true,
                    name: true
                }
            },
            recruiter: {
                select: {
                    id: true,
                    region: true,
                    emailVerified: true,
                }
            },
            pinnedByUsers: {
                where: {
                    id: session.user.id
                },
                select: {
                    id: true
                }
            },
            _count: {
                select: {
                    pinnedByUsers: true,
                    submissions: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    if (!projects || projects.length <= 0) {
        return {
            success: false,
            message: 'No project found.',
        };
    }

    return {
        success: true,
        message: 'Successfully retrieved data.',
        data: projects,
    };
};

export const getPinProjects = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return {
            message: "Unauthorized request",
            success: false
        };
    }

    const userId = session.user.id;

    try {
        const projects = await prisma.project.findMany({
            where: {
                pinnedByUsers: {
                    some: {
                        id: userId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                technologies: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                recruiter: {
                    select: {
                        id: true,
                        region: true,
                        emailVerified: true,
                    }
                },
                _count: {
                    select: {
                        pinnedByUsers: true,
                        submissions: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!projects || projects.length <= 0) {
            return {
                message: "No projects found.",
                success: false
            };
        }

        return {
            message: "Successfully retrieved data.",
            success: true,
            data: projects
        };
    } catch (error) {
        console.error("Error retrieving pinned projects:", error);
        return {
            message: "An error occurred while fetching pinned projects.",
            success: false
        };
    }
};

export const getRecruiterProjects = async (userId: string) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                recruiterId: userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                status: true,
                technologies: true,
                recruiter: {
                    select: {
                        region: true,
                    }
                },
                _count: {
                    select: {
                        submissions: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        if(!projects){
            throw new Error("There are no active projects!");
        }

        return {
            message: "Successfully fetch the active projects.",
            projects
        }

    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const getActiveProjects = async (userId: string) => {
    try {
        const activeProjects = await prisma.project.findMany({
            where: {
                recruiterId: userId,
                status: "ONGOING"
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                status: true,
                recruiter: {
                    select: {region: true,}
                },
                technologies: true,
                _count: {
                    select: {
                        submissions: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        if(!activeProjects){
            throw new Error("There are no active projects!");
        }

        return {
            message: "Successfully fetch the active projects.",
            activeProjects
        }

    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Something went wrong!, try again later."
        }
    }
}

export const getAllTechnologies = async () => {
    const allTechnologies = await prisma.technology.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    return allTechnologies;
}

export const togglePinProject = async (projectId: string) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return {
            message: "Unauthorized request",
            success: false,
        };
    }

    const userId = session.user.id;
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { pinnedProjects: { select: { id: true } } },
        });

        if (!user) {
            return {
                message: "User not found",
                success: false,
            };
        }

        const isPinned = user.pinnedProjects.some((project) => project.id === projectId);

        await prisma.user.update({
            where: { id: userId },
            data: {
                pinnedProjects: isPinned
                    ? { disconnect: { id: projectId } }
                    : { connect: { id: projectId } },
            },
        });

        return {
            message: isPinned ? "Project unpinned successfully!" : "Project pinned successfully!",
            success: true,
        };
    } catch (error) {
        console.error("Error toggling pin status:", error);
        return {
            message: "Failed to toggle pin status!",
            success: false,
        };
    }
};


export const createProject= async (
    project: ProjectSchemaType
) => {
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            return {
                message: "Unauthorized request",
                success: false
            }
        }

        const recruiterId = session.user.id;

        const newProject = await prisma.project.create({
            data: {
                recruiterId: recruiterId,
                title: project.title,
                description: project.description,
                codeLink: project.codeLink,
                deadline: project.deadline,
                bounty: project.bounty,
                difficulty: project.difficulty,
                technologies: {
                    connect: project.technologies?.map(techId => ({id: techId}))
                },
            }
        })

        return {
            message: "Project created successfully.",
            success: true,
            newProject,
        }
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Failed to create project. Please try again later.",
            success: false,
        }
    }
}

export const updateProject= async (
    projectId: string, 
    project: ProjectSchemaType
) => {
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            return {
                message: "Unauthorized request",
                success: false
            }
        }

        const recruiterId = session.user.id;

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
                recruiterId: recruiterId,
            },
            data: {
                title: project.title,
                description: project.description,
                codeLink: project.codeLink,
                deadline: project.deadline,
                bounty: project.bounty,
                difficulty: project.difficulty,
                status: project.status,
                technologies: {
                    set: [],
                    connect: project.technologies?.map(techId => ({id: techId}))
                },
            },
        })

        return {
            message: "Project updated successfully.",
            success: true,
            updatedProject,
        }
    } catch (error: unknown) {
        return {
            message: error instanceof Error ? error.message : "Failed to update project. Please try again later.",
            success: false,
        }
    }
}