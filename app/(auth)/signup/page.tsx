"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Image from "@/components/Image";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignUp = () => {
        setIsLoading(true);
        // TODO: Implement Google OAuth with Supabase
        setTimeout(() => {
            router.push("/onboarding");
        }, 1000);
    };

    const handleEmailSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement email sign up with Supabase
        setTimeout(() => {
            router.push("/onboarding");
        }, 1000);
    };

    return (
        <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover">
            <div className="mb-8 text-center">
                <h1 className="text-h3 mb-2">Create your account</h1>
                <p className="text-body text-t-secondary">
                    Start creating professional briefs in minutes
                </p>
            </div>

            {/* Google Sign Up */}
            <Button
                className="w-full mb-6"
                isPrimary
                onClick={handleGoogleSignUp}
                disabled={isLoading}
            >
                <Image
                    className="w-5 h-5 mr-2 opacity-100"
                    src="/images/google.svg"
                    width={20}
                    height={20}
                    alt="Google"
                />
                Continue with Google
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-stroke-subtle"></div>
                <span className="text-small text-t-tertiary">or</span>
                <div className="flex-1 h-px bg-stroke-subtle"></div>
            </div>

            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignUp}>
                <Field
                    className="mb-4"
                    label="Full name"
                    placeholder="Enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Field
                    className="mb-4"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Field
                    className="mb-6"
                    label="Password"
                    placeholder="Create a password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    className="w-full"
                    isSecondary
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            {/* Terms */}
            <p className="mt-4 text-center text-small text-t-tertiary">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-t-secondary hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-t-secondary hover:underline">
                    Privacy Policy
                </Link>
            </p>

            {/* Sign in link */}
            <p className="mt-6 text-center text-small text-t-secondary">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-t-primary font-medium hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
