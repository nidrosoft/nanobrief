"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "@/components/Image";
import ThemeButton from "@/components/ThemeButton";
import Button from "@/components/Button";
import { Home2, DocumentText, Add, Setting2, Star1, Logout, CloseCircle } from "iconsax-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
    { name: "Home", href: "/dashboard", Icon: Home2, activeColor: "#2d68ff", inactiveColor: "#8E8E93" },
    { name: "My Briefs", href: "/dashboard/briefs", Icon: DocumentText, activeColor: "#2d68ff", inactiveColor: "#8E8E93" },
    { name: "New Brief", href: "/dashboard/new", Icon: Add, activeColor: "#ffffff", inactiveColor: "#ffffff" },
    { name: "Settings", href: "/dashboard/settings", Icon: Setting2, activeColor: "#2d68ff", inactiveColor: "#8E8E93" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { signOut } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className="flex min-h-screen bg-b-surface1">
            {/* Floating Sidebar */}
            <aside
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 max-md:hidden"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <div 
                    className={`flex flex-col bg-b-surface2 rounded-2xl shadow-hover overflow-hidden transition-[width] duration-300 ease-out ${
                        isExpanded ? "w-48" : "w-14"
                    }`}
                >
                    {/* Logo */}
                    <div className="p-2 border-b border-stroke-subtle">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-b-highlight transition-colors"
                        >
                            <div className="flex items-center justify-center w-7 h-7 bg-primary1 rounded-md shrink-0">
                                <span className="text-white font-bold text-xs">N</span>
                            </div>
                            <span 
                                className={`text-small font-semibold whitespace-nowrap transition-opacity duration-200 ${
                                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                }`}
                            >
                                NanoBrief
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="p-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || 
                                (item.href !== "/dashboard" && pathname.startsWith(item.href));
                            const isNewBrief = item.name === "New Brief";
                            const IconComponent = item.Icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-2.5 p-1.5 mb-1 rounded-lg transition-colors ${
                                        isNewBrief
                                            ? ""
                                            : isActive
                                            ? "bg-b-highlight text-t-primary"
                                            : "text-t-secondary hover:bg-b-highlight hover:text-t-primary"
                                    }`}
                                >
                                    <div 
                                        className={`flex items-center justify-center w-7 h-7 rounded-md shrink-0 ${
                                            isNewBrief 
                                                ? "bg-primary1" 
                                                : isActive 
                                                ? "bg-b-highlight" 
                                                : ""
                                        }`}
                                    >
                                        <IconComponent
                                            size={18}
                                            variant={isActive || isNewBrief ? "Bold" : "Linear"}
                                            color={isActive || isNewBrief ? item.activeColor : item.inactiveColor}
                                        />
                                    </div>
                                    <span 
                                        className={`text-small font-semibold whitespace-nowrap transition-opacity duration-200 ${
                                            isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Credits & User */}
                    <div className="p-2 border-t border-stroke-subtle">
                        {/* Credits */}
                        <div className="flex items-center gap-2.5 p-1.5 mb-1">
                            <div className="flex items-center justify-center w-7 h-7 bg-primary2/10 rounded-md shrink-0">
                                <Star1 size={16} variant="Bold" color="#00a656" />
                            </div>
                            <div 
                                className={`flex items-center gap-1.5 transition-opacity duration-200 ${
                                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                }`}
                            >
                                <span className="text-xs text-t-secondary">Credits:</span>
                                <span className="text-xs font-bold text-t-primary">1/2</span>
                            </div>
                        </div>

                        {/* User */}
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-2.5 w-full p-1.5 rounded-lg text-t-secondary hover:bg-b-highlight hover:text-t-primary transition-colors"
                        >
                            <div className="flex items-center justify-center w-7 h-7 shrink-0">
                                <Logout size={18} variant="Linear" color="#8E8E93" />
                            </div>
                            <span 
                                className={`text-small font-semibold whitespace-nowrap transition-opacity duration-200 ${
                                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                                }`}
                            >
                                Log out
                            </span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 ml-24 p-6 max-md:ml-0 max-md:pb-24">
                {children}
            </main>

            {/* Mobile bottom navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 hidden max-md:flex bg-b-surface2 border-t border-stroke-subtle">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || 
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const isNewBrief = item.name === "New Brief";
                    const IconComponent = item.Icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 ${
                                isNewBrief
                                    ? "text-primary1"
                                    : isActive
                                    ? "text-t-primary"
                                    : "text-t-tertiary"
                            }`}
                        >
                            <IconComponent
                                size={20}
                                variant={isActive || isNewBrief ? "Bold" : "Linear"}
                                color={isActive ? "#2d68ff" : isNewBrief ? "#2d68ff" : "#8E8E93"}
                            />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Theme toggle */}
            <ThemeButton className="fixed! right-5 bottom-5 z-5 max-md:bottom-20" />

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowLogoutModal(false)}
                    />
                    <div className="relative bg-b-surface2 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="absolute top-4 right-4 text-t-tertiary hover:text-t-primary transition-colors"
                        >
                            <CloseCircle size={24} />
                        </button>
                        
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary3/10 rounded-full">
                                <Logout size={32} color="#ff381c" />
                            </div>
                            <h3 className="text-h3 mb-2">Sign out?</h3>
                            <p className="text-body text-t-secondary">
                                Are you sure you want to sign out of your account?
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                            <Button
                                isStroke
                                className="flex-1"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                isSecondary
                                className="flex-1 !bg-primary3 hover:!bg-primary3/90"
                                onClick={async () => {
                                    setShowLogoutModal(false);
                                    await signOut();
                                }}
                            >
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
