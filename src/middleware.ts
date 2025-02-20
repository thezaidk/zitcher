import {
    DEFAULT_LOGIN_REDIRECT_CANDIDATE,
    DEFAULT_LOGIN_REDIRECT_RECRUITER,
    authRoutes,
    publicRoutes
} from "@/config/path.config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    const { pathname } = new URL(req.url);
    const isPublicRoute= publicRoutes.includes(pathname);
    const isAuthRoute= authRoutes.includes(pathname);
    const isSelectRolePage = pathname.startsWith("/auth/select-role");
    
    if(isAuthRoute) {
        if(token) {
            if(token.role === "CANDIDATE"){
                return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_CANDIDATE, req.url));
            }else if(token.role === "RECRUITER"){
                return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_RECRUITER, req.url));
            }
        }

        if(token === null && isSelectRolePage) {
            return NextResponse.next();
        }

        return;
    }

    if(!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    
    if(token && token.role === "CANDIDATE" && pathname.startsWith("/recruiter")){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_CANDIDATE, req.url));
    }

    if(token && token.role === "RECRUITER" && pathname.startsWith("/candidate")){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_RECRUITER, req.url));
    }

    return;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};