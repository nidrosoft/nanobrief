import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/signup", "/forgot-password", "/terms", "/privacy", "/cookies", "/contact"];
    const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith("/share/")
    );

    // Auth routes - redirect to dashboard if already logged in
    const authRoutes = ["/login", "/signup", "/forgot-password"];
    const isAuthRoute = authRoutes.includes(pathname);

    // If user is logged in and trying to access auth routes or landing page, redirect to dashboard
    if (user && (isAuthRoute || pathname === "/")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // If user is not logged in and trying to access protected routes
    if (!user && !isPublicRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Check if user needs to complete onboarding
    if (user && pathname.startsWith("/dashboard")) {
        const { data: profile } = await supabase
            .from("users")
            .select("onboarding_completed")
            .eq("id", user.id)
            .single();

        // If onboarding not completed, redirect to onboarding (except if already there)
        if (profile && !profile.onboarding_completed && pathname !== "/onboarding") {
            const url = request.nextUrl.clone();
            url.pathname = "/onboarding";
            return NextResponse.redirect(url);
        }
    }

    // If user completed onboarding and is on onboarding page, redirect to dashboard
    if (user && pathname === "/onboarding") {
        const { data: profile } = await supabase
            .from("users")
            .select("onboarding_completed")
            .eq("id", user.id)
            .single();

        if (profile?.onboarding_completed) {
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}
