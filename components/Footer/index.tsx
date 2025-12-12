"use client";

import { useState } from "react";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";

const Footer = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <footer className="border-t border-stroke-subtle">
                <div className="center">
                    <div className="flex items-center justify-between h-16 max-md:flex-col max-md:h-auto max-md:py-4 max-md:gap-3">
                        {/* Left links */}
                        <div className="flex items-center gap-6 max-md:gap-4">
                            <Link
                                href="/terms"
                                className="text-small text-t-tertiary hover:text-t-primary transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-small text-t-tertiary hover:text-t-primary transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </div>

                        {/* Center - Made with love */}
                        <div className="text-small text-t-tertiary max-md:order-first">
                            Made with ❤️ by{" "}
                            <a
                                href="https://www.linkedin.com/in/cyriac-zeh/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-t-secondary hover:text-t-primary transition-colors"
                            >
                                Cyriac
                            </a>
                        </div>

                        {/* Right links */}
                        <div className="flex items-center gap-6 max-md:gap-4">
                            <Link
                                href="/cookies"
                                className="text-small text-t-tertiary hover:text-t-primary transition-colors"
                            >
                                Cookie Policy
                            </Link>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="text-small text-t-tertiary hover:text-t-primary transition-colors"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
            <ContactModal
                open={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </>
    );
};

export default Footer;
