"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft2, Edit2, ExportSquare, DocumentDownload, Sms, Refresh, CloseCircle, Copy } from "iconsax-react";

interface BriefSection {
    id: string;
    title: string;
    content: string;
    section_type: "text" | "list" | "table" | "structured";
    section_data: any;
    sort_order: number;
}

interface Brief {
    id: string;
    title: string;
    industry_id: string;
    client_name: string | null;
    created_at: string;
    status: string;
}

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

export default function BriefViewPage() {
    const params = useParams();
    const router = useRouter();
    const supabase = createClient();
    const [showShareModal, setShowShareModal] = useState(false);
    const [brief, setBrief] = useState<Brief | null>(null);
    const [sections, setSections] = useState<BriefSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const briefId = params.id as string;

    useEffect(() => {
        const loadBrief = async () => {
            // Load brief
            const { data: briefData } = await supabase
                .from("briefs")
                .select("*")
                .eq("id", briefId)
                .single();

            if (briefData) {
                setBrief(briefData);
            }

            // Load sections
            const { data: sectionsData } = await supabase
                .from("brief_sections")
                .select("*")
                .eq("brief_id", briefId)
                .order("sort_order", { ascending: true });

            if (sectionsData) {
                setSections(sectionsData);
            }

            setIsLoading(false);
        };

        loadBrief();
    }, [briefId, supabase]);

    const shareLink = `https://nanobrief.app/share/${briefId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
    };

    const handleDownload = () => {
        console.log("Downloading brief...");
    };

    const handleEmail = () => {
        if (!brief) return;
        const subject = encodeURIComponent(`Brief: ${brief.title}`);
        const body = encodeURIComponent(`Check out this brief: ${shareLink}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleRegenerate = () => {
        console.log("Regenerating brief...");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Render section content based on type
    const renderSectionContent = (section: BriefSection) => {
        const { section_type, content, section_data } = section;

        // For list type with items
        if (section_type === "list" && section_data?.length > 0) {
            return (
                <ul className="space-y-2">
                    {section_data.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-body text-t-secondary">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary1 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        // For table type with headers and rows
        if (section_type === "table" && section_data?.headers && section_data?.rows) {
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-stroke-subtle">
                                {section_data.headers.map((header: string, idx: number) => (
                                    <th key={idx} className="py-3 px-4 text-small font-semibold text-t-primary">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {section_data.rows.map((row: string[], rowIdx: number) => (
                                <tr key={rowIdx} className="border-b border-stroke-subtle last:border-0">
                                    {row.map((cell: string, cellIdx: number) => (
                                        <td key={cellIdx} className="py-3 px-4 text-body text-t-secondary">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // For structured type with key-value pairs
        if (section_type === "structured" && section_data && typeof section_data === "object") {
            return (
                <div className="space-y-3">
                    {Object.entries(section_data).map(([key, value], idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                            <span className="text-small font-semibold text-t-primary min-w-[140px]">{key}:</span>
                            <span className="text-body text-t-secondary">{String(value)}</span>
                        </div>
                    ))}
                </div>
            );
        }

        // Default: render as formatted text
        // Parse markdown-like formatting for better display
        const formattedContent = content
            .split('\n')
            .map((line, idx) => {
                // Bold text
                const boldRegex = /\*\*(.+?)\*\*/g;
                let processedLine = line.replace(boldRegex, '<strong class="font-semibold text-t-primary">$1</strong>');
                
                // Bullet points
                if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                    const bulletContent = line.replace(/^[\s]*[•-]\s*/, '');
                    return (
                        <div key={idx} className="flex items-start gap-3 mb-1">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary1 shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: bulletContent.replace(boldRegex, '<strong class="font-semibold text-t-primary">$1</strong>') }} />
                        </div>
                    );
                }
                
                // Regular line
                if (line.trim()) {
                    return (
                        <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />
                    );
                }
                
                return <br key={idx} />;
            });

        return <div className="text-body text-t-secondary">{formattedContent}</div>;
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary1 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-t-secondary">Loading brief...</p>
                </div>
            </div>
        );
    }

    if (!brief) {
        return (
            <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-h3 mb-2">Brief not found</h2>
                    <p className="text-t-secondary mb-4">This brief may have been deleted or doesn't exist.</p>
                    <Button as="link" href="/dashboard/briefs" isSecondary>
                        Back to briefs
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-24">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/briefs")}
                    className="flex items-center gap-2 text-small text-t-secondary hover:text-t-primary mb-4"
                >
                    <ArrowLeft2 size={16} color="#8E8E93" />
                    Back to briefs
                </button>
                <div className="flex items-start justify-between gap-4 max-md:flex-col">
                    <div>
                        <h1 className="text-h2 mb-2">{brief.title}</h1>
                        <div className="flex items-center gap-3 text-small text-t-secondary">
                            <span>{industryNames[brief.industry_id] || "Brief"}</span>
                            {brief.client_name && (
                                <>
                                    <span>•</span>
                                    <span>{brief.client_name}</span>
                                </>
                            )}
                            <span>•</span>
                            <span>{formatDate(brief.created_at)}</span>
                        </div>
                    </div>
                    <Button
                        as="link"
                        href={`/dashboard/new/${brief.industry_id}`}
                        isStroke
                        className="shrink-0"
                    >
                        <Edit2 size={20} color="#8E8E93" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Brief Content */}
            <div className="p-8 bg-b-surface2 rounded-4xl shadow-hover mb-8 max-md:p-6">
                {sections.length > 0 ? (
                    sections.map((section, index) => (
                        <div
                            key={section.id}
                            className={`${
                                index !== sections.length - 1
                                    ? "mb-8 pb-8 border-b border-stroke-subtle"
                                    : ""
                            }`}
                        >
                            <h2 className="text-h4 mb-4">{section.title}</h2>
                            {renderSectionContent(section)}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-t-secondary">No content available for this brief.</p>
                    </div>
                )}
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 p-2 bg-b-surface2 rounded-full shadow-hover max-md:bottom-20">
                <button
                    onClick={() => setShowShareModal(true)}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <ExportSquare size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Share</span>
                </button>
                <button
                    onClick={handleDownload}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <DocumentDownload size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Download</span>
                </button>
                <button
                    onClick={handleEmail}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <Sms size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Email</span>
                </button>
                <button
                    onClick={handleRegenerate}
                    className="group flex items-center gap-2 px-4 py-3 rounded-full hover:bg-b-surface1 transition-colors"
                >
                    <Refresh size={20} color="#8E8E93" />
                    <span className="text-small font-medium max-md:hidden">Regenerate</span>
                </button>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="w-full max-w-md p-6 bg-b-surface2 rounded-3xl shadow-hover">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-h4">Share Brief</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="p-2 rounded-xl hover:bg-b-surface1 transition-colors"
                            >
                                <CloseCircle size={24} color="#8E8E93" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-small text-t-secondary">
                                Share link
                            </label>
                            <div className="flex items-center gap-2 p-3 bg-b-surface1 rounded-xl">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 bg-transparent text-small text-t-secondary outline-none"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 rounded-lg hover:bg-b-surface2 transition-colors"
                                >
                                    <Copy size={20} color="#8E8E93" />
                                </button>
                            </div>
                        </div>
                        <Button
                            className="w-full"
                            isSecondary
                            onClick={() => setShowShareModal(false)}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
