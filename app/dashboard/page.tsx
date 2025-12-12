"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    Edit, 
    DocumentText, 
    Star1, 
    Clock, 
    ArrowRight2,
    Add,
    Calendar,
    Briefcase,
    Building,
    Microphone2,
    Judge,
    Setting4
} from "iconsax-react";

interface Brief {
    id: string;
    title: string;
    industry_id: string;
    created_at: string;
    updated_at: string;
}

interface UserStats {
    total_briefs: number;
    briefs_used: number;
    briefs_limit: number;
    briefs_remaining: number;
}

const industryIcons: Record<string, typeof Magicpen> = {
    marketing: Magicpen,
    design: Brush2,
    video: VideoPlay,
    content: Edit,
    events: Calendar,
    consulting: Briefcase,
    architecture: Building,
    pr: Microphone2,
    legal: Judge,
    custom: Setting4,
};

const industryColors: Record<string, string> = {
    marketing: "#2d68ff",
    design: "#a444f3",
    video: "#ff381c",
    content: "#00a656",
    events: "#f52495",
    consulting: "#2d68ff",
    architecture: "#6366f1",
    pr: "#f59e0b",
    legal: "#64748b",
    custom: "#2d68ff",
};

const industryNames: Record<string, string> = {
    marketing: "Marketing & Advertising",
    design: "Design & Creative",
    video: "Video Production",
    content: "Content & SEO",
    events: "Event Planning",
    consulting: "Consulting",
    architecture: "Architecture",
    pr: "Public Relations",
    legal: "Legal Services",
    custom: "Custom",
};

const recentBriefs = [
    {
        id: "1",
        title: "Q4 Marketing Campaign",
        industry: "Marketing & Advertising",
        updatedAt: "2 hours ago",
        Icon: Magicpen,
        iconColor: "#2d68ff",
    },
    {
        id: "2",
        title: "Website Redesign Project",
        industry: "Design & Creative",
        updatedAt: "Yesterday",
        Icon: Brush2,
        iconColor: "#a444f3",
    },
    {
        id: "3",
        title: "Product Launch Video",
        industry: "Video Production",
        updatedAt: "3 days ago",
        Icon: VideoPlay,
        iconColor: "#ff381c",
    },
];

const quickActions = [
    {
        title: "Marketing Brief",
        description: "Campaign, brand launch, social media",
        Icon: Magicpen,
        href: "/dashboard/new/marketing",
        bgColor: "bg-primary1/10",
        iconColor: "#2d68ff",
    },
    {
        title: "Design Brief",
        description: "Branding, web design, UX/UI",
        Icon: Brush2,
        href: "/dashboard/new/design",
        bgColor: "bg-accent2/10",
        iconColor: "#a444f3",
    },
    {
        title: "Video Brief",
        description: "Commercial, corporate, event",
        Icon: VideoPlay,
        href: "/dashboard/new/video",
        bgColor: "bg-primary3/10",
        iconColor: "#ff381c",
    },
    {
        title: "Content Brief",
        description: "Blog posts, SEO, articles",
        Icon: Edit,
        href: "/dashboard/new/content",
        bgColor: "bg-primary2/10",
        iconColor: "#00a656",
    },
];

