"use client";

import { OpenAI, Anthropic, Google, Vercel, Cloudflare, Github, Notion, Azure } from "@lobehub/icons";

const LogoBar = () => {
    return (
        <div className="section section-lines before:-top-12! after:-top-12! max-md:before:hidden max-md:after:hidden">
            <div className="mb-6 text-center text-body text-t-secondary/60">
                Powered by industry-leading technology
            </div>
            <div className="relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[1.5px] before:bg-linear-(--gradient-horizontal) after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-linear-(--gradient-horizontal) max-md:before:hidden max-md:after:hidden">
                <div className="center">
                    <div className="flex items-center justify-center gap-8 py-6 max-lg:gap-6 max-md:flex-wrap max-md:gap-4">
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="OpenAI">
                            <OpenAI size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Anthropic">
                            <Anthropic size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Google">
                            <Google.BrandColor size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Vercel">
                            <Vercel size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Cloudflare">
                            <Cloudflare.Color size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="GitHub">
                            <Github size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Notion">
                            <Notion size={24} />
                        </div>
                        <div className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Azure">
                            <Azure.Color size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoBar;
