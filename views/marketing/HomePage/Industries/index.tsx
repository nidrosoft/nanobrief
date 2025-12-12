"use client";

import Link from "next/link";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    Edit, 
    Calendar, 
    Briefcase,
    Building,
    Microphone2,
    Judge,
    Setting4,
    ArrowRight2
} from "iconsax-react";

const industries = [
    {
        id: "marketing",
        name: "Marketing & Advertising",
        description: "Campaign briefs, creative briefs, brand launches",
        Icon: Magicpen,
        color: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        id: "design",
        name: "Design & Creative",
        description: "Branding, web design, UX/UI projects",
        Icon: Brush2,
        color: "#a444f3",
        bgColor: "bg-accent2/10",
    },
    {
        id: "video",
        name: "Video Production",
        description: "Commercials, corporate videos, social content",
        Icon: VideoPlay,
        color: "#ff381c",
        bgColor: "bg-primary3/10",
    },
    {
        id: "content",
        name: "Content & SEO",
        description: "Blog posts, articles, content strategy",
        Icon: Edit,
        color: "#00a656",
        bgColor: "bg-primary2/10",
    },
    {
        id: "events",
        name: "Event Planning",
        description: "Conferences, launches, corporate events",
        Icon: Calendar,
        color: "#f52495",
        bgColor: "bg-accent/10",
    },
    {
        id: "consulting",
        name: "Management Consulting",
        description: "Engagement briefs, SOW, project scoping",
        Icon: Briefcase,
        color: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        id: "architecture",
        name: "Architecture",
        description: "Project briefs, RFPs, design requirements",
        Icon: Building,
        color: "#6366f1",
        bgColor: "bg-[#6366f1]/10",
    },
    {
        id: "pr",
        name: "Public Relations",
        description: "PR campaigns, media briefs, crisis comms",
        Icon: Microphone2,
        color: "#f59e0b",
        bgColor: "bg-[#f59e0b]/10",
    },
    {
        id: "legal",
        name: "Legal Services",
        description: "Client intake, case briefs, matter summaries",
        Icon: Judge,
        color: "#64748b",
        bgColor: "bg-[#64748b]/10",
    },
];

const Industries = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">
                        Briefs for every industry
                    </div>
                    <div className="text-body-lg text-t-secondary/80">
                        Specialized AI prompts tailored to your field
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="p-8 bg-b-subtle rounded-4xl max-lg:p-6 max-md:p-4">
                            {/* Industry Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-6 max-lg:grid-cols-2 max-md:grid-cols-1">
                                {industries.map((industry) => {
                                    const IndustryIcon = industry.Icon;
                                    return (
                                        <div
                                            key={industry.id}
                                            className="group flex items-start gap-4 p-5 bg-b-surface2 rounded-2xl hover:shadow-hover transition-all cursor-pointer max-md:p-4"
                                        >
                                            <div
                                                className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${industry.bgColor}`}
                                            >
                                                <IndustryIcon
                                                    size={24}
                                                    variant="Bold"
                                                    color={industry.color}
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-body-bold mb-1 group-hover:text-primary1 transition-colors">
                                                    {industry.name}
                                                </h3>
                                                <p className="text-small text-t-tertiary">
                                                    {industry.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Custom Brief Card */}
                            <div className="flex items-center justify-between p-6 rounded-2xl border-2 border-dashed border-primary1/30 bg-primary1/5 max-md:flex-col max-md:items-start max-md:gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary1/10">
                                        <Setting4 size={24} variant="Bold" color="#2d68ff" />
                                    </div>
                                    <div>
                                        <h3 className="text-body-bold mb-1">Custom Brief</h3>
                                        <p className="text-small text-t-tertiary">
                                            Don't see your industry? Build a fully custom brief with your own fields and structure.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/signup"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary1 text-white text-body-bold rounded-xl hover:bg-primary1/90 transition-colors shrink-0 max-md:w-full max-md:justify-center"
                                >
                                    <span>Get started</span>
                                    <ArrowRight2 size={18} color="#ffffff" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Industries;
