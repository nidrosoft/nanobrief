"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        // TODO: Implement Google OAuth with Supabase
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement email sign in with Supabase
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover">
            <div className="mb-8 text-center">
                <h1 className="text-h3 mb-2">Welcome back</h1>
                <p className="text-body text-t-secondary">
                    Sign in to continue to NanoBrief
                </p>
            </div>

            {/* Google Sign In */}
            <Button
                className="w-full mb-6"
                isPrimary
                onClick={handleGoogleSignIn}
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

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn}>
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
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="flex justify-end mb-6">
                    <Link
                        href="/forgot-password"
                        className="text-small text-primary1 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    className="w-full"
                    isSecondary
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </Button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-small text-t-secondary">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="text-t-primary font-medium hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
