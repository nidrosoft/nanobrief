"use client";

import { useState } from "react";
import { Add, Minus } from "iconsax-react";

const faqs = [
    {
        question: "How does the AI generate briefs?",
        answer: "NanoBrief uses Claude, Anthropic's advanced AI, trained on thousands of professional briefs. It understands industry-specific terminology and best practices to generate comprehensive, actionable briefs tailored to your specific needs.",
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use enterprise-grade encryption, and your data is never used to train AI models. We're committed to protecting your privacy and maintaining the confidentiality of your project information.",
    },
    {
        question: "Can I edit the generated briefs?",
        answer: "Yes! Every section is fully editable. You can modify any part of the generated brief to match your exact requirements. Pro users can also regenerate individual sections if they want a different approach.",
    },
    {
        question: "What industries do you support?",
        answer: "We support 9 specialized industries: Marketing & Advertising, Design & Creative, Video Production, Content Marketing & SEO, Event Planning, Management Consulting, Architecture & Construction, Public Relations, and Legal Services. Plus, you can create fully custom briefs with your own fields.",
    },
    {
        question: "How is this different from ChatGPT?",
        answer: "NanoBrief is purpose-built for creating project briefs. Our industry-specific questionnaires, structured output, and professional formatting create results that are immediately usable—no prompt engineering required. You get consistent, professional briefs every time.",
    },
    {
        question: "Can I share briefs with clients?",
        answer: "Yes! Generate shareable links with one click. Viewers don't need an account to view your briefs. Pro users get clean links without watermarks for a more professional presentation.",
    },
    {
        question: "What if I need more than the free tier?",
        answer: "Upgrade to Pro for unlimited briefs, access to all industries, PDF & Word exports, section regeneration, and more. Teams can use our Team plan for shared workspaces, collaboration features, and custom branding.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes! Start free with 2 briefs per month—no credit card required. This lets you experience the full power of NanoBrief before deciding to upgrade. You can upgrade anytime when you need more.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">Frequently asked questions</div>
                    <div className="text-body-lg text-t-secondary/80">
                        Everything you need to know about NanoBrief
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="max-w-3xl mx-auto p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="bg-b-subtle rounded-4xl overflow-hidden">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-b border-stroke-subtle last:border-b-0"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="flex items-center justify-between w-full p-6 text-left hover:bg-b-surface2/50 transition-colors max-md:p-4"
                                    >
                                        <span className="text-body-bold pr-4">
                                            {faq.question}
                                        </span>
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-b-surface2 shrink-0">
                                            {openIndex === index ? (
                                                <Minus size={18} color="#8E8E93" />
                                            ) : (
                                                <Add size={18} color="#8E8E93" />
                                            )}
                                        </div>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            openIndex === index
                                                ? "max-h-96 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-6 max-md:px-4 max-md:pb-4">
                                            <p className="text-body text-t-secondary">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
