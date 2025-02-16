"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react"

import { Toaster } from "@/components/ui/toaster";

type ProviderProps = {
    children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
    return (
        <SessionProvider>
            {children}
            <Toaster />
        </SessionProvider>
    )
}