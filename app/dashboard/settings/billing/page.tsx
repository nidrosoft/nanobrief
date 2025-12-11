"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { ArrowLeft2, TickCircle, Add, Card, DocumentText } from "iconsax-react";

const plans = [
    {
        id: "free",
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out NanoBrief",
        features: [
            "5 briefs per month",
            "6 industries",
            "Basic templates",
            "Email support",
        ],
        current: true,
    },
    {
        id: "pro",
        name: "Pro",
        price: "$19",
        period: "per month",
        description: "For professionals and small teams",
        features: [
            "Unlimited briefs",
            "All industries",
            "Advanced AI customization",
            "Priority support",
            "Export to PDF/Word",
            "Team collaboration",
        ],
        popular: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For large organizations",
        features: [
            "Everything in Pro",
            "Custom integrations",
            "Dedicated account manager",
            "SSO & advanced security",
            "Custom AI training",
            "SLA guarantee",
        ],
    },
];

export default function BillingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const handleUpgrade = (planId: string) => {
        console.log("Upgrading to:", planId);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 text-small text-t-secondary hover:text-t-primary mb-4"
                >
                    <ArrowLeft2 size={16} color="#8E8E93" />
                    Back to settings
                </Link>
                <h1 className="text-h1 mb-2">Billing & Subscription</h1>
                <p className="text-body text-t-secondary">
                    Manage your subscription and billing details
                </p>
            </div>

            {/* Current Plan */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-h4 mb-1">Current Plan</h2>
                        <p className="text-body text-t-secondary">
                            You're on the <span className="text-t-primary font-medium">Free</span> plan
                        </p>
                    </div>
                    <span className="px-4 py-2 bg-primary2/10 text-primary2 text-button rounded-full">
                        Active
                    </span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-b-surface1 rounded-2xl">
                    <div className="flex-1">
                        <p className="text-small text-t-secondary mb-1">Credits used this month</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-b-surface2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary1 rounded-full transition-all"
                                    style={{ width: "60%" }}
                                />
                            </div>
                            <span className="text-body-bold">3/5</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-small text-t-tertiary">Resets on</p>
                        <p className="text-body-bold">Jan 1, 2025</p>
                    </div>
                </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-4 py-2 rounded-xl text-button transition-all ${
                        billingCycle === "monthly"
                            ? "bg-b-dark1 text-t-light"
                            : "text-t-secondary hover:text-t-primary"
                    }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-4 py-2 rounded-xl text-button transition-all ${
                        billingCycle === "yearly"
                            ? "bg-b-dark1 text-t-light"
                            : "text-t-secondary hover:text-t-primary"
                    }`}
                >
                    Yearly
                    <span className="ml-2 px-2 py-0.5 bg-primary2/10 text-primary2 text-small rounded-full">
                        Save 20%
                    </span>
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-lg:grid-cols-1">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative p-6 rounded-3xl border-2 transition-all ${
                            plan.popular
                                ? "border-primary1 bg-primary1/5"
                                : plan.current
                                ? "border-stroke2 bg-b-surface2"
                                : "border-stroke-subtle bg-b-surface2 hover:border-stroke2"
                        }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary1 text-white text-small font-medium rounded-full">
                                Most Popular
                            </div>
                        )}
                        <div className="mb-6">
                            <h3 className="text-h4 mb-1">{plan.name}</h3>
                            <p className="text-small text-t-tertiary mb-4">
                                {plan.description}
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-h2">{plan.price}</span>
                                <span className="text-small text-t-tertiary">
                                    /{plan.period}
                                </span>
                            </div>
                        </div>
                        <ul className="flex flex-col gap-3 mb-6">
                            {plan.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-small text-t-secondary"
                                >
                                    <TickCircle size={16} variant="Bold" color="#00a656" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        {plan.current ? (
                            <Button className="w-full" isStroke disabled>
                                Current plan
                            </Button>
                        ) : plan.id === "enterprise" ? (
                            <Button className="w-full" isStroke>
                                Contact sales
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                isSecondary
                                onClick={() => handleUpgrade(plan.id)}
                            >
                                Upgrade to {plan.name}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Payment Method */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-h4">Payment Method</h2>
                    <Button isStroke>
                        <Add size={20} color="#8E8E93" />
                        Add card
                    </Button>
                </div>
                <div className="flex items-center gap-4 p-4 bg-b-surface1 rounded-2xl">
                    <div className="flex items-center justify-center w-12 h-8 bg-b-surface2 rounded-lg">
                        <Card size={20} color="#8E8E93" />
                    </div>
                    <div className="flex-1">
                        <p className="text-body-bold">No payment method</p>
                        <p className="text-small text-t-tertiary">
                            Add a card to upgrade your plan
                        </p>
                    </div>
                </div>
            </div>

            {/* Billing History */}
            <div className="p-6 bg-b-surface2 rounded-3xl">
                <h2 className="text-h4 mb-4">Billing History</h2>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 bg-b-surface1 rounded-xl">
                        <DocumentText size={24} variant="Bold" color="#8E8E93" />
                    </div>
                    <p className="text-body-bold mb-1">No invoices yet</p>
                    <p className="text-small text-t-tertiary">
                        Your billing history will appear here
                    </p>
                </div>
            </div>
        </div>
    );
}
