"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "@/components/Image";
import { Magicpen, RefreshCircle, Warning2 } from "iconsax-react";
import { createClient } from "@/lib/supabase/client";

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
    const searchParams = useSearchParams();
    const industryId = params.industry as string;
    const briefId = searchParams.get("briefId");
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing AI...");
    const [error, setError] = useState<string | null>(null);
    const hasStarted = useRef(false);

    const statuses = [
        "Initializing AI...",
        "Analyzing your responses...",
        "Understanding project requirements...",
        "Generating content with Claude...",
        "Structuring your brief...",
        "Adding industry best practices...",
        "Formatting sections...",
        "Finalizing your brief...",
    ];

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        const generateBrief = async () => {
            if (!briefId) {
                router.push("/dashboard/new");
                return;
            }

            const supabase = createClient();

            // Start progress animation
            let currentProgress = 0;
            const progressTimer = setInterval(() => {
                currentProgress += Math.random() * 8 + 2;
                if (currentProgress > 90) currentProgress = 90;
                setProgress(currentProgress);
                
                // Update status based on progress
                const statusIndex = Math.min(
                    Math.floor((currentProgress / 100) * statuses.length),
                    statuses.length - 1
                );
                setStatus(statuses[statusIndex]);
            }, 800);

            try {
                // Get the session for auth
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session) {
                    throw new Error("Not authenticated");
                }

                // Call the Edge Function to generate the brief
                const { data: result, error: invokeError } = await supabase.functions.invoke(
                    "generate-brief",
                    {
                        body: { briefId },
                    }
                );

                clearInterval(progressTimer);

                if (invokeError) {
                    throw new Error(invokeError.message || "Failed to generate brief");
                }

                console.log("Brief generated:", result?.metadata);

                // Complete the progress
                setProgress(100);
                setStatus("Brief complete!");

                // Short delay to show completion
                await new Promise(resolve => setTimeout(resolve, 500));

                // Navigate to the brief view
                router.push(`/dashboard/briefs/${briefId}`);

            } catch (err: any) {
                clearInterval(progressTimer);
                console.error("Generation error:", err);
                setError(err.message || "Failed to generate brief. Please try again.");
                setStatus("Generation failed");
            }
        };

        generateBrief();
    }, [briefId, router]);

    const handleRetry = () => {
        setError(null);
        setProgress(0);
        hasStarted.current = false;
        window.location.reload();
    };

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
                            className="absolute inset-y-0 left-0 bg-primary1 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-body-bold text-primary1">{Math.round(progress)}%</span>
                </div>

                {/* Error state */}
                {error ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary3/10 rounded-full">
                            <Warning2 size={20} color="#ff381c" />
                            <span className="text-body-bold text-primary3">{error}</span>
                        </div>
                        <button
                            onClick={handleRetry}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary1 text-white rounded-full hover:bg-primary1/90 transition-colors"
                        >
                            <RefreshCircle size={20} />
                            <span className="text-body-bold">Try Again</span>
                        </button>
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-b-surface2 rounded-full shadow-hover">
                        <RefreshCircle size={20} color="#2d68ff" className="animate-spin" />
                        <span className="text-body-bold text-t-primary">Generating with AI</span>
                    </div>
                )}
            </div>
        </div>
    );
}
