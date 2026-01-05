'use client'

import { useGame } from "@/context/GameContext";
import { ActionItem } from "@/components/ActionPage";
import { useState } from "react";
import { Button, Select, SelectItem, Chip } from "@heroui/react";

interface HackingAction extends ActionItem {
    experienceReward: number;
    requirements: {
        intelligence: number;
        stealth: number;
    }
}

const HACKING_ACTIONS: HackingAction[] = [
    {
        id: "urubu_pix",
        title: "Golpe do PIX em Idosos",
        description: "Dê golpes do PIX em idosos vulneráveis pelo WhatsApp.",
        energyCost: 10,
        moneyReward: 50,
        experienceReward: 20,
        risk: 5,
        requirements: { intelligence: 1, stealth: 0 }
    },
    {
        id: "whatsapp_clone",
        title: "Clone WhatsApp",
        description: "Se passe por outras pessoas para conseguir dinheiro.",
        energyCost: 15,
        moneyReward: 100,
        experienceReward: 30,
        risk: 5,
        requirements: { intelligence: 2, stealth: 1 }
    },
    {
        id: "sql_injection",
        title: "SQL Injection Simples",
        description: "Invadir site de padaria vulnerável.",
        energyCost: 15,
        moneyReward: 300,
        experienceReward: 20,
        risk: 20,
        requirements: { intelligence: 10, stealth: 5 }
    },
    {
        id: "ddos_attack",
        title: "Ataque DDoS",
        description: "Derrubar servidor de jogo indie.",
        energyCost: 30,
        moneyReward: 300,
        experienceReward: 45,
        risk: 40,
        requirements: { intelligence: 25, stealth: 15 }
    },
    {
        id: "ransomware",
        title: "Implantar Ransomware",
        description: "Sequestrar dados de uma multinacional.",
        energyCost: 50,
        moneyReward: 1500,
        experienceReward: 100,
        risk: 70,
        requirements: { intelligence: 60, stealth: 40 }
    },
];

export function HackingPage() {
    const { user, performAction } = useGame();
    const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleHack = async () => {
        if (!selectedActionId) return;
        setIsLoading(true);
        await performAction(selectedActionId);
        setIsLoading(false);
    };

    const selectedAction = HACKING_ACTIONS.find(a => a.id === selectedActionId);

    const meetsRequirements = (action: HackingAction) => {
        if (!user?.activeAvatar) return false;
        const avatar = user.activeAvatar;

        return (avatar.intelligence || 0) >= action.requirements.intelligence &&
            (avatar.stealth || 0) >= action.requirements.stealth;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold uppercase text-green-500 mb-2">Golpes Cibernéticos</h1>
                <p className="text-gray-400 text-lg border-l-2 border-green-500 pl-4">
                    Não deixe rastros. A polícia cibernética está de olho.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <Select
                    placeholder="Selecione um golpe..."
                    selectedKeys={selectedActionId ? [selectedActionId] : []}
                    className="max-w-full"
                    variant="faded"
                    classNames={{
                        trigger: "bg-zinc-900 border-white/10 min-h-[100px] h-auto py-4 data-[hover=true]:border-green-500/50",
                        value: "text-lg w-full",
                        popoverContent: "bg-zinc-900 border border-white/10 dark",
                        innerWrapper: "group-data-[has-label=true]:pt-0 w-full"
                    }}
                    renderValue={(items) => {
                        return items.map((item) => {
                            const action = HACKING_ACTIONS.find(a => a.id === item.key);
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
                                                {action.risk}% RISK
                                            </Chip>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-6 text-xs font-mono border-t border-white/5 pt-3">
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                            <span className="font-bold">-{action.energyCost} STM</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                                            <span className="font-bold text-base">+${action.moneyReward}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-purple-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                                            <span className="font-bold text-base">+{action.experienceReward} XP</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/10 mx-2"></div>
                                        <div className="flex gap-4 text-gray-400">
                                            <span className={`font-bold transition-colors ${(user?.activeAvatar?.intelligence || 0) >= action.requirements.intelligence ? "text-gray-300" : "text-red-400"}`}>
                                                INT {action.requirements.intelligence}
                                            </span>
                                            <span className={`font-bold transition-colors ${(user?.activeAvatar?.stealth || 0) >= action.requirements.stealth ? "text-gray-300" : "text-red-400"}`}>
                                                STL {action.requirements.stealth}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        });
                    }}
                    onSelectionChange={(keys) => setSelectedActionId(Array.from(keys)[0] as string)}
                >
                    {HACKING_ACTIONS.map((action) => (
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
                                            {action.risk}% RISK
                                        </Chip>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-xs font-mono border-t border-white/5 pt-2 mt-1">
                                    <div className="flex items-center gap-1.5 text-blue-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        -{action.energyCost} STM
                                    </div>
                                    <div className="flex items-center gap-1.5 text-green-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        +${action.moneyReward}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-purple-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                        +{action.experienceReward} XP
                                    </div>
                                    <div className="w-px h-3 bg-white/20 mx-1"></div>
                                    <div className="flex gap-3 text-gray-400">
                                        <span className={(user?.activeAvatar?.intelligence || 0) >= action.requirements.intelligence ? "text-gray-300" : "text-red-400"}>
                                            INT {action.requirements.intelligence}
                                        </span>
                                        <span className={(user?.activeAvatar?.stealth || 0) >= action.requirements.stealth ? "text-gray-300" : "text-red-400"}>
                                            STL {action.requirements.stealth}
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
                    color={selectedAction && !meetsRequirements(selectedAction) ? "danger" : "success"}
                    variant={selectedAction && !meetsRequirements(selectedAction) ? "flat" : "shadow"}
                    className="font-bold tracking-wider w-full md:w-auto px-16"
                    isLoading={isLoading}
                    isDisabled={!selectedActionId || (selectedAction ? !meetsRequirements(selectedAction) : true)}
                    onPress={handleHack}
                >
                    {isLoading ? 'HACKEANDO...' : selectedAction && !meetsRequirements(selectedAction) ? 'REQUISITOS INSUFICIENTES' : 'EXECUTAR HACK'}
                </Button>
            </div>
        </div>
    )
}
