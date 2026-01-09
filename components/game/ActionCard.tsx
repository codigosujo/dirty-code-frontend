'use client'

import { useGame } from "@/context/GameContext";
import { Card, CardBody, Tooltip, Chip } from "@heroui/react";
import { useState, useEffect } from "react";
import { GameAction } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

interface ActionCardProps {
    action: GameAction;
}

export function ActionCard({ action }: ActionCardProps) {
    const { performAction, user } = useGame();
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'failure' | 'stamina' } | null>(null);

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => {
                setFeedback(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const handleAction = async () => {
        if (isStaminaInsufficient) {
            setFeedback({
                message: "Você está de saco cheio de trabalhar, vá jogar um lolzinho ou tomar um café para desbaratinar...",
                type: 'stamina'
            });
            return;
        }
        if (isDisabled) return;
        setIsLoading(true);
        const result = await performAction(action);
        setFeedback({ 
            message: result.message, 
            type: result.success ? 'success' : 'failure' 
        });
        setIsLoading(false);
    }

    const stamina = action.stamina;
    const moneyReward = action.money;
    const xpReward = action.xp;

    const formatValue = (value: number) => {
        const sign = value > 0 ? '+' : '';
        return `${sign}${value}`;
    };

    const isStaminaInsufficient = stamina < 0 ? (!!user && (user.activeAvatar?.stamina ?? 0) < Math.abs(stamina)) : false;

    const requirements = [
        { label: "FOR", value: action.requiredStrength ?? 0, color: "text-red-500", bg: "bg-red-500/10", ring: "ring-red-500/20", current: user?.activeAvatar?.strength ?? 0 },
        { label: "INT", value: action.requiredIntelligence ?? 0, color: "text-blue-500", bg: "bg-blue-500/10", ring: "ring-blue-500/20", current: user?.activeAvatar?.intelligence ?? 0 },
        { label: "CHA", value: action.requiredCharisma ?? 0, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", ring: "ring-fuchsia-500/20", current: user?.activeAvatar?.charisma ?? 0 },
        { label: "DIS", value: action.requiredStealth ?? 0, color: "text-gray-500", bg: "bg-gray-500/10", ring: "ring-gray-500/20", current: user?.activeAvatar?.stealth ?? 0 },
    ];

    const hasMissingRequirements = requirements.some(req => req.current < req.value);
    const isDisabled = hasMissingRequirements || isLoading;

    console.log(`Renderizando imagem: /actions/images/${action.actionImage}`);

    return (
        <Card
            isPressable={!isDisabled}
            onPress={handleAction}
            className={`bg-black border border-white/10 hover:border-white/20 transition-all group w-full relative overflow-hidden ${isLoading ? 'cursor-wait' : ''}`}
        >
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`absolute inset-0 z-20 flex items-center justify-center p-4 text-center backdrop-blur-md ${
                            feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 
                            feedback.type === 'stamina' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-red-500/20 text-red-400'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setFeedback(null);
                        }}
                    >
                        <div className="space-y-2">
                            <p className="text-sm md:text-base font-medium leading-tight max-w-[80%] mx-auto">
                                {feedback.message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CardBody className="flex flex-row items-center justify-between p-6 gap-6">
                {action.actionImage && (
                    <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-white/5">
                        <img
                            src={`/actions/images/${action.actionImage}`}
                            alt={action.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className={`font-bold text-xl text-white group-hover:text-primary transition-colors`}>
                                {action.title}
                            </h3>
                            {isLoading && (
                                <span className="flex h-2 w-2">
                                    <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 bg-primary`}></span>
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{action.description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-500">
                        {stamina !== 0 && (
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${stamina > 0 ? 'bg-blue-400' : 'bg-pink-500'}`}></span>
                                <span className={stamina < 0 && isStaminaInsufficient ? 'text-pink-500 font-bold' : ''}>
                                    {stamina > 0 ? '+' : ''}{stamina} Stamina
                                </span>
                            </div>
                        )}
                        {xpReward !== undefined && xpReward !== 0 && (
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                <span>{formatValue(xpReward)} XP</span>
                            </div>
                        )}
                    </div>

                    {requirements.length > 0 && (
                        <div className="flex flex-row gap-2">
                            {requirements.map((req, idx) => (
                                <Tooltip
                                    key={idx}
                                    content={`${req.label}: Necessário ${req.value} (Você tem ${req.current})`}
                                    delay={0}
                                    closeDelay={0}
                                    placement="bottom"
                                >
                                    <div
                                        className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold shadow-sm ring-1 ${req.bg} ${req.color} ${req.ring}`}
                                    >
                                        {req.value}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Chip
                        size="sm"
                        variant="flat"
                        color={((action.failureChance ?? 0) * 100) < 20 ? "success" : ((action.failureChance ?? 0) * 100) === 20 ? "warning" : "danger"}
                        className="font-bold font-mono"
                    >
                        RISCO: {(action.failureChance ?? 0) * 100}%
                    </Chip>
                    {moneyReward !== undefined && moneyReward !== 0 && (
                        <div className={`text-2xl font-bold ${moneyReward > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {formatValue(moneyReward)} R$
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}
