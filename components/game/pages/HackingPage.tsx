'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const HACKING_ACTIONS: ActionItem[] = [
    { id: "sql_injection", title: "SQL Injection Simples", description: "Invadir site de padaria vulnerável.", energyCost: 15, moneyReward: 100, risk: 20 },
    { id: "ransomware", title: "Implantar Ransomware", description: "Sequestrar dados de uma multinacional.", energyCost: 50, moneyReward: 1500, risk: 70 },
];

export function HackingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-2 tracking-tighter shadow-glow text-green-500">Black Hat Zone</h1>
                <p className="text-gray-400 font-mono text-lg border-l-2 border-green-500 pl-4">
                    Não deixe rastros. A polícia cibernética está de olho.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {HACKING_ACTIONS.map(action => (
                    <ActionCard key={action.id} action={action} color="success" />
                ))}
            </div>
        </div>
    )
}
