"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { createClient } from "@/lib/supabase/client";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    DocumentText, 
    Calendar, 
    Briefcase,
    TickCircle
} from "iconsax-react";

const industries = [
    { id: "marketing", name: "Marketing & Advertising", Icon: Magicpen },
    { id: "design", name: "Design & Creative", Icon: Brush2 },
    { id: "video", name: "Video Production", Icon: VideoPlay },
    { id: "content", name: "Content & SEO", Icon: DocumentText },
    { id: "events", name: "Event Planning", Icon: Calendar },
    { id: "consulting", name: "Consulting", Icon: Briefcase },
];

const companySize = [
    { id: "solo", name: "Just me" },
    { id: "small", name: "2-10 people" },
    { id: "medium", name: "11-50 people" },
    { id: "large", name: "51-200 people" },
    { id: "enterprise", name: "200+ people" },
];

const goals = [
    { id: "save-time", name: "Save time on brief creation" },
    { id: "consistency", name: "Create consistent briefs" },
    { id: "client-intake", name: "Streamline client intake" },
    { id: "collaboration", name: "Improve team collaboration" },
    { id: "professionalism", name: "Look more professional" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const supabase = createClient();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Form data
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const totalSteps = 5;

    // Load existing user data on mount
    useEffect(() => {
        const loadUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from("users")
                    .select("full_name")
                    .eq("id", user.id)
                    .single();
                
                if (profile?.full_name) {
                    setFullName(profile.full_name);
                }
            }
        };
        loadUserData();
    }, [supabase]);

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        setIsLoading(true);
        setError("");

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !user) {
                console.error("User error:", userError);
                setError("User not found. Please sign in again.");
                setIsLoading(false);
                return;
            }

            console.log("Updating user:", user.id, {
                full_name: fullName,
                role: role,
                company_name: companyName,
                company_size: selectedSize,
                primary_industry: selectedIndustry,
                goals: selectedGoals,
            });

            // Update user profile with onboarding data
            const { data: updateData, error: updateError } = await supabase
                .from("users")
                .update({
                    full_name: fullName,
                    role: role,
                    company_name: companyName,
                    company_size: selectedSize,
                    primary_industry: selectedIndustry,
                    goals: selectedGoals,
                    onboarding_completed: true,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id)
                .select();

            console.log("Update result:", updateData, updateError);

            if (updateError) {
                console.error("Update error:", updateError);
                setError(updateError.message);
                setIsLoading(false);
                return;
            }

            // Force a small delay to ensure the update is committed
            await new Promise(resolve => setTimeout(resolve, 100));

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            console.error("Unexpected error:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const toggleGoal = (goalId: string) => {
        setSelectedGoals((prev) =>
            prev.includes(goalId)
                ? prev.filter((g) => g !== goalId)
                : [...prev, goalId]
        );
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return true; // Welcome step, always can proceed
            case 2:
                return fullName.trim() !== "";
            case 3:
                return companyName.trim() !== "" && selectedSize !== "";
            case 4:
                return selectedIndustry !== "";
            case 5:
                return selectedGoals.length > 0;
            default:
                return true;
        }
    };

    return (
        <div className="w-full max-w-xl">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-small text-t-secondary">
                        Step {step} of {totalSteps}
                    </span>
                    <span className="text-small text-t-tertiary">
                        {Math.round((step / totalSteps) * 100)}% complete
                    </span>
                </div>
                <div className="h-2 bg-b-surface2 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary1 rounded-full transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step content */}
            <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-primary3/10 border border-primary3/20 rounded-xl text-primary3 text-small">
                        {error}
                    </div>
                )}

                {/* Step 1: Welcome */}
                {step === 1 && (
                    <div className="text-center">
                        <div className="mb-6 text-6xl">👋</div>
                        <h1 className="text-h2 mb-4">Welcome to NanoBrief!</h1>
                        <p className="text-body text-t-secondary mb-8">
                            Let's get you set up in just a few quick steps. This
                            will help us personalize your experience and create
                            better briefs for you.
                        </p>
                    </div>
                )}

                {/* Step 2: Profile */}
                {step === 2 && (
                    <div>
                        <h1 className="text-h3 mb-2">Tell us about yourself</h1>
                        <p className="text-body text-t-secondary mb-8">
                            We'd love to know who we're working with.
                        </p>
                        <Field
                            className="mb-4"
                            label="Full name"
                            placeholder="Enter your name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            isLarge
                            required
                        />
                        <Field
                            label="Your role"
                            placeholder="e.g. Project Manager, Designer, Founder"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            isLarge
                        />
                    </div>
                )}

                {/* Step 3: Company */}
                {step === 3 && (
                    <div>
                        <h1 className="text-h3 mb-2">About your company</h1>
                        <p className="text-body text-t-secondary mb-8">
                            Help us understand your organization.
                        </p>
                        <Field
                            className="mb-6"
                            label="Company name"
                            placeholder="Enter your company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            isLarge
                            required
                        />
                        <div>
                            <label className="block mb-3 text-body-bold">
                                Company size
                            </label>
                            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                {companySize.map((size) => (
                                    <button
                                        key={size.id}
                                        type="button"
                                        onClick={() => setSelectedSize(size.id)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                            selectedSize === size.id
                                                ? "border-primary1 bg-primary1/5"
                                                : "border-stroke-subtle hover:border-stroke2"
                                        }`}
                                    >
                                        <span className="text-body-bold">
                                            {size.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Industry */}
                {step === 4 && (
                    <div>
                        <h1 className="text-h3 mb-2">Your primary industry</h1>
                        <p className="text-body text-t-secondary mb-8">
                            What type of briefs will you create most often?
                        </p>
                        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                            {industries.map((industry) => {
                                const IndustryIcon = industry.Icon;
                                return (
                                    <button
                                        key={industry.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedIndustry(industry.id)
                                        }
                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                                            selectedIndustry === industry.id
                                                ? "border-primary1 bg-primary1/5"
                                                : "border-stroke-subtle hover:border-stroke2"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                                                selectedIndustry === industry.id
                                                    ? "bg-primary1/10"
                                                    : "bg-b-surface1"
                                            }`}
                                        >
                                            <IndustryIcon
                                                size={20}
                                                variant="Bold"
                                                color={selectedIndustry === industry.id ? "#2d68ff" : "#8E8E93"}
                                            />
                                        </div>
                                        <span className="text-body-bold">
                                            {industry.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 5: Goals */}
                {step === 5 && (
                    <div>
                        <h1 className="text-h3 mb-2">What are your goals?</h1>
                        <p className="text-body text-t-secondary mb-8">
                            Select all that apply. This helps us tailor your
                            experience.
                        </p>
                        <div className="flex flex-col gap-3">
                            {goals.map((goal) => (
                                <button
                                    key={goal.id}
                                    type="button"
                                    onClick={() => toggleGoal(goal.id)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                                        selectedGoals.includes(goal.id)
                                            ? "border-primary1 bg-primary1/5"
                                            : "border-stroke-subtle hover:border-stroke2"
                                    }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-6 h-6 rounded-lg border-2 ${
                                            selectedGoals.includes(goal.id)
                                                ? "border-primary1 bg-primary1"
                                                : "border-stroke2"
                                        }`}
                                    >
                                        {selectedGoals.includes(goal.id) && (
                                            <TickCircle
                                                size={16}
                                                variant="Bold"
                                                color="#ffffff"
                                            />
                                        )}
                                    </div>
                                    <span className="text-body-bold">
                                        {goal.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 mt-8">
                    {step > 1 && (
                        <Button
                            className="flex-1"
                            isStroke
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        className="flex-1"
                        isSecondary
                        onClick={handleNext}
                        disabled={!canProceed() || isLoading}
                    >
                        {isLoading
                            ? "Setting up..."
                            : step === totalSteps
                            ? "Get started"
                            : "Continue"}
                    </Button>
                </div>

                {/* Skip option */}
                {step === 1 && (
                    <button
                        className="w-full mt-4 text-center text-small text-t-tertiary hover:text-t-secondary transition-colors"
                        onClick={() => router.push("/dashboard")}
                    >
                        Skip for now
                    </button>
                )}
            </div>
        </div>
    );
}
