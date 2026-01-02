'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const NIGHTLIFE_ACTIONS: ActionItem[] = [
    { id: "energy_drink", title: "Beber Energético", description: "Recupere energia, ganhe vício.", energyCost: -20, moneyReward: -10, risk: 0 },
    { id: "clubbing", title: "Ir pra Balada", description: "Gastar dinheiro para fingir felicidade.", energyCost: -50, moneyReward: -100, risk: 5 },
];

export function NightlifePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter shadow-glow text-pink-500">Night City</h1>
                <p className="text-gray-400 font-mono text-lg border-l-2 border-pink-500 pl-4">
                    Relaxe, beba e esqueça os bugs de produção.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {NIGHTLIFE_ACTIONS.map(action => (
                    <ActionCard key={action.id} action={action} color="danger" />
                ))}
            </div>
        </div>
    )
}
