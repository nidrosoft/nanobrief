"use client";

import Link from "next/link";
import Image from "@/components/Image";
import ThemeButton from "@/components/ThemeButton";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-b-surface1">
            {/* Minimal header with logo */}
            <header className="relative z-50 flex items-center justify-center p-5 max-md:p-4">
                <Link href="/">
                    <Image
                        className="w-33.75 opacity-100 dark:hidden!"
                        src="/images/logo-dark.svg"
                        width={135}
                        height={36}
                        alt="NanoBrief"
                    />
                    <Image
                        className="hidden! w-33.75 opacity-100 dark:block!"
                        src="/images/logo-light.svg"
                        width={135}
                        height={36}
                        alt="NanoBrief"
                    />
                </Link>
            </header>

            {/* Main content */}
            <main className="grow flex items-center justify-center px-6 py-12">
                {children}
            </main>

            {/* Theme toggle */}
            <ThemeButton className="fixed! left-5 bottom-5 z-5" />
        </div>
    );
}
