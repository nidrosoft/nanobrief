"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider defaultTheme="light" disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    );
};

export default Providers;
