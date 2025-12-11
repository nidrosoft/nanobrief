"use client";

import { useState } from "react";
import Link from "next/link";
import Select from "@/components/Select";
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

const briefs = [
    {
        id: "1",
        title: "Q4 Marketing Campaign",
        industry: "marketing",
        industryName: "Marketing & Advertising",
        updatedAt: "2 hours ago",
        createdAt: "Dec 10, 2024",
        Icon: Magicpen,
        iconColor: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        id: "2",
        title: "Website Redesign Project",
        industry: "design",
        industryName: "Design & Creative",
        updatedAt: "Yesterday",
        createdAt: "Dec 9, 2024",
        Icon: Brush2,
        iconColor: "#a444f3",
        bgColor: "bg-accent2/10",
    },
    {
        id: "3",
        title: "Product Launch Video",
        industry: "video",
        industryName: "Video Production",
        updatedAt: "3 days ago",
        createdAt: "Dec 7, 2024",
        Icon: VideoPlay,
        iconColor: "#ff381c",
        bgColor: "bg-primary3/10",
    },
    {
        id: "4",
        title: "SEO Content Strategy",
        industry: "content",
        industryName: "Content & SEO",
        updatedAt: "1 week ago",
        createdAt: "Dec 3, 2024",
        Icon: Edit,
        iconColor: "#00a656",
        bgColor: "bg-primary2/10",
    },
    {
        id: "5",
        title: "Annual Company Summit",
        industry: "events",
        industryName: "Event Planning",
        updatedAt: "2 weeks ago",
        createdAt: "Nov 26, 2024",
        Icon: Calendar,
        iconColor: "#f52495",
        bgColor: "bg-accent/10",
    },
    {
        id: "6",
        title: "Digital Transformation Initiative",
        industry: "consulting",
        industryName: "Consulting",
        updatedAt: "3 weeks ago",
        createdAt: "Nov 19, 2024",
        Icon: Briefcase,
        iconColor: "#2d68ff",
        bgColor: "bg-primary1/10",
    },
    {
        id: "7",
        title: "Downtown Office Tower",
        industry: "architecture",
        industryName: "Architecture & Construction",
        updatedAt: "4 days ago",
        createdAt: "Dec 6, 2024",
        Icon: Building,
        iconColor: "#6366f1",
        bgColor: "bg-[#6366f1]/10",
    },
    {
        id: "8",
        title: "Product Launch PR Campaign",
        industry: "pr",
        industryName: "Public Relations",
        updatedAt: "5 days ago",
        createdAt: "Dec 5, 2024",
        Icon: Microphone2,
        iconColor: "#f59e0b",
        bgColor: "bg-[#f59e0b]/10",
    },
    {
        id: "9",
        title: "Estate Planning - Smith Family",
        industry: "legal",
        industryName: "Legal Services",
        updatedAt: "1 week ago",
        createdAt: "Dec 3, 2024",
        Icon: Judge,
        iconColor: "#64748b",
        bgColor: "bg-[#64748b]/10",
    },
];

export default function BriefsPage() {
    const [activeIndustry, setActiveIndustry] = useState("all");
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredBriefs = briefs.filter(
        (brief) => activeIndustry === "all" || brief.industry === activeIndustry
    );

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
            {filteredBriefs.length > 0 ? (
                viewMode === "grid" ? (
                    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                        {filteredBriefs.map((brief) => {
                            const BriefIcon = brief.Icon;
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="group p-6 bg-b-surface2 rounded-3xl hover:shadow-hover transition-all"
                                >
                                    <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-2xl ${brief.bgColor}`}>
                                        <BriefIcon size={24} variant="Bold" color={brief.iconColor} />
                                    </div>
                                    <h3 className="text-body-bold mb-1 truncate group-hover:text-primary1 transition-colors">
                                        {brief.title}
                                    </h3>
                                    <p className="text-small text-t-tertiary mb-3">
                                        {brief.industryName}
                                    </p>
                                    <div className="flex items-center justify-between text-small text-t-tertiary">
                                        <span>Updated {brief.updatedAt}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredBriefs.map((brief) => {
                            const BriefIcon = brief.Icon;
                            return (
                                <Link
                                    key={brief.id}
                                    href={`/dashboard/briefs/${brief.id}`}
                                    className="flex items-center gap-4 p-4 bg-b-surface2 rounded-2xl hover:shadow-hover transition-all"
                                >
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${brief.bgColor}`}>
                                        <BriefIcon size={20} variant="Bold" color={brief.iconColor} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-body-bold truncate">
                                            {brief.title}
                                        </h3>
                                        <p className="text-small text-t-tertiary">
                                            {brief.industryName}
                                        </p>
                                    </div>
                                    <span className="text-small text-t-tertiary shrink-0 max-md:hidden">
                                        {brief.createdAt}
                                    </span>
                                    <span className="text-small text-t-tertiary shrink-0">
                                        {brief.updatedAt}
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
