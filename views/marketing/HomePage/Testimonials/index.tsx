"use client";

import Image from "@/components/Image";
import { Star1, QuoteUp } from "iconsax-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Creative Director",
        company: "Bloom Agency",
        avatar: "/images/avatar-1.png",
        quote: "I was skeptical at first—another AI tool, right? But NanoBrief actually gets it. The briefs it generates aren't generic templates. They capture the nuances of what we need for each client. Last week I created 4 briefs in the time it used to take me to write one.",
        rating: 5,
        industry: "Marketing",
    },
    {
        name: "Marcus Thompson",
        role: "Freelance Video Producer",
        avatar: "/images/avatar-2.png",
        quote: "My clients used to send me vague emails like 'we want something cool.' Now I send them a NanoBrief questionnaire link, and 10 minutes later I have a detailed production brief. It's literally saved my sanity and cut my pre-production time in half.",
        rating: 5,
        industry: "Video",
    },
    {
        name: "Elena Rodriguez",
        role: "Marketing Manager",
        company: "Nexus Tech",
        avatar: "/images/avatar-3.png",
        quote: "The thing that surprised me most? The AI asks better questions than I would have thought to ask. It surfaces details I'd normally miss until we're mid-project. Our revision cycles have dropped by 60% since we started using it.",
        rating: 5,
        industry: "Content",
    },
    {
        name: "David Park",
        role: "UX Design Lead",
        company: "Craft Studio",
        avatar: "/images/avatar-4.png",
        quote: "We've tried Notion templates, Google Docs, even built our own brief system. Nothing stuck. NanoBrief is the first tool my whole team actually uses consistently. The shareable links are clutch—clients can view without creating accounts.",
        rating: 5,
        industry: "Design",
    },
    {
        name: "Amara Okonkwo",
        role: "Event Planner",
        company: "Elevate Events",
        avatar: "/images/avatar-5.png",
        quote: "I manage 15-20 events per quarter. Before NanoBrief, I was drowning in scattered notes and email threads. Now every event has a proper brief from day one. My vendors love it because they finally get clear, comprehensive specs.",
        rating: 5,
        industry: "Events",
    },
    {
        name: "James Mitchell",
        role: "Strategy Consultant",
        avatar: "/images/avatar-1.png",
        quote: "The SOW briefs this generates are genuinely impressive. I was worried it would feel robotic, but the output reads like something a senior consultant would write. I still customize maybe 10-15%, but that's way better than starting from scratch.",
        rating: 5,
        industry: "Consulting",
    },
];

const stats = [
    { value: "8,000+", label: "Active users" },
    { value: "50,000+", label: "Briefs created" },
    { value: "4.9/5", label: "Average rating" },
    { value: "2 min", label: "Avg. creation time" },
];

const Testimonials = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-16 text-center max-lg:mb-12 max-md:mb-10 max-md:text-left">
                <div className="center">
                    <div className="mb-5 text-h1">
                        Loved by thousands of professionals
                    </div>
                    <div className="text-body-lg text-t-secondary/80">
                        See what our users are saying about NanoBrief
                    </div>
                </div>
            </div>

            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="p-8 bg-b-subtle rounded-4xl max-lg:p-6 max-md:p-4">
                            {/* Testimonials Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col p-6 bg-b-surface2 rounded-2xl max-md:p-5"
                                    >
                                        {/* Quote icon */}
                                        <div className="mb-4">
                                            <QuoteUp size={24} variant="Bold" color="#2d68ff" className="opacity-30" />
                                        </div>

                                        {/* Quote text */}
                                        <p className="flex-1 mb-6 text-body text-t-secondary leading-relaxed">
                                            "{testimonial.quote}"
                                        </p>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star1 key={i} size={16} variant="Bold" color="#f59e0b" />
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-stroke-subtle">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-b-subtle">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-body-bold truncate">{testimonial.name}</p>
                                                <p className="text-small text-t-tertiary truncate">
                                                    {testimonial.role}
                                                    {testimonial.company && ` at ${testimonial.company}`}
                                                </p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="px-2 py-1 text-xs font-medium text-primary1 bg-primary1/10 rounded-full">
                                                    {testimonial.industry}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-4 gap-4 p-6 bg-b-surface2 rounded-2xl max-md:grid-cols-2 max-md:gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-h2 text-primary1 mb-1">{stat.value}</div>
                                        <div className="text-small text-t-tertiary">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
