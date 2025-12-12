"use client";

import { User, People, Building4, Briefcase } from "iconsax-react";

const useCases = [
    {
        title: "Freelancers & Solopreneurs",
        Icon: User,
        color: "#2d68ff",
        bgColor: "bg-primary1/10",
        quote: "I used to spend 3 hours on client briefs. Now it takes 5 minutes.",
        painPoint: "No more starting from scratch for every project",
        benefits: [
            "Professional briefs that impress clients",
            "Consistent quality across all projects",
            "More time for actual creative work",
        ],
    },
    {
        title: "Agency Teams",
        Icon: People,
        color: "#a444f3",
        bgColor: "bg-accent2/10",
        quote: "Our team creates 50+ briefs monthly. NanoBrief is a game-changer.",
        painPoint: "Standardize brief quality across your entire team",
        benefits: [
            "Consistent, professional output every time",
            "Faster client onboarding process",
            "Reduced revision cycles",
        ],
    },
    {
        title: "In-House Marketing",
        Icon: Building4,
        color: "#00a656",
        bgColor: "bg-primary2/10",
        quote: "Finally, briefs that actually get read and followed.",
        painPoint: "Stakeholder alignment made simple",
        benefits: [
            "Clear briefs everyone understands",
            "Better cross-team collaboration",
            "Fewer miscommunications",
        ],
    },
    {
        title: "Consultants",
        Icon: Briefcase,
        color: "#f52495",
        bgColor: "bg-accent/10",
        quote: "My SOWs are now 10x more detailed and professional.",
        painPoint: "Prevent scope creep with detailed briefs",
        benefits: [
            "Comprehensive project scoping",
            "Professional client deliverables",
            "Protected time and resources",
        ],
    },
];

const UseCases = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">Built for the way you work</div>
                    <div className="text-body-lg text-t-secondary/80">
                        See how professionals across industries use NanoBrief
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                            {useCases.map((useCase, index) => {
                                const UseCaseIcon = useCase.Icon;
                                return (
                                    <div
                                        key={index}
                                        className="p-8 bg-b-subtle rounded-4xl max-lg:p-6"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div
                                                className={`flex items-center justify-center w-14 h-14 rounded-2xl ${useCase.bgColor}`}
                                            >
                                                <UseCaseIcon
                                                    size={28}
                                                    variant="Bold"
                                                    color={useCase.color}
                                                />
                                            </div>
                                            <h3 className="text-body-lg-bold">
                                                {useCase.title}
                                            </h3>
                                        </div>

                                        {/* Quote */}
                                        <div className="mb-6 p-4 bg-b-surface2 rounded-2xl">
                                            <p className="text-body italic text-t-secondary">
                                                "{useCase.quote}"
                                            </p>
                                        </div>

                                        {/* Pain point */}
                                        <div className="mb-4">
                                            <p className="text-small text-t-tertiary uppercase tracking-wider mb-2">
                                                The Problem
                                            </p>
                                            <p className="text-body text-t-primary">
                                                {useCase.painPoint}
                                            </p>
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <p className="text-small text-t-tertiary uppercase tracking-wider mb-3">
                                                The Solution
                                            </p>
                                            <ul className="space-y-2">
                                                {useCase.benefits.map((benefit, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-3 text-body text-t-secondary"
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 mt-2 rounded-full shrink-0"
                                                            style={{ backgroundColor: useCase.color }}
                                                        />
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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

export default UseCases;
