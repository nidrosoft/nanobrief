"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "@/components/Select";
import { createClient } from "@/lib/supabase/client";
import { 
    Magicpen, 
    Brush2, 
    VideoPlay, 
    Edit, 
    Calendar, 
    Briefcase, 
    Add, 
    DocumentText, 
    ArrowRight2,
    Grid2,
    Menu,
    Building,
    Microphone2,
    Judge,
    Setting4,
    Icon as IconType
} from "iconsax-react";

const industries = [
    { id: "all", name: "All industries" },
    { id: "marketing", name: "Marketing & Advertising" },
    { id: "design", name: "Design & Creative" },
    { id: "video", name: "Video Production" },
    { id: "content", name: "Content & SEO" },
    { id: "events", name: "Event Planning" },
    { id: "consulting", name: "Consulting" },
    { id: "architecture", name: "Architecture & Construction" },
    { id: "pr", name: "Public Relations" },
    { id: "legal", name: "Legal Services" },
];

const sortOptions = [
    { id: 0, name: "Most recent" },
    { id: 1, name: "Oldest first" },
    { id: 2, name: "A-Z" },
];

interface Brief {
    id: string;
    title: string;
    industry_id: string;
    created_at: string;
    updated_at: string;
    status: string;
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

const industryBgColors: Record<string, string> = {
    marketing: "bg-primary1/10",
    design: "bg-accent2/10",
    video: "bg-primary3/10",
    content: "bg-primary2/10",
    events: "bg-accent/10",
    consulting: "bg-primary1/10",
    architecture: "bg-[#6366f1]/10",
    pr: "bg-[#f59e0b]/10",
    legal: "bg-[#64748b]/10",
    custom: "bg-primary1/10",
};

export default function BriefsPage() {
    const supabase = createClient();
    const [activeIndustry, setActiveIndustry] = useState("all");
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBriefs = async () => {
            const { data } = await supabase
                .from("briefs")
                .select("*")
                .order("updated_at", { ascending: false });

            if (data) {
                setBriefs(data);
            }
            setIsLoading(false);
        };

        loadBriefs();
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

    const filteredBriefs = briefs.filter(
        (brief) => activeIndustry === "all" || brief.industry_id === activeIndustry
    );

    // Sort briefs
    const sortedBriefs = [...filteredBriefs].sort((a, b) => {
        if (sortBy.id === 0) return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        if (sortBy.id === 1) return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        if (sortBy.id === 2) return a.title.localeCompare(b.title);
        return 0;
    });

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
                <div>
                    <h1 className="text-h1 mb-1">My Briefs</h1>
                    <p className="text-body text-t-secondary">
                        {filteredBriefs.length} brief{filteredBriefs.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary1 text-white rounded-xl hover:bg-primary1/90 transition-colors"
                >
                    <Add size={20} color="#ffffff" />
                    <span className="text-body-bold">New Brief</span>
                </Link>
            </div>

            {/* Industry filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {industries.map((industry) => (
                    <button
                        key={industry.id}
                        onClick={() => setActiveIndustry(industry.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                            activeIndustry === industry.id
                                ? "bg-primary1 text-white"
                                : "bg-b-surface2 text-t-secondary hover:text-t-primary"
                        }`}
                    >
                        {industry.name}
                    </button>
                ))}
            </div>

            {/* Sort and view controls - right aligned */}
            <div className="flex items-center justify-end gap-3 mb-6">
                <Select
                    className="min-w-32"
                    value={sortBy}
                    onChange={setSortBy}
                    options={sortOptions}
                />
                <div className="flex bg-b-surface2 rounded-lg p-0.5">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded-md transition-colors ${
                            viewMode === "grid"
                                ? "bg-b-surface1"
                                : ""
                        }`}
                    >
                        <Grid2 size={18} variant={viewMode === "grid" ? "Bold" : "Linear"} color={viewMode === "grid" ? "#2d68ff" : "#8E8E93"} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded-md transition-colors ${
                            viewMode === "list"
                                ? "bg-b-surface1"
                                : ""
                        }`}
                    >
                        <Menu size={18} variant={viewMode === "list" ? "Bold" : "Linear"} color={viewMode === "list" ? "#2d68ff" : "#8E8E93"} />
                    </button>
                </div>
            </div>

            {/* Briefs Grid/List */}
            {isLoading ? (
                <div className="flex items-center justify-center p-16">
                    <div className="animate-spin w-8 h-8 border-2 border-primary1 border-t-transparent rounded-full"></div>
                </div>
            ) : sortedBriefs.length > 0 ? (
                viewMode === "grid" ? (
                    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                        {sortedBriefs.map((brief) => {
                            const BriefIcon = industryIcons[brief.industry_id] || DocumentText;
                            const bgColor = industryBgColors[brief.industry_id] || "bg-primary1/10";
                            const iconColor = industryColors[brief.industry_id] || "#2d68ff";
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="group p-6 bg-b-surface2 rounded-3xl hover:shadow-hover transition-all"
                                >
                                    <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-2xl ${bgColor}`}>
                                        <BriefIcon size={24} variant="Bold" color={iconColor} />
                                    </div>
                                    <h3 className="text-body-bold mb-1 truncate group-hover:text-primary1 transition-colors">
                                        {brief.title}
                                    </h3>
                                    <p className="text-small text-t-tertiary mb-3">
                                        {industryNames[brief.industry_id] || "Brief"}
                                    </p>
                                    <div className="flex items-center justify-between text-small text-t-tertiary">
                                        <span>Updated {getTimeAgo(brief.updated_at)}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {sortedBriefs.map((brief) => {
                            const BriefIcon = industryIcons[brief.industry_id] || DocumentText;
                            const bgColor = industryBgColors[brief.industry_id] || "bg-primary1/10";
                            const iconColor = industryColors[brief.industry_id] || "#2d68ff";
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="flex items-center gap-4 p-4 bg-b-surface2 rounded-2xl hover:shadow-hover transition-all"
                                >
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${bgColor}`}>
                                        <BriefIcon size={20} variant="Bold" color={iconColor} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-body-bold truncate">
                                            {brief.title}
                                        </h3>
                                        <p className="text-small text-t-tertiary">
                                            {industryNames[brief.industry_id] || "Brief"}
                                        </p>
                                    </div>
                                    <span className="text-small text-t-tertiary shrink-0 max-md:hidden">
                                        {new Date(brief.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="text-small text-t-tertiary shrink-0">
                                        {getTimeAgo(brief.updated_at)}
                                    </span>
                                    <ArrowRight2 size={20} color="#8E8E93" className="shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center p-16 bg-b-surface2 rounded-3xl text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 bg-b-surface1 rounded-2xl">
                        <DocumentText size={32} variant="Bold" color="#8E8E93" />
                    </div>
                    <h3 className="text-body-bold mb-2">No briefs found</h3>
                    <p className="text-small text-t-tertiary mb-6">
                        {activeIndustry === "all"
                            ? "Create your first brief to get started"
                            : "No briefs in this category yet"}
                    </p>
                    <Link
                        href="/dashboard/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary1 text-white rounded-xl hover:bg-primary1/90 transition-colors"
                    >
                        <Add size={20} color="#ffffff" />
                        <span className="text-body-bold">Create Brief</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
