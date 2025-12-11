"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { ArrowLeft2, Edit2, ExportSquare, DocumentDownload, Sms, Refresh, CloseCircle, Copy } from "iconsax-react";

const briefContent = {
    title: "Q4 Marketing Campaign",
    industry: "Marketing & Advertising",
    client: "Acme Corporation",
    createdAt: "December 10, 2024",
    sections: [
        {
            title: "Executive Summary",
            content: `This brief outlines the Q4 marketing campaign for Acme Corporation, focusing on driving brand awareness and lead generation during the holiday season. The campaign will run across multiple digital channels with a focus on social media and display advertising.

The primary objective is to increase brand awareness by 25% and generate 500 qualified leads by the end of Q4. The campaign will target millennials and Gen Z consumers interested in sustainable products.`,
        },
        {
            title: "Objectives & Goals",
            content: `**Primary Objectives:**
• Increase brand awareness by 25% (measured by social mentions and search volume)
• Generate 500 qualified leads through landing page conversions
• Achieve 2M impressions across all channels

**Key Performance Indicators:**
• Cost per lead: Target $15 or less
• Click-through rate: Target 2.5%
• Social engagement rate: Target 4%

**30/60/90 Day Milestones:**
• Day 30: Launch all creative assets, achieve 500K impressions
• Day 60: Optimize based on performance data, reach 1.2M impressions
• Day 90: Final push, achieve all KPI targets`,
        },
        {
            title: "Target Audience",
            content: `**Primary Audience:**
• Age: 25-40 years old
• Location: United States, primarily urban areas
• Income: $50,000 - $100,000 annually
• Interests: Sustainability, eco-friendly products, conscious consumerism

**Psychographics:**
• Values environmental responsibility
• Willing to pay premium for sustainable products
• Active on social media, particularly Instagram and TikTok
• Influenced by peer recommendations and reviews

**Current Perception:**
The audience is generally unaware of the brand but receptive to sustainable alternatives in the market.

**Desired Perception:**
Position Acme as the go-to brand for sustainable, high-quality products that don't compromise on style or functionality.`,
        },
        {
            title: "Timeline & Budget",
            content: `**Campaign Timeline:**
• Creative Development: Nov 1-15
• Asset Review & Approval: Nov 16-22
• Campaign Launch: Nov 25 (Black Friday)
• Campaign End: Dec 31

**Total Budget: $75,000**

**Budget Allocation:**
• Media Spend: $50,000 (67%)
• Creative Production: $15,000 (20%)
• Influencer Partnerships: $7,500 (10%)
• Contingency: $2,500 (3%)`,
        },
    ],
};

export default function BriefViewPage() {
    const params = useParams();
    const router = useRouter();
    const [showShareModal, setShowShareModal] = useState(false);
    const briefId = params.id;

    const shareLink = `https://nanobrief.app/share/${briefId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
    };

    const handleDownload = () => {
        console.log("Downloading brief...");
    };

    const handleEmail = () => {
        const subject = encodeURIComponent(`Brief: ${briefContent.title}`);
        const body = encodeURIComponent(`Check out this brief: ${shareLink}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleRegenerate = () => {
        console.log("Regenerating brief...");
    };

    return (
        <div className="max-w-4xl mx-auto pb-24">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/briefs")}
                    className="flex items-center gap-2 text-small text-t-secondary hover:text-t-primary mb-4"
                >
                    <ArrowLeft2 size={16} color="#8E8E93" />
                    Back to briefs
                </button>
                <div className="flex items-start justify-between gap-4 max-md:flex-col">
                    <div>
                        <h1 className="text-h2 mb-2">{briefContent.title}</h1>
                        <div className="flex items-center gap-3 text-small text-t-secondary">
                            <span>{briefContent.industry}</span>
                            <span>•</span>
                            <span>{briefContent.client}</span>
                            <span>•</span>
                            <span>{briefContent.createdAt}</span>
                        </div>
                    </div>
                    <Button
                        as="link"
                        href="/dashboard/new/marketing"
                        isStroke
                        className="shrink-0"
                    >
                        <Edit2 size={20} color="#8E8E93" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Brief Content */}
            <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover mb-8 max-md:p-6">
                {briefContent.sections.map((section, index) => (
                    <div
                        key={section.title}
                        className={`${
                            index !== briefContent.sections.length - 1
                                ? "mb-8 pb-8 border-b border-stroke-subtle"
                                : ""
                        }`}
                    >
                        <h2 className="text-h4 mb-4">{section.title}</h2>
                        <div className="text-body text-t-secondary whitespace-pre-line">
                            {section.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 p-2 bg-b-surface2 rounded-full shadow-hover max-md:bottom-20">
                <button
                    onClick={() => setShowShareModal(true)}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <ExportSquare size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Share</span>
                </button>
                <button
                    onClick={handleDownload}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <DocumentDownload size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Download</span>
                </button>
                <button
                    onClick={handleEmail}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <Sms size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Email</span>
                </button>
                <button
                    onClick={handleRegenerate}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <Refresh size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Regenerate</span>
                </button>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="w-full max-w-md p-6 bg-b-surface2 rounded-3xl shadow-hover">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-h4">Share Brief</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="p-2 rounded-xl hover:bg-b-surface1 transition-colors"
                            >
                                <CloseCircle size={24} color="#8E8E93" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-small text-t-secondary">
                                Share link
                            </label>
                            <div className="flex items-center gap-2 p-3 bg-b-surface1 rounded-xl">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 bg-transparent text-small text-t-secondary outline-none"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 rounded-lg hover:bg-b-surface2 transition-colors"
                                >
                                    <Copy size={20} color="#8E8E93" />
                                </button>
                            </div>
                        </div>
                        <Button
                            className="w-full"
                            isSecondary
                            onClick={() => setShowShareModal(false)}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
