"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { Camera, ArrowRight2, Logout, CloseCircle } from "iconsax-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
    const { profile, signOut, refreshProfile } = useAuth();
    const supabase = createClient();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (profile) {
            setName(profile.full_name || "");
            setEmail(profile.email || "");
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        if (!profile) return;
        setIsSaving(true);
        setMessage("");

        const { error } = await supabase
            .from("users")
            .update({
                full_name: name,
                updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);

        if (error) {
            setMessage("Error saving profile: " + error.message);
        } else {
            setMessage("Profile saved successfully!");
            await refreshProfile();
        }
        setIsSaving(false);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        setIsSaving(true);
        setMessage("");

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setMessage("Error changing password: " + error.message);
        } else {
            setMessage("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        setIsSaving(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-h1 mb-8">Settings</h1>

            {/* Profile Section */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-6">
                <h2 className="text-h4 mb-6">Profile</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative group">
                        <Image
                            className="w-20 h-20 rounded-full object-cover opacity-100"
                            src="/images/avatar.png"
                            width={80}
                            height={80}
                            alt="Avatar"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera size={24} color="#ffffff" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <div>
                        <p className="text-body-bold mb-1">Profile photo</p>
                        <p className="text-small text-t-tertiary">
                            PNG or JPG, max 2MB
                        </p>
                    </div>
                </div>

                {/* Profile Fields */}
                <div className="flex flex-col gap-4 mb-6">
                    <Field
                        label="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isLarge
                    />
                    <Field
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isLarge
                    />
                </div>

                {message && (
                    <p className={`mb-4 text-small ${message.includes("Error") ? "text-primary3" : "text-primary2"}`}>
                        {message}
                    </p>
                )}

                <Button isSecondary onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save changes"}
                </Button>
            </div>

            {/* Security Section */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-6">
                <h2 className="text-h4 mb-6">Security</h2>
                
                <div className="flex flex-col gap-4 mb-6">
                    <Field
                        label="Current password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        isLarge
                    />
                    <Field
                        label="New password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        isLarge
                    />
                    <Field
                        label="Confirm new password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        isLarge
                    />
                </div>

                <Button isSecondary onClick={handleChangePassword}>
                    Change password
                </Button>
            </div>

            {/* Subscription Section */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-h4">Subscription</h2>
                    <span className="px-3 py-1 bg-primary2/10 text-primary2 text-small font-medium rounded-full">
                        Free Plan
                    </span>
                </div>
                <p className="text-body text-t-secondary mb-4">
                    You're on the free plan with 2 briefs per month. Upgrade to
                    Pro for unlimited briefs and advanced features.
                </p>
                <div className="flex items-center gap-4 p-4 bg-b-surface1 rounded-2xl mb-6">
                    <div className="flex-1">
                        <p className="text-small text-t-secondary mb-1">
                            Credits used this month
                        </p>
                        <p className="text-h4">1 / 2</p>
                    </div>
                    <div className="w-24 h-2 bg-b-surface2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary1 rounded-full"
                            style={{ width: "50%" }}
                        />
                    </div>
                </div>
                <Link
                    href="/dashboard/settings/billing"
                    className="inline-flex items-center gap-2 text-primary1 text-body-bold hover:underline"
                >
                    Manage subscription
                    <ArrowRight2 size={20} color="#2d68ff" />
                </Link>
            </div>

            {/* Logout Section */}
            <div className="p-6 bg-b-surface2 rounded-3xl mb-6">
                <h2 className="text-h4 mb-2">Sign Out</h2>
                <p className="text-body text-t-secondary mb-4">
                    Sign out of your account on this device.
                </p>
                <Button
                    isStroke
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2"
                >
                    <Logout size={20} />
                    Sign out
                </Button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
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

            {/* Danger Zone */}
            <div className="p-6 bg-b-surface2 rounded-3xl border-2 border-primary3/20">
                <h2 className="text-h4 mb-2 text-primary3">Danger Zone</h2>
                <p className="text-body text-t-secondary mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                </p>
                <Button
                    className="bg-primary3/10 text-primary3 border-primary3/20 hover:bg-primary3/20"
                    isStroke
                >
                    Delete account
                </Button>
            </div>
        </div>
    );
}
