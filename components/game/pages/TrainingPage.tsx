'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const TRAINING_ACTIONS: ActionItem[] = [
    { id: "read_docs", title: "Ler Documentação", description: "Aumente sua inteligência lendo manuais chatos.", energyCost: 10, moneyReward: 0, risk: 0 },
    { id: "leetcode_grind", title: "Grind no LeetCode", description: "Resolva algoritmos inúteis para entrevistas.", energyCost: 25, moneyReward: 0, risk: 10 },
];

export function TrainingPage() {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold uppercase text-orange-500 mb-2">Academia Dev</h1>
                <p className="text-gray-400 text-lg border-l-2 border-orange-500 pl-4">
                    No pain, no gain. Fique monstrão (de conhecimento).
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {TRAINING_ACTIONS.map(action => (
                    <ActionCard key={action.id} action={action} color="warning" />
                ))}
            </div>
        </div>
    )
}
