'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const { logout } = useGame();
    const router = useRouter();

    useEffect(() => {
        logout();
        router.replace('/');
    }, [logout, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white/50">Logging out...</p>
        </div>
    );
}
