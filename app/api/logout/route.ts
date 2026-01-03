import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('dirty_token');
    cookieStore.delete('dirty_refresh_token');
    cookieStore.delete('dirty_user_info');

    return NextResponse.json({ success: true });
}
