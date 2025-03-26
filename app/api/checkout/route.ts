import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/subscription';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // Ensure user is authenticated
        await requireAuth();

        // Get price ID from request body
        const { priceId } = await request.json();

        if (!priceId) {
            return NextResponse.json(
                { error: 'Price ID is required' },
                { status: 400 }
            );
        }

        // Create checkout session
        const session = await createCheckoutSession(priceId);

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}
