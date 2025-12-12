"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { TickCircle, Timer1, Magicpen } from "iconsax-react";

const highlights = [
    "Answer 5-10 smart questions",
    "AI generates comprehensive sections",
    "Professional formatting included",
    "Ready to share in under 2 minutes",
];

const AIDemo = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();
    const isTablet = useMediaQuery("(max-width: 1023px)");
    const isMobile = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 50);
    }, []);

    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="p-1.5 border-[1.5px] border-stroke-subtle rounded-5xl">
                        <div className="flex items-center gap-12 p-12 bg-b-subtle rounded-4xl max-lg:flex-col max-lg:p-8 max-md:p-6">
                            {/* Left side - Content */}
                            <div className="flex-1 max-lg:text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent/10 rounded-full">
                                    <Magicpen size={18} variant="Bold" color="#f52495" />
                                    <span className="text-small font-medium text-accent">
                                        See the magic
                                    </span>
                                </div>
                                
                                <h2 className="mb-5 text-h1">
                                    From questions to<br className="max-lg:hidden" /> professional brief
                                </h2>
                                
                                <p className="mb-8 text-body-lg text-t-secondary max-w-md max-lg:mx-auto">
                                    Watch how NanoBrief transforms your answers into a comprehensive, 
                                    ready-to-use project brief in seconds.
                                </p>

                                <ul className="flex flex-col gap-4 mb-8 max-lg:items-center">
                                    {highlights.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <TickCircle size={22} variant="Bold" color="#00a656" />
                                            <span className="text-body">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center gap-4 max-lg:justify-center">
                                    <Button isSecondary as="link" href="/signup">
                                        Try it yourself
                                    </Button>
                                    <div className="flex items-center gap-2 text-small text-t-tertiary">
                                        <Timer1 size={16} color="#8E8E93" />
                                        <span>Takes ~2 min</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Demo visual */}
                            <div className="flex-1 max-lg:w-full">
                                <div className="relative">
                                    {/* Glow effect */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-primary1/20 via-accent/10 to-accent2/20 rounded-3xl blur-2xl opacity-60" />
                                    
                                    {/* Demo container */}
                                    <div className="relative bg-b-surface2 rounded-2xl overflow-hidden shadow-hover">
                                        {/* Browser chrome */}
                                        <div className="flex items-center gap-2 px-4 py-3 bg-b-surface1 border-b border-stroke-subtle">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-primary3/60" />
                                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                                                <div className="w-3 h-3 rounded-full bg-primary2/60" />
                                            </div>
                                            <div className="flex-1 mx-4">
                                                <div className="h-6 bg-b-subtle rounded-lg flex items-center justify-center">
                                                    <span className="text-xs text-t-tertiary">nanobrief.app/dashboard</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Screenshot */}
                                        <div className="relative">
                                            {isMounted && (
                                                <Image
                                                    className="w-full h-auto"
                                                    src={
                                                        theme === "dark"
                                                            ? isMobile
                                                                ? "/images/hero-pic-dark-mobile-1.png"
                                                                : isTablet
                                                                ? "/images/hero-pic-dark-tablet-1.png"
                                                                : "/images/hero-pic-dark-1.png"
                                                            : isMobile
                                                            ? "/images/hero-pic-light-mobile-1.png"
                                                            : isTablet
                                                            ? "/images/hero-pic-light-tablet-1.png"
                                                            : "/images/hero-pic-light-1.png"
                                                    }
                                                    width={isMobile ? 287 : isTablet ? 544 : 600}
                                                    height={isMobile ? 371 : isTablet ? 464 : 400}
                                                    alt="NanoBrief dashboard preview"
                                                    quality={100}
                                                    unoptimized
                                                />
                                            )}
                                            
                                            {/* Overlay with generation animation hint */}
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 bg-b-surface1/95 backdrop-blur-sm rounded-xl border border-stroke-subtle">
                                                <div className="flex items-center justify-center w-10 h-10 bg-primary1/10 rounded-lg">
                                                    <Magicpen size={20} variant="Bold" color="#2d68ff" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-small font-medium truncate">Generating your brief...</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex-1 h-1.5 bg-b-subtle rounded-full overflow-hidden">
                                                            <div className="h-full w-3/4 bg-gradient-to-r from-primary1 to-accent rounded-full animate-pulse" />
                                                        </div>
                                                        <span className="text-xs text-t-tertiary">75%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDemo;
