import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";

const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/Satoshi-Light.woff2",
            weight: "300",
        },
        {
            path: "../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
        },
        {
            path: "../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
        },
        {
            path: "../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-satoshi",
});

export const metadata: Metadata = {
    title: {
        default: "NanoBrief - AI-Powered Brief Generator",
        template: "%s | NanoBrief",
    },
    description: "Create professional project briefs in minutes with AI. NanoBrief helps marketers, designers, and agencies generate comprehensive briefs that capture every detail.",
    keywords: ["brief generator", "AI brief", "project brief", "creative brief", "marketing brief", "design brief", "agency tools", "AI assistant"],
    authors: [{ name: "NanoBrief" }],
    creator: "NanoBrief",
    publisher: "NanoBrief",
    metadataBase: new URL("https://nanobrief.com"),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nanobrief.com",
        siteName: "NanoBrief",
        title: "NanoBrief - AI-Powered Brief Generator",
        description: "Create professional project briefs in minutes with AI. Stop wasting hours on documentation—let AI capture every detail for you.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "NanoBrief - AI-Powered Brief Generator",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NanoBrief - AI-Powered Brief Generator",
        description: "Create professional project briefs in minutes with AI. Stop wasting hours on documentation—let AI capture every detail for you.",
        images: ["/twitter-card.png"],
        creator: "@nanobrief",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </head>
            <body
                className={`${satoshi.variable} bg-b-surface1 font-satoshi text-[1rem] text-t-primary antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
