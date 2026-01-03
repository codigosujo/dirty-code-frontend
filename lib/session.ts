import { cookies } from 'next/headers';
import { User } from '@/services/api';

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('dirty_token')?.value;

    if (!token) return null;

    try {
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080/dirty-code';
        // Attempt to fetch from real backend
        const res = await fetch(`${backendUrl}/v1/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            next: { revalidate: 0 }
        });

        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.warn("Failed to fetch user from backend, falling back to mock or null");
    }

    return null;
}
