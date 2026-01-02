'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const STARTUP_ACTIONS: ActionItem[] = [
    { id: "pitch_investor", title: "Pitch para Investidor", description: "Tentar convencer um anjo a te dar dinheiro.", energyCost: 30, moneyReward: 0, risk: 50 },
    { id: "launch_mvp", title: "Lançar MVP", description: "Lançar bugado mesmo só para testar o mercado.", energyCost: 40, moneyReward: 500, risk: 40 },
];

export function StartupPage() {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold uppercase text-purple-500 mb-2">Incubadora</h1>
                <p className="text-gray-400 text-lg border-l-2 border-purple-500 pl-4">
                    Transforme café em dinheiro (ou dívidas). Disruptive mindset.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {STARTUP_ACTIONS.map(action => (
                    <ActionCard key={action.id} action={action} color="secondary" />
                ))}
            </div>
        </div>
    )
}
