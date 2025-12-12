"use client";

import { Magicpen, Category2, Share, DocumentDownload, Refresh, Clock } from "iconsax-react";

const features = [
    {
        title: "AI-Powered Generation",
        description: "Powered by Claude AI for intelligent, context-aware brief generation that understands your industry.",
        Icon: Magicpen,
        color: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        title: "Industry-Specific Prompts",
        description: "Smart questionnaires designed by industry experts for Marketing, Design, Video, and 6 more fields.",
        Icon: Category2,
        color: "#a444f3",
        bgColor: "bg-accent2/10",
    },
    {
        title: "One-Click Sharing",
        description: "Generate shareable links instantly. Clients and teams can view without creating an account.",
        Icon: Share,
        color: "#00a656",
        bgColor: "bg-primary2/10",
    },
    {
        title: "PDF & Word Export",
        description: "Download professional documents ready for clients, stakeholders, and presentations.",
        Icon: DocumentDownload,
        color: "#ff381c",
        bgColor: "bg-primary3/10",
        isPro: true,
    },
    {
        title: "Section Regeneration",
        description: "Not happy with a section? Regenerate just that part with one click until it's perfect.",
        Icon: Refresh,
        color: "#f52495",
        bgColor: "bg-accent/10",
        isPro: true,
    },
    {
        title: "Version History",
        description: "Track changes and restore previous versions of your briefs. Never lose your work.",
        Icon: Clock,
        color: "#6366f1",
        bgColor: "bg-[#6366f1]/10",
        isPro: true,
    },
];

const Features = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">
                        Everything you need to create perfect briefs
                    </div>
                    <div className="text-body-lg text-t-secondary/80">
                        Powerful features that save you hours every week
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                            {features.map((feature, index) => {
                                const FeatureIcon = feature.Icon;
                                return (
                                    <div
                                        key={index}
                                        className="relative p-8 bg-b-subtle rounded-4xl max-lg:p-6"
                                    >
                                        {feature.isPro && (
                                            <div className="absolute top-4 right-4 px-2 py-0.5 bg-primary1/10 text-primary1 text-xs font-medium rounded-full">
                                                Pro
                                            </div>
                                        )}
                                        <div
                                            className={`flex items-center justify-center w-14 h-14 mb-5 rounded-2xl ${feature.bgColor}`}
                                        >
                                            <FeatureIcon
                                                size={28}
                                                variant="Bold"
                                                color={feature.color}
                                            />
                                        </div>
                                        <h3 className="mb-3 text-body-lg-bold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-body text-t-secondary">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
