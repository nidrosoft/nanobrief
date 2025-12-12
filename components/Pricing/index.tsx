"use client";

import { useState } from "react";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Feature from "./Feature";
import UpgradeToPremium from "./UpgradeToPremium";
import BackToFree from "./BackToFree";

import { pricing } from "./pricing";

type PricingProps = {
    className?: string;
    title: string;
    hideCircleButton?: boolean;
};

const Pricing = ({ className, title }: PricingProps) => {
    const [isModalPremiumOpen, setIsModalPremiumOpen] = useState(false);
    const [isModalFreeOpen, setIsModalFreeOpen] = useState(false);

    return (
        <>
            <div className={className || ""}>
                <div className="center">
                    <div className="max-w-150 mx-auto mb-16 text-center text-h1 max-lg:mb-12 max-md:max-w-full max-md:mb-8 max-md:text-left">
                        {title}
                    </div>
                    <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto max-lg:grid-cols-1 max-lg:max-w-md">
                        {pricing.map((item, index) => {
                            const isPro = item.title === "Pro";
                            const isTeam = item.title === "Team";
                            
                            return (
                                <div
                                    key={index}
                                    className={`
                                        relative flex flex-col rounded-4xl overflow-hidden
                                        ${isPro 
                                            ? "bg-b-surface2 shadow-[inset_0px_0px_0px_2px_var(--color-primary1)]" 
                                            : "bg-b-surface2 shadow-[inset_0px_0px_0px_1.5px_var(--color-stroke-subtle)]"
                                        }
                                    `}
                                >
                                    {isPro && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary1 text-white text-small font-medium rounded-full">
                                            Most Popular
                                        </div>
                                    )}
                                    
                                    {/* Header with title and price */}
                                    <div className="p-8 pb-6 max-lg:p-6 max-lg:pb-4">
                                        <div className="mb-2 text-h3">{item.title}</div>
                                        {item.description && (
                                            <p className="text-small text-t-tertiary mb-4">
                                                {item.description}
                                            </p>
                                        )}
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-h1">${item.price}</span>
                                            <span className="text-body text-t-secondary">/ month</span>
                                        </div>
                                    </div>

                                    {/* Features list */}
                                    <div className="flex-1 px-8 pb-6 max-lg:px-6 max-lg:pb-4">
                                        <ul className="flex flex-col gap-3">
                                            {item.features.map((feature, idx) => (
                                                <Feature item={feature} key={idx} />
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="p-8 pt-4 max-lg:p-6 max-lg:pt-4">
                                        {isPro ? (
                                            <Button
                                                className="w-full"
                                                isSecondary
                                                onClick={() => setIsModalPremiumOpen(true)}
                                            >
                                                Get started
                                            </Button>
                                        ) : isTeam ? (
                                            <Button
                                                className="w-full"
                                                isStroke
                                                onClick={() => setIsModalPremiumOpen(true)}
                                            >
                                                Contact sales
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full"
                                                isStroke
                                                onClick={() => setIsModalFreeOpen(true)}
                                            >
                                                Create account
                                            </Button>
                                        )}
                                    </div>

                                    {/* Gradient decoration for Pro */}
                                    {isPro && (
                                        <div className="absolute right-0 bottom-0 pointer-events-none opacity-50">
                                            <Image
                                                src="/images/pricing-gradient.png"
                                                width={200}
                                                height={166}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Modal
                open={isModalFreeOpen}
                onClose={() => setIsModalFreeOpen(false)}
            >
                <BackToFree />
            </Modal>
            <Modal
                open={isModalPremiumOpen}
                onClose={() => setIsModalPremiumOpen(false)}
            >
                <UpgradeToPremium />
            </Modal>
        </>
    );
};

export default Pricing;
