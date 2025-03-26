// lib/auth.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type Database } from './supabase/database.types';

export async function getSession() {
    const cookieStore = await cookies();

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export async function getUserDetails() {
    const session = await getSession();
    if (!session?.user?.id) {
        return null;
    }

    const cookieStore = await cookies();

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
            },
        }
    );

    const { data, error } = await supabase
        .from('users')
        .select('*, subscriptions(*)')
        .eq('id', session.user.id)
        .single();

    if (error) {
        console.error('Error fetching user details:', error);
        return null;
    }

    return data;
}

export async function updateUserProfile(userId: string, updates: any) {
    const cookieStore = await cookies();

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
            },
        }
    );

    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating user profile: ${error.message}`);
    }

    return data;
}

export async function isAuthenticated() {
    const session = await getSession();
    return !!session;
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error('Authentication required');
    }
    return session;
}