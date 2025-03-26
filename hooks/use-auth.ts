'use client';

import { useUserStore } from '@/store/user-store';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const { user, setUser, isLoading } = useUserStore();
    const router = useRouter();

    const signOut = useCallback(async () => {
        const supabase = createClientComponentClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push('/login');
        router.refresh();
    }, [setUser, router]);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
    };
}