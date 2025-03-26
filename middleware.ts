// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/register', '/reset-password', '/update-password'];
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Create a response with the same URL as the request
    const response = NextResponse.next();

    // Create a Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name) => request.cookies.get(name)?.value,
                set: (name, value, options) => {
                    response.cookies.set(name, value, options);
                },
                remove: (name) => {
                    response.cookies.delete(name);
                },
            },
        }
    );

    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    // If not authenticated and trying to access a protected route, redirect to login
    if (!session && !pathname.startsWith('/api/')) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated but trying to access auth pages, redirect to dashboard
    if (session && publicRoutes.includes(pathname)) {
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)',
    ],
};