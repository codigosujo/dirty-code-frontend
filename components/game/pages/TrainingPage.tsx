'use client'

import { useGame } from "@/context/GameContext";
import { ActionItem } from "@/components/ActionPage";
import { useState } from "react";
import { Button, Select, SelectItem, Chip } from "@heroui/react";

interface TrainingAction extends ActionItem {
    experienceReward: number;
    requirements: {
        intelligence: number;
    };
}

const TRAINING_ACTIONS: TrainingAction[] = [
    {
        id: "read_docs",
        title: "Ler Documentação do PHP",
        description: "Aumente sua inteligência lendo manuais chatos.",
        energyCost: 10,
        moneyReward: 0,
        experienceReward: 15,
        risk: 0,
        requirements: { intelligence: 0 },
    },
    {
        id: "dechampo_youtube",
        title: "Assistir Vídeo do Dechampo",
        description: "Aprenda arquitetura de software e clean code.",
        energyCost: 20,
        moneyReward: 0,
        experienceReward: 35,
        risk: 5,
        requirements: { intelligence: 10 },
    },
    {
        id: "leetcode_grind",
        title: "Grind no LeetCode",
        description: "Resolva algoritmos complexos de grafos.",
        energyCost: 35,
        moneyReward: 0,
        experienceReward: 60,
        risk: 15,
        requirements: { intelligence: 20 },
    },
];

export function TrainingPage() {
    const { user, performAction } = useGame();
    const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrain = async () => {
        if (!selectedActionId) return;
        setIsLoading(true);
        await performAction(selectedActionId);
        setIsLoading(false);
    };

    const selectedAction = TRAINING_ACTIONS.find(a => a.id === selectedActionId);

    const meetsRequirements = (action: TrainingAction) => {
        if (!user?.activeAvatar) return false;
        const avatar = user.activeAvatar;
        return (avatar.intelligence || 0) >= action.requirements.intelligence;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold uppercase text-orange-500 mb-2">Academia Dev</h1>
                <p className="text-gray-400 text-lg border-l-2 border-orange-500 pl-4">
                    No pain, no gain. Fique monstrão (de conhecimento).
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <Select
                    placeholder="Selecione um treino..."
                    selectedKeys={selectedActionId ? [selectedActionId] : []}
                    className="max-w-full"
                    variant="faded"
                    classNames={{
                        trigger: "bg-zinc-900 border-white/10 min-h-[100px] h-auto py-4 data-[hover=true]:border-orange-500/50",
                        value: "text-lg w-full",
                        popoverContent: "bg-zinc-900 border border-white/10 dark",
                        innerWrapper: "group-data-[has-label=true]:pt-0 w-full"
                    }}
                    renderValue={(items) => {
                        return items.map((item) => {
                            const action = TRAINING_ACTIONS.find(a => a.id === item.key);
                            if (!action) return null;
                            return (
                                <div key={item.key} className="flex flex-col gap-3 w-full pr-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl font-bold text-white leading-none">{action.title}</span>
                                            <span className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-md">{action.description}</span>
                                        </div>
                                        {(action.risk ?? 0) > 0 && (
                                            <Chip size="sm" variant="flat" color="danger" className="border border-danger/20 text-[10px] h-5 min-h-0 px-1">
                                                {action.risk}% FAIL CHANCE
                                            </Chip>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-xs font-mono border-t border-white/5 pt-3">
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                            <span className="font-bold">-{action.energyCost} STM</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                                            <span className="font-bold text-base">+{action.experienceReward} XP</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/10 mx-2"></div>
                                        <div className="flex gap-4 text-gray-400">
                                            <span className={`font-bold transition-colors ${(user?.activeAvatar?.intelligence || 0) >= action.requirements.intelligence ? "text-gray-300" : "text-red-400"}`}>
                                                REQ INT {action.requirements.intelligence}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        });
                    }}
                    onSelectionChange={(keys) => setSelectedActionId(Array.from(keys)[0] as string)}
                >
                </Select>

                {selectedAction && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className={`
                            border rounded-xl p-6 relative overflow-hidden group transition-all
                            ${meetsRequirements(selectedAction) ? 'bg-zinc-900/40 border-orange-500/50' : 'bg-red-950/10 border-red-500/30'}
                            shadow-[0_0_30px_rgba(0,0,0,0.3)]
                        `}>
                            <div className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-2xl font-bold ${meetsRequirements(selectedAction) ? 'text-orange-500' : 'text-red-400'}`}>
                                            {selectedAction.title}
                                        </h3>
                                        {!meetsRequirements(selectedAction) && (
                                            <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-500 font-bold uppercase tracking-wider">
                                                Requisitos não atendidos
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-300 text-lg">{selectedAction.description}</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-mono bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">INT Mínima</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-xl font-bold ${(user?.activeAvatar?.intelligence || 0) >= selectedAction.requirements.intelligence ? 'text-white' : 'text-red-500'}`}>
                                                {selectedAction.requirements.intelligence}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">Experiência</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-purple-400">
                                                +{selectedAction.experienceReward} XP
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">Custo Stamina</span>
                                        <span className="text-xl font-bold text-blue-400">-{selectedAction.energyCost}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500 uppercase tracking-wider text-[10px]">Dinheiro</span>
                                        <span className="text-xl font-bold text-gray-500">-{selectedAction.moneyReward}$</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
                <Button
                    size="lg"
                    color={selectedAction && !meetsRequirements(selectedAction) ? "danger" : "warning"}
                    variant={selectedAction && !meetsRequirements(selectedAction) ? "flat" : "shadow"}
                    className="font-bold tracking-wider w-full md:w-auto px-16 text-black"
                    isLoading={isLoading}
                    isDisabled={!selectedActionId || (selectedAction ? !meetsRequirements(selectedAction) : true)}
                    onPress={handleTrain}
                >
                    {isLoading ? 'ESTUDANDO...' : selectedAction && !meetsRequirements(selectedAction) ? 'REQUISITOS INSUFICIENTES' : 'INICIAR ESTUDOS'}
                </Button>
            </div>
        </div>
    )
}
