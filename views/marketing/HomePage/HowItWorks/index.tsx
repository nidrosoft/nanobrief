"use client";

import { Category2, MessageQuestion, DocumentText1, Timer1 } from "iconsax-react";

const steps = [
    {
        number: "01",
        title: "Choose Your Industry",
        description: "Select from 9 specialized industries or create a fully custom brief tailored to your needs.",
        Icon: Category2,
        color: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        number: "02",
        title: "Answer Smart Questions",
        description: "Our AI asks the right questions based on your industry to capture all essential details.",
        Icon: MessageQuestion,
        color: "#a444f3",
        bgColor: "bg-accent2/10",
    },
    {
        number: "03",
        title: "Get Your Brief",
        description: "Receive a professional, comprehensive brief ready to share with clients and teams.",
        Icon: DocumentText1,
        color: "#00a656",
        bgColor: "bg-primary2/10",
    },
];

const HowItWorks = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">How it works</div>
                    <div className="text-body-lg text-t-secondary/80">
                        Create professional briefs in three simple steps
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="relative p-12 bg-b-subtle rounded-4xl max-lg:p-8 max-md:p-6">
                            {/* Steps */}
                            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-12">
                                {steps.map((step, index) => {
                                    const StepIcon = step.Icon;
                                    return (
                                        <div key={index} className="relative">
                                            {/* Connector line - only on desktop */}
                                            {index < steps.length - 1 && (
                                                <div className="absolute top-10 left-[calc(50%+3rem)] right-0 h-[2px] bg-gradient-to-r from-stroke-subtle to-transparent max-lg:hidden" />
                                            )}
                                            
                                            {/* Step content */}
                                            <div className="flex flex-col items-center text-center max-lg:flex-row max-lg:items-start max-lg:text-left max-lg:gap-6">
                                                {/* Icon container */}
                                                <div className="relative mb-6 max-lg:mb-0">
                                                    <div
                                                        className={`flex items-center justify-center w-20 h-20 rounded-3xl ${step.bgColor}`}
                                                    >
                                                        <StepIcon
                                                            size={36}
                                                            variant="Bold"
                                                            color={step.color}
                                                        />
                                                    </div>
                                                    {/* Step number badge */}
                                                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-b-surface1 border-2 border-stroke-subtle">
                                                        <span className="text-small font-bold text-t-primary">
                                                            {step.number}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Text content */}
                                                <div className="max-lg:flex-1">
                                                    <h3 className="mb-3 text-body-lg-bold">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-body text-t-secondary max-w-xs mx-auto max-lg:mx-0 max-lg:max-w-none">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Time indicator */}
                            <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-stroke-subtle max-lg:mt-8 max-lg:pt-6">
                                <Timer1 size={20} variant="Bold" color="#f52495" />
                                <span className="text-body-bold text-t-secondary">
                                    Average time: Under 2 minutes
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
