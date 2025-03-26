// lib/subscriptions.ts
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { stripe } from './stripe/client';
import { Database } from './supabase/database.types';
import { getSession, getUserDetails } from './auth';

export async function getSubscription(userId: string) {
    const cookieStore = cookies();

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
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .eq('user_id', userId)
        .in('status', ['trialing', 'active']);

    if (error) {
        console.error('Error fetching subscription:', error);
        return null;
    }

    return data;
}

export async function getActiveProducts() {
    const cookieStore = cookies();

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
            },
        }
    );

    const { data: products, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .order('metadata->index');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return products;
}

export async function createCheckoutSession(priceId: string) {
    const user = await getUserDetails();
    if (!user) throw new Error('User not found');

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        customer_email: user.email,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
            metadata: {
                userId: user.id,
            },
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    });

    return session;
}

export async function createPortalLink() {
    const user = await getUserDetails();
    if (!user) throw new Error('User not found');

    const subscription = await getSubscription(user.id);
    if (!subscription) throw new Error('No active subscription found');

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: subscription.customer_id,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return portalSession.url;
}

export async function isSubscribed() {
    const user = await getUserDetails();
    if (!user) return false;

    const subscription = await getSubscription(user.id);
    return !!subscription;
}

export async function updateSubscription(subscriptionId: string, updates: any) {
    await stripe.subscriptions.update(subscriptionId, updates);
}

export async function cancelSubscription(subscriptionId: string) {
    await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
    });
}