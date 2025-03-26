import { NextRequest, NextResponse } from 'next/server';
import { createPortalLink } from '@/lib/subscription';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // Ensure user is authenticated
        await requireAuth();

        // Create customer portal link
        const url = await createPortalLink();

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error('Error creating portal link:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}