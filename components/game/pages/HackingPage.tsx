'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionQuantitySelector } from "@/components/game/ActionQuantitySelector";
import { useEffect, useState } from "react";
import { GameActionType } from "@/services/api";
import { useGame } from "@/context/GameContext";

export function HackingPage() {
    const { user, actionCounts, setActionCountForCategory, cachedActions, fetchActions } = useGame();
    const actions = cachedActions[GameActionType.HACKING] || [];
    const [isLoading, setIsLoading] = useState(actions.length === 0);
    const actionCount = actionCounts['hacking'] || 1;
    const setActionCount = (count: number) => setActionCountForCategory('hacking', count);

    useEffect(() => {
        const loadActions = async () => {
            if (!user?.activeAvatar) return;
            
            const isInitialLoad = actions.length === 0;
            if (isInitialLoad) setIsLoading(true);
            
            await fetchActions(GameActionType.HACKING, !isInitialLoad);
            
            if (isInitialLoad) setIsLoading(false);
        };
        
        loadActions();
    }, [user?.activeAvatar?.strength, user?.activeAvatar?.intelligence, user?.activeAvatar?.charisma, user?.activeAvatar?.stealth]);

    return (
        <div>
            <div className="flex justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold uppercase text-white mb-2">Black Hat Zone</h1>
                    <p className="text-gray-400 text-sm md:text-lg border-l-2 border-primary pl-4">
                        Não deixe rastros. A polícia cibernética está de olho.
                    </p>
                </div>
                <ActionQuantitySelector value={actionCount} onChange={setActionCount} />
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6">
                {actions.map(action => (
                    <ActionCard key={action.id} action={action} actionCount={actionCount} />
                ))}
                {!isLoading && actions.length === 0 && (
                    <p className="text-gray-500 font-mono italic">Nenhuma missão disponível no momento.</p>
                )}
            </div>
        </div>
    )
}
