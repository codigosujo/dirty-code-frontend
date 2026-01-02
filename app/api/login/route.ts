import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh-token');

    if (!token || !refreshToken) {
        return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
    }

    const cookieStore = await cookies();

    cookieStore.set('dirty_token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('dirty_refresh_token', refreshToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.redirect(new URL('/game', request.url));
}
