"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    Edit, 
    DocumentText, 
    Star1, 
    Clock, 
    ArrowRight2,
    Add
} from "iconsax-react";

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
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-10 max-md:flex-col max-md:items-start max-md:gap-4">
                <div>
                    <h1 className="text-h1 mb-2">Welcome back!</h1>
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

                {recentBriefs.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {recentBriefs.map((brief) => {
                            const BriefIcon = brief.Icon;
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="flex items-center gap-4 p-4 bg-b-surface2 rounded-2xl hover:shadow-hover transition-all"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary1/10 rounded-xl">
                                        <BriefIcon size={24} variant="Bold" color={brief.iconColor} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-body-bold truncate">
                                            {brief.title}
                                        </h3>
                                        <p className="text-small text-t-tertiary">
                                            {brief.industry}
                                        </p>
                                    </div>
                                    <span className="text-small text-t-tertiary shrink-0">
                                        {brief.updatedAt}
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
                    <div className="text-h2">12</div>
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
                    <div className="text-h2">3/5</div>
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
                    <div className="text-h2">4.5h</div>
                </div>
            </div>
        </div>
    );
}