export default function DashboardPage() {
    const { profile } = useAuth();
    const supabase = createClient();
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [stats, setStats] = useState<UserStats>({ total_briefs: 0, briefs_used: 0, briefs_limit: 5, briefs_remaining: 5 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // Load recent briefs
            const { data: briefsData } = await supabase
                .from("briefs")
                .select("id, title, industry_id, created_at, updated_at")
                .order("updated_at", { ascending: false })
                .limit(5);

            if (briefsData) {
                setBriefs(briefsData);
            }

            // Load user stats
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: statsData } = await supabase.rpc("get_user_stats", { p_user_id: user.id });
                if (statsData) {
                    setStats(statsData);
                }
            }

            setIsLoading(false);
        };

        loadData();
    }, [supabase]);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const firstName = profile?.full_name?.split(" ")[0] || "there";

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 max-md:flex-col max-md:items-start max-md:gap-4">
                <div>
                    <h1 className="text-h1 mb-2">Welcome back, {firstName}!</h1>
                    <p className="text-body-lg text-t-secondary">
                        Create professional briefs in minutes with AI assistance.
                    </p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="flex items-center gap-2 px-5 py-3 bg-primary1 text-white rounded-xl hover:bg-primary1/90 transition-colors"
                >
                    <Add size={20} color="#ffffff" />
                    <span className="text-body-bold">Create Brief</span>
                </Link>
            </div>

            {/* Quick Actions */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h4">Quick start</h2>
                    <Link
                        href="/dashboard/new"
                        className="text-small text-primary1 hover:underline"
                    >
                        View all industries →
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {quickActions.map((action) => {
                        const IconComponent = action.Icon;
                        return (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="group p-6 bg-b-surface2 rounded-3xl hover:shadow-hover transition-all"
                            >
                                <div
                                    className={`flex items-center justify-center w-12 h-12 mb-4 rounded-2xl ${action.bgColor}`}
                                >
                                    <IconComponent size={24} variant="Bold" color={action.iconColor} />
                                </div>
                                <h3 className="text-body-bold mb-1 group-hover:text-primary1 transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-small text-t-tertiary">
                                    {action.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Briefs */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h4">Recent briefs</h2>
                    <Link
                        href="/dashboard/briefs"
                        className="text-small text-primary1 hover:underline"
                    >
                        View all →
                    </Link>
                </div>

                {briefs.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {briefs.map((brief) => {
                            const BriefIcon = industryIcons[brief.industry_id] || DocumentText;
                            const iconColor = industryColors[brief.industry_id] || "#8E8E93";
                            const industryName = industryNames[brief.industry_id] || "Brief";
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="flex items-center gap-4 p-4 bg-b-surface2 rounded-2xl hover:shadow-hover transition-all"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary1/10 rounded-xl">
                                        <BriefIcon size={24} variant="Bold" color={iconColor} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-body-bold truncate">
                                            {brief.title}
                                        </h3>
                                        <p className="text-small text-t-tertiary">
                                            {industryName}
                                        </p>
                                    </div>
                                    <span className="text-small text-t-tertiary shrink-0">
                                        {getTimeAgo(brief.updated_at)}
                                    </span>
                                    <ArrowRight2 size={20} color="#8E8E93" className="shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-b-surface2 rounded-3xl text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-b-surface1 rounded-2xl">
                            <DocumentText size={32} variant="Bold" color="#8E8E93" />
                        </div>
                        <h3 className="text-body-bold mb-2">No briefs yet</h3>
                        <p className="text-small text-t-tertiary mb-6">
                            Create your first brief to get started
                        </p>
                        <Button as="link" href="/dashboard/new" isSecondary>
                            Create brief
                        </Button>
                    </div>
                )}
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <div className="p-6 bg-b-surface2 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary1/10 rounded-xl">
                            <DocumentText size={20} variant="Bold" color="#2d68ff" />
                        </div>
                        <span className="text-small text-t-secondary">
                            Briefs created
                        </span>
                    </div>
                    <div className="text-h2">{stats.total_briefs}</div>
                </div>
                <div className="p-6 bg-b-surface2 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary2/10 rounded-xl">
                            <Star1 size={20} variant="Bold" color="#00a656" />
                        </div>
                        <span className="text-small text-t-secondary">
                            Credits remaining
                        </span>
                    </div>
                    <div className="text-h2">{stats.briefs_remaining}/{stats.briefs_limit}</div>
                </div>
                <div className="p-6 bg-b-surface2 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl">
                            <Clock size={20} variant="Bold" color="#f52495" />
                        </div>
                        <span className="text-small text-t-secondary">
                            Time saved
                        </span>
                    </div>
                    <div className="text-h2">{(stats.total_briefs * 0.5).toFixed(1)}h</div>
                </div>
            </div>
        </div>
    );
}
