"use server"

import prisma from "@/lib/prisma";
import { oauthSignUpSchema, oauthSignUpSchemaType, SignupSchema, SignupSchemaType } from "@/lib/validators/auth.validator";
import { OauthProvider } from "@prisma/client";
import bcrypt from 'bcryptjs';

export const signUp = async (data: SignupSchemaType) => {
    const validatedFields = SignupSchema.safeParse(data);
    if (!validatedFields.success) {
        return { status: false, message: "Invalid fields!"};
    }
    
    const { name, email, password, role } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
        where: { email: email }
    });

    if(existingUser) {
        return { status: false, message: "User with this email already exist"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role
            }
        })
    } catch {
        return { status: false, message: "Registration Failed, please try again!"}
    }

    return { status: true, message: "User created!" }
}

export const oauthSignUp = async (data: oauthSignUpSchemaType) => {
    const validatedFields = oauthSignUpSchema.safeParse(data);
    if (!validatedFields.success) {
        return { status: false, message: "Invalid fields!"};
    }

    const { name, email, role, oauthId, oauthProvider } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
        where: { email: email }
    });

    if(existingUser) {
        return { status: false, message: "User with this email already exist"};
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                oauthId,
                oauthProvider: oauthProvider as OauthProvider,
            }
        })

        return { status: true, message: "User created!", user: newUser }
    } catch {
        return { status: false, message: "Signup failed, please try again!" };
    }
}

export const isUser = async (email: string, oauthId: string) => {
    const user = await prisma.user.findUnique({
        where: {
          email: email,
          oauthId: oauthId,
        }
      })

      if(!user) {
        return {
            success: false,
            message: "User not found!"
        }
      }

      return {
        success: true,
        message: "User exist.",
        user: user,
      };
}

export const updateRole = async (email: string, oauthId: string, role: "CANDIDATE" | "RECRUITER") => {
    const updatedUser = await prisma.user.update({
        where: {
          email: email,
          oauthId: oauthId,
        },
        data: {
          role: role
        }
    })

    if(!updatedUser) {
        return {
            success: false,
            message: "Failed to update the user role!",
        }
    }

    return {
        success: true,
        message: "Successfully update the user role.",
        user: updatedUser,
    }
}