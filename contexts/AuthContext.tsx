"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { User, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
    company_name: string | null;
    company_size: string | null;
    primary_industry: string | null;
    goals: string[] | null;
    onboarding_completed: boolean;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    isLoading: true,
    signOut: async () => {},
    refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = useMemo(() => createClient(), []);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (userId: string, client: SupabaseClient) => {
        const { data } = await client
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();
        
        if (data) {
            setProfile(data as UserProfile);
        }
    };

    const refreshProfile = async () => {
        if (user && supabase) {
            await fetchProfile(user.id, supabase);
        }
    };

    useEffect(() => {
        // Skip if Supabase client is not available (build time)
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            
            if (user) {
                await fetchProfile(user.id, supabase);
            }
            
            setIsLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                
                if (session?.user) {
                    await fetchProfile(session.user.id, supabase);
                } else {
                    setProfile(null);
                }
                
                setIsLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        router.push("/login");
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, profile, isLoading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
