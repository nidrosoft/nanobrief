"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Setting4, RefreshCircle } from "iconsax-react";

export default function CustomGeneratingPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [status, setStatus] = useState("Analyzing your custom brief...");

    const statuses = [
        "Analyzing your custom brief...",
        "Processing your custom fields...",
        "Structuring your brief...",
        "Applying best practices...",
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
        <div className="max-w-2xl mx-auto text-center py-20">
            {/* Icon */}
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-primary1/10 rounded-3xl">
                <Setting4 size={40} variant="Bold" color="#2d68ff" />
            </div>

            {/* Title */}
            <h1 className="text-h2 mb-4">Generating your custom brief</h1>
            <p className="text-body-lg text-t-secondary mb-8">
                Our AI is creating a personalized brief based on your custom fields.
            </p>

            {/* Loading Animation */}
            <div className="flex items-center justify-center gap-3 mb-8">
                <RefreshCircle 
                    size={24} 
                    variant="Bold" 
                    color="#2d68ff" 
                    className="animate-spin"
                />
                <span className="text-body text-t-secondary">{status}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-b-surface2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary1 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown + 1) / 5) * 100}%` }}
                />
            </div>
        </div>
    );
}
