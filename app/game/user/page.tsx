'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Card, CardBody, Progress } from "@heroui/react";
import { api } from '@/services/api';
import Image from 'next/image';

const AVATAR_OPTIONS = [
    '/avatars/avatar_1.png',
    '/avatars/avatar_2.png',
    '/avatars/avatar_3.png',
    '/logo.jpeg',
];

type StatKey = 'stamina' | 'str' | 'karma' | 'intelligence';

interface Stats {
    stamina: number;
    str: number;
    karma: number;
    intelligence: number;
}

import { useGame } from "@/context/GameContext";
// ... imports

export default function AvatarEdit() {
    const router = useRouter();
    const { refreshUser } = useGame();

    // UI State
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
    const [stats, setStats] = useState<Stats>({
        stamina: 0,
        str: 0,
        karma: 0,
        intelligence: 0
    });
    const [pointsToDistribute, setPointsToDistribute] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // ... onSubmit logic ...

    const handleStatChange = (stat: StatKey, delta: number) => {
        // ... (Disabled strict logic)
        setStats(prev => ({ ...prev, [stat]: prev[stat] + delta }));
    };

    const handleSubmit = async () => {
        if (!name.trim()) return;

        setIsLoading(true);
        try {
            // Using the service as requested
            const newAvatar = await api.createAvatar({
                name,
                stamina: stats.stamina,
                str: stats.str,
                karma: stats.karma,
                intelligence: stats.intelligence,
                photoUrl: selectedAvatar
            });

            // Update GameProvider state immediately
            refreshUser({ activeAvatar: newAvatar });

            router.push('/game');
            router.refresh();
        } catch (error) {
            // ...
            console.error(error);
            alert("Failed to create avatar. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 min-h-screen pb-10">
            <div className="container mx-auto lg:px-8 space-y-8">
                <div className="min-h-96 bg-black/50 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">

                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Perfil
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Configure seu perfil.</p>

                    <Input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-4"
                    />

                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-200">Avatar</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {AVATAR_OPTIONS.map((src, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedAvatar(src)}
                                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedAvatar === src ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                                >
                                    <Image src={src} alt={`Avatar ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-200">Atributos</h2>
                            <span className="text-sm font-mono text-primary">Pontos para distribuir: {pointsToDistribute}</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Stamina', value: stats.stamina, color: "secondary" },
                                { label: 'Strength', value: stats.str, color: "danger" },
                                { label: 'Karma', value: stats.karma, color: "warning" },
                                { label: 'Intelligence', value: stats.intelligence, color: "success" }
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between items-center text-gray-400 mb-2">
                                        <span className="text-sm uppercase tracking-wider">{stat.label}</span>
                                        <span className="font-mono text-white text-lg">{stat.value}</span>
                                    </div>
                                    <Progress
                                        value={stat.value}
                                        color={stat.color as "secondary" | "danger" | "warning" | "success"}
                                        size="sm"
                                        classNames={{ track: "bg-black/40" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button
                            color="primary"
                            size="lg"
                            className="font-bold text-black shadow-lg shadow-primary/20 w-full sm:w-auto"
                            isLoading={isLoading}
                            onPress={handleSubmit}
                            isDisabled={!name}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}