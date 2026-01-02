'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const NIGHTLIFE_ACTIONS: ActionItem[] = [
    { id: "energy_drink", title: "Beber Energético", description: "Recupere energia, ganhe vício.", energyCost: -20, moneyReward: -10, risk: 0 },
    { id: "clubbing", title: "Ir pra Balada", description: "Gastar dinheiro para fingir felicidade.", energyCost: -50, moneyReward: -100, risk: 5 },
];

export function NightlifePage() {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold uppercase text-pink-500 mb-2">Night City</h1>
                <p className="text-gray-400 text-lg border-l-2 border-pink-500 pl-4">
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
