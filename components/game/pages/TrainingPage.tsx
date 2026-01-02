'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const TRAINING_ACTIONS: ActionItem[] = [
    { id: "read_docs", title: "Ler Documentação", description: "Aumente sua inteligência lendo manuais chatos.", energyCost: 10, moneyReward: 0, risk: 0 },
    { id: "leetcode_grind", title: "Grind no LeetCode", description: "Resolva algoritmos inúteis para entrevistas.", energyCost: 25, moneyReward: 0, risk: 10 },
];

export function TrainingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter shadow-glow text-orange-500">Academia Dev</h1>
                <p className="text-gray-400 font-mono text-lg border-l-2 border-orange-500 pl-4">
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
