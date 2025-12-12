"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Send, CloseCircle } from "iconsax-react";

type ContactModalProps = {
    open: boolean;
    onClose: () => void;
};

const ContactModal = ({ open, onClose }: ContactModalProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const mailtoLink = `mailto:nidrosoft@outlook.com?subject=${encodeURIComponent(
            subject || "Contact from NanoBrief"
        )}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        window.location.href = mailtoLink;
        
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="relative w-full max-w-3xl p-5 bg-b-surface2 rounded-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-t-tertiary hover:text-t-primary transition-colors z-10"
                >
                    <CloseCircle size={20} variant="Bold" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary1/10 rounded-xl shrink-0">
                        <Send size={20} variant="Bold" color="#2d68ff" />
                    </div>
                    <div>
                        <h2 className="text-body-lg-bold">Get in Touch</h2>
                        <p className="text-small text-t-tertiary">
                            Have a question? We'd love to hear from you.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3 mb-3 max-md:grid-cols-1">
                        <div>
                            <label className="block text-xs font-medium mb-1 text-t-secondary">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                                className="w-full px-3 py-2 bg-b-surface1 border border-stroke-subtle rounded-lg text-small placeholder:text-t-tertiary focus:outline-none focus:border-primary1 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1 text-t-secondary">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="john@example.com"
                                className="w-full px-3 py-2 bg-b-surface1 border border-stroke-subtle rounded-lg text-small placeholder:text-t-tertiary focus:outline-none focus:border-primary1 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs font-medium mb-1 text-t-secondary">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="How can we help?"
                            className="w-full px-3 py-2 bg-b-surface1 border border-stroke-subtle rounded-lg text-small placeholder:text-t-tertiary focus:outline-none focus:border-primary1 transition-colors"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1 text-t-secondary">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={3}
                            placeholder="Tell us what's on your mind..."
                            className="w-full px-3 py-2 bg-b-surface1 border border-stroke-subtle rounded-lg text-small placeholder:text-t-tertiary focus:outline-none focus:border-primary1 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-t-tertiary">
                            Opens your email client
                        </p>
                        <Button type="submit" isSecondary>
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ContactModal;
