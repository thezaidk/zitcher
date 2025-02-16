import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextAuthOptions } from 'next-auth';

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials) {
            throw new Error("No credentials provided.");
          }
  
          const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
    
            if (!user) {
              throw new Error('No user found with this email');
            }
  
            if (!user.password) {
              throw new Error('User does not have a password, please sign in using OAuth.');
            }
    
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    
            if (!isPasswordCorrect) {
              throw new Error('Incorrect password');
            }
    
            return { 
              id: user.id, 
              email: user.email,
              name: user.name,
              role: user.role,
          };
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async signIn({ user, account }) {
          if (account?.provider === 'google' || account?.provider === 'github') {
            const { email, name, id: oauthId } = user;
            console.log("user:", user);

            const existingUser = await prisma.user.findFirst({
              where: { 
                OR: [{email: email}, {oauthId: oauthId}]
              },
            });
            console.log("existing user:", existingUser);
            if (!existingUser) {
              await prisma.user.create({
                data: {
                  email: email,
                  name: name ?? "",
                  role: "UNASSIGNED",
                  oauthId: oauthId,
                  oauthProvider: account?.provider === "google" ? "GOOGLE" : "GITHUB",
                  emailVerified: new Date(),
                }
              })
              console.log("new user created")
              const redirectUrl = `/auth/select-role?email=${encodeURIComponent(email as string)}&oauthId=${encodeURIComponent(oauthId as string)}`;
              return redirectUrl;
            } else {
              user.role = existingUser.role;
              user.id= existingUser.id;
            }
          }
          
          return true
        },
        async jwt({ token, user }) {
            if (user && user.role) {
              token.id = user.id;
              token.role= user.role;
            }
            
            return token;
        },
        async session({ session, token }) {  
            if (session.user && token.sub) {
              session.user.id = token.sub as string;
              session.user.role= token.role as string;
            }
            
            return session;
        },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error'
    },
} satisfies NextAuthOptions