"use client";

import Link from "next/link";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    Edit, 
    Calendar, 
    Briefcase, 
    MessageQuestion,
    ArrowRight2,
    Lamp,
    Building,
    Microphone2,
    Judge,
    Setting4
} from "iconsax-react";

const industries = [
    {
        id: "marketing",
        name: "Marketing & Advertising",
        description: "Campaign briefs, creative briefs, client onboarding",
        Icon: Magicpen,
        iconColor: "#2d68ff",
        bgColor: "bg-primary1/10",
        steps: 4,
    },
    {
        id: "design",
        name: "Design & Creative",
        description: "Branding, web design, UX/UI project briefs",
        Icon: Brush2,
        iconColor: "#a444f3",
        bgColor: "bg-accent2/10",
        steps: 4,
    },
    {
        id: "video",
        name: "Video Production",
        description: "Video/photo shoot briefs, storyboard briefs",
        Icon: VideoPlay,
        iconColor: "#ff381c",
        bgColor: "bg-primary3/10",
        steps: 5,
    },
    {
        id: "content",
        name: "Content Marketing & SEO",
        description: "Blog posts, articles, content strategy briefs",
        Icon: Edit,
        iconColor: "#00a656",
        bgColor: "bg-primary2/10",
        steps: 4,
    },
    {
        id: "events",
        name: "Event Planning",
        description: "Event planning briefs, vendor coordination",
        Icon: Calendar,
        iconColor: "#f52495",
        bgColor: "bg-accent/10",
        steps: 4,
    },
    {
        id: "consulting",
        name: "Management Consulting",
        description: "Engagement briefs, SOW, project scoping",
        Icon: Briefcase,
        iconColor: "#2d68ff",
        bgColor: "bg-primary1/10",
        steps: 4,
    },
    {
        id: "architecture",
        name: "Architecture & Construction",
        description: "Project briefs, RFPs, design briefs",
        Icon: Building,
        iconColor: "#6366f1",
        bgColor: "bg-[#6366f1]/10",
        steps: 9,
    },
    {
        id: "pr",
        name: "Public Relations",
        description: "PR campaign briefs, media briefs",
        Icon: Microphone2,
        iconColor: "#f59e0b",
        bgColor: "bg-[#f59e0b]/10",
        steps: 12,
    },
    {
        id: "legal",
        name: "Legal Services",
        description: "Client intake briefs, case briefs",
        Icon: Judge,
        iconColor: "#64748b",
        bgColor: "bg-[#64748b]/10",
        steps: 10,
    },
];

export default function NewBriefPage() {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-h1 mb-3">Create a new brief</h1>
                <p className="text-body-lg text-t-secondary">
                    Select the type of brief you want to create. Our AI will guide
                    you through industry-specific questions.
                </p>
            </div>

            {/* Industry Grid */}
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                {industries.map((industry) => {
                    const IndustryIcon = industry.Icon;
                    return (
                        <Link
                            key={industry.id}
                            href={`/dashboard/new/${industry.id}`}
                            className="group p-6 bg-b-surface2 rounded-3xl hover:shadow-hover transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-2xl ${industry.bgColor}`}
                                >
                                    <IndustryIcon size={24} variant="Bold" color={industry.iconColor} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-body-bold mb-1 group-hover:text-primary1 transition-colors">
                                        {industry.name}
                                    </h3>
                                    <p className="text-small text-t-tertiary mb-2">
                                        {industry.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-small text-t-tertiary">
                                        <MessageQuestion size={14} color="#8E8E93" />
                                        <span>{industry.steps} steps</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Custom Brief Card */}
                <Link
                    href="/dashboard/new/custom"
                    className="group p-6 rounded-3xl border-2 border-dashed border-primary1/40 bg-primary1/5 hover:border-primary1 hover:bg-primary1/10 transition-all"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary1/10">
                            <Setting4 size={24} variant="Bold" color="#2d68ff" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-body-bold mb-1 group-hover:text-primary1 transition-colors">
                                Custom Brief
                            </h3>
                            <p className="text-small text-t-tertiary mb-2">
                                Build your own brief with custom fields
                            </p>
                            <div className="flex items-center gap-2 text-small text-primary1">
                                <span>Dynamic fields</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Help text */}
            <div className="mt-10 p-6 bg-b-surface2 rounded-3xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Lamp size={20} color="#00a656" variant="Bold" />
                    <span className="text-body-bold">Not sure which to choose?</span>
                </div>
                <p className="text-small text-t-secondary">
                    Start with the industry that best matches your project, or create a custom brief
                    with your own fields and structure.
                </p>
            </div>
        </div>
    );
}
