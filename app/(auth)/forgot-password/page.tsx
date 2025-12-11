"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement password reset with Supabase
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1000);
    };

    if (isSubmitted) {
        return (
            <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-primary2/10 rounded-2xl">
                    <Icon className="w-8 h-8 fill-primary2" name="check" />
                </div>
                <h1 className="text-h3 mb-2">Check your email</h1>
                <p className="text-body text-t-secondary mb-6">
                    We've sent a password reset link to{" "}
                    <span className="text-t-primary font-medium">{email}</span>
                </p>
                <p className="text-small text-t-tertiary mb-6">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary1 hover:underline"
                    >
                        try again
                    </button>
                </p>
                <Button as="link" href="/login" isSecondary className="w-full">
                    Back to sign in
                </Button>
            </div>
        );
    }

    return (
        <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover">
            <div className="mb-8 text-center">
                <h1 className="text-h3 mb-2">Forgot password?</h1>
                <p className="text-body text-t-secondary">
                    No worries, we'll send you reset instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Field
                    className="mb-6"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button
                    className="w-full mb-4"
                    isSecondary
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Reset password"}
                </Button>
            </form>

            <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-small text-t-secondary hover:text-t-primary transition-colors"
            >
                <Icon className="fill-current rotate-180 w-4 h-4" name="arrow" />
                Back to sign in
            </Link>
        </div>
    );
}
