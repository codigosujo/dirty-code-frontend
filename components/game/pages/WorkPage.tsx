'use client'

import { ActionCard } from "@/components/game/ActionCard";
import { ActionItem } from "@/components/ActionPage";

const WORK_ACTIONS: ActionItem[] = [
    { id: "freelance_bug", title: "Corrigir Bug Crítico", description: "Cliente está desesperado. O sistema caiu.", energyCost: 10, moneyReward: 50, risk: 10 },
    { id: "create_landing", title: "Criar Landing Page", description: "Mais uma LP genérica para vender curso.", energyCost: 20, moneyReward: 120, risk: 5 },
    { id: "maintain_legacy", title: "Manter Legado COBOL", description: "O código tem 30 anos e cheira a naftalina.", energyCost: 35, moneyReward: 300, risk: 30 },
];

export function WorkPage() {
    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold uppercase text-white mb-2">Trabalho</h1>
                <p className="text-gray-400 text-lg border-l-2 border-primary pl-4">
                    Onde o filho chora e a mãe não vê. Escolha seu veneno.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {WORK_ACTIONS.map(action => (
                    <ActionCard key={action.id} action={action} color="primary" />
                ))}
            </div>
        </div>
    )
}
