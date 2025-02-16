import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

type ProviderProps = {
    children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider defaultOpen={false}>
                {children}
            </SidebarProvider>
        </ThemeProvider>
    )
}