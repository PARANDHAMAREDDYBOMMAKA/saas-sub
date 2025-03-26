'use client';

import { useUserStore } from '@/store/user-store';

export function useSubscription() {
    const { subscription, isLoading } = useUserStore();

    const isSubscribed = !!subscription && ['trialing', 'active'].includes(subscription.status);

    const isTrialing = !!subscription && subscription.status === 'trialing';

    const isActive = !!subscription && subscription.status === 'active';

    const willCancel = !!subscription && subscription.cancel_at_period_end;

    const currentPeriodEnd = subscription?.current_period_end
        ? new Date(subscription.current_period_end)
        : null;

    return {
        subscription,
        isLoading,
        isSubscribed,
        isTrialing,
        isActive,
        willCancel,
        currentPeriodEnd,
    };
}