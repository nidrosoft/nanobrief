"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "@/components/Image";
import { Magicpen, RefreshCircle } from "iconsax-react";

const industryNames: Record<string, string> = {
    marketing: "Marketing & Advertising",
    design: "Design & Creative",
    video: "Video Production",
    content: "Content Marketing & SEO",
    events: "Event Planning",
    consulting: "Management Consulting",
    architecture: "Architecture & Construction",
    pr: "Public Relations",
    legal: "Legal Services",
    custom: "Custom",
};

export default function GeneratingPage() {
    const params = useParams();
    const router = useRouter();
    const industryId = params.industry as string;
    const [countdown, setCountdown] = useState(5);
    const [status, setStatus] = useState("Analyzing your responses...");

    const statuses = [
        "Analyzing your responses...",
        "Understanding project requirements...",
        "Structuring your brief...",
        "Adding industry best practices...",
        "Finalizing your brief...",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        router.push("/dashboard/briefs/new-brief");
                    }, 500);
                    return 1;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    useEffect(() => {
        const statusIndex = 5 - countdown;
        if (statusIndex >= 0 && statusIndex < statuses.length) {
            setStatus(statuses[statusIndex]);
        }
    }, [countdown]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none">
                <Image
                    className="w-full"
                    src="/images/quiz-gradient-1.png"
                    width={384}
                    height={384}
                    alt=""
                />
            </div>
            <div className="absolute bottom-0 left-0 w-96 h-96 opacity-30 pointer-events-none">
                <Image
                    className="w-full"
                    src="/images/quiz-gradient-2.png"
                    width={384}
                    height={384}
                    alt=""
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-lg">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary1/10 rounded-3xl">
                        <Magicpen size={40} variant="Bold" color="#2d68ff" className="animate-pulse" />
                    </div>
                    <h1 className="text-h1 mb-4">
                        Creating your {industryNames[industryId] || "project"} brief
                    </h1>
                    <p className="text-body-lg text-t-secondary mb-8">
                        {status}
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="relative w-64 h-2 bg-b-surface2 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-primary1 rounded-full transition-all duration-1000"
                            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                        />
                    </div>
                    <span className="text-body-bold text-primary1">{countdown}s</span>
                </div>

                {/* Generating button */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-b-surface2 rounded-full shadow-hover">
                    <RefreshCircle size={20} color="#2d68ff" className="animate-spin" />
                    <span className="text-body-bold text-t-primary">Generating with AI</span>
                </div>
            </div>
        </div>
    );
}
