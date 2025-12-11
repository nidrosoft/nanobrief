"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "@/components/Image";
import { Profile, Calendar, Briefcase } from "iconsax-react";

const briefContent = {
    title: "Q4 Marketing Campaign",
    industry: "Marketing & Advertising",
    client: "Acme Corporation",
    createdAt: "December 10, 2024",
    author: "John Doe",
    sections: [
        {
            title: "Executive Summary",
            content: `This brief outlines the Q4 marketing campaign for Acme Corporation, focusing on driving brand awareness and lead generation during the holiday season.

The primary objective is to increase brand awareness by 25% and generate 500 qualified leads by the end of Q4.`,
        },
        {
            title: "Objectives & Goals",
            content: `**Primary Objectives:**
• Increase brand awareness by 25%
• Generate 500 qualified leads
• Achieve 2M impressions across all channels

**Key Performance Indicators:**
• Cost per lead: Target $15 or less
• Click-through rate: Target 2.5%`,
        },
        {
            title: "Target Audience",
            content: `**Primary Audience:**
• Age: 25-40 years old
• Location: United States, primarily urban areas
• Income: $50,000 - $100,000 annually
• Interests: Sustainability, eco-friendly products`,
        },
        {
            title: "Timeline & Budget",
            content: `**Campaign Timeline:**
• Campaign Launch: Nov 25 (Black Friday)
• Campaign End: Dec 31

**Total Budget: $75,000**`,
        },
    ],
};

export default function SharedBriefPage() {
    const params = useParams();

    return (
        <div className="min-h-screen bg-b-surface1">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-b-surface2 border-b border-stroke-subtle">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary1 rounded-lg">
                        <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <span className="text-body-bold">NanoBrief</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Button as="link" href="/signup" isSecondary>
                        Create your own brief
                    </Button>
                </div>
            </header>

            {/* Brief Content */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                {/* Brief Header */}
                <div className="mb-8 pb-8 border-b border-stroke-subtle">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary1/10 text-primary1 text-small font-medium rounded-full">
                            {briefContent.industry}
                        </span>
                    </div>
                    <h1 className="text-h1 mb-4">{briefContent.title}</h1>
                    <div className="flex items-center gap-4 text-small text-t-secondary">
                        <div className="flex items-center gap-2">
                            <Profile size={16} color="#8E8E93" />
                            <span>{briefContent.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} color="#8E8E93" />
                            <span>{briefContent.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase size={16} color="#8E8E93" />
                            <span>{briefContent.client}</span>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {briefContent.sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-h4 mb-4">{section.title}</h2>
                            <div className="text-body text-t-secondary whitespace-pre-line">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 bg-b-surface2 rounded-3xl text-center">
                    <h3 className="text-h4 mb-2">Create briefs like this in minutes</h3>
                    <p className="text-body text-t-secondary mb-6">
                        NanoBrief uses AI to generate professional project briefs for any industry.
                    </p>
                    <Button as="link" href="/signup" isSecondary>
                        Get started for free
                    </Button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center border-t border-stroke-subtle">
                <p className="text-small text-t-tertiary">
                    Created with{" "}
                    <Link href="/" className="text-primary1 hover:underline">
                        NanoBrief
                    </Link>
                </p>
            </footer>
        </div>
    );
}
