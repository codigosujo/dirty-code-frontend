'use client'

import { useGame } from "@/context/GameContext";
import { ActionItem } from "@/components/ActionPage";
import { useState } from "react";
import { Button, Select, SelectItem, Chip } from "@heroui/react";

interface TrainingAction extends ActionItem {
    experienceReward: number;
    requirements: {
        intelligence: number;
        money: number;
    };
}

const TRAINING_ACTIONS: TrainingAction[] = [
    {
        id: "dechampo_youtube",
        title: "Assistir Vídeo do Dechampo",
        description: "Aprenda sobre tecnologia com quem sabe falar bonito.",
        energyCost: 20,
        moneyReward: 0,
        experienceReward: 5,
        risk: 5,
        requirements: { intelligence: 0, money: 0 },
    },
    {
        id: "course_youtube",
        title: "Copie projetos grátis do Foguete",
        description: "Finja que está aprendendo a programar copiando projetos do time do Foguete.",
        energyCost: 30,
        moneyReward: 0,
        experienceReward: 25,
        risk: 10,
        requirements: { intelligence: 1, money: 0 },
    },
    {
        id: "leetcode_grind",
        title: "Resolva com LeetCode fáceis",
        description: "Brigue com algoritmos fáceis de LeetCode. ",
        energyCost: 20,
        moneyReward: 0,
        experienceReward: 50,
        risk: 20,
        requirements: { intelligence: 5, money: 0 },
    },
    {
        id: "rocket_course",
        title: "Se inscreva no curso do Foguete",
        description: "Aprenda a programar as tecnologias mais avançadas do mercado no time do foguete",
        energyCost: 20,
        moneyReward: 0,
        experienceReward: 50,
        risk: 20,
        requirements: { intelligence: 5, money: 500 },
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
                    {TRAINING_ACTIONS.map((action) => (
                        <SelectItem
                            key={action.id}
                            textValue={action.title}
                            className="h-auto py-3 data-[hover=true]:bg-white/5"
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-base font-bold text-white">{action.title}</span>
                                        <span className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-md">{action.description}</span>
                                    </div>
                                    {(action.risk ?? 0) > 0 && (
                                        <Chip size="sm" variant="flat" color="danger" className="border border-danger/20 text-[10px] h-5 min-h-0">
                                            {action.risk}% FAIL
                                        </Chip>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-xs font-mono border-t border-white/5 pt-2 mt-1">
                                    <div className="flex items-center gap-1.5 text-blue-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        -{action.energyCost} STM
                                    </div>
                                    <div className="flex items-center gap-1.5 text-purple-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                        +{action.experienceReward} XP
                                    </div>
                                    <div className="w-px h-3 bg-white/20 mx-1"></div>
                                    <div className="flex gap-3 text-gray-400">
                                        <span className={(user?.activeAvatar?.intelligence || 0) >= action.requirements.intelligence ? "text-gray-300" : "text-red-400"}>
                                            REQ INT {action.requirements.intelligence}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </Select>
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
