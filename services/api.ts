export interface Avatar {
    id: string;
    name: string;
    picture?: string;
    level: number;
    experience: number;
    stamina: number;
    life: number;
    money: number; // BigDecimal in backend, number in JS
    availablePoints: number;
    intelligence: number;
    charisma: number;
    streetIntelligence: number;
    stealth: number;
    active: boolean;
}

export interface User {
    id: string;
    email?: string;
    name?: string;
    activeAvatar?: Avatar;
}

export const api = {
    loginWithGoogle: async (): Promise<{ token: string; user: User }> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        return {
            token: "mock-token-" + Math.random().toString(36).substring(7),
            user: {
                id: "1",
                name: "Leo Dev",
                level: 1,

                life: 100,
                stamina: 100,
                addiction: 0,
                karma: 50,

                strength: 10,
                intelligence: 80,
                charisma: 25,

                money: 500,
                burnout: 0,
            },
        };
    },

    performAction: async (actionId: string): Promise<{ success: boolean; message: string; rewards?: Partial<User> }> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const action = {
            title: "Ação 1",
            risk: 50,
            moneyReward: 100,
            energyCost: 10,
            reputationReward: 5,
        };
        if (!action) return { success: false, message: "Ação desconhecida." };

        // Lógica de Risco
        const roll = Math.random() * 100;
        const success = roll > action.risk;

        if (!success) {
            // Falha!
            return {
                success: false,
                message: `Falha em ${action.title}! Algo deu errado.`,
                rewards: {
                    // Penalidade opcional na falha
                    stamina: -5
                }
            };
        }

        // Sucesso
        // Calcular recompensas reais
        // Se moneyReward > 0, ganha. Se < 0, já foi pago no client (custo), mas aqui confirmamos? 
        // Vamos simplificar: API retorna o delta final.

        const moneyDelta = action.moneyReward; // Pode ser negativo (custo) ou positivo (ganho)
        const energyDelta = -action.energyCost; // Cost is positive in config, so delta is negative. 
        // Oops, if action restores energy (cost negative), delta becomes positive. Correct.

        return {
            success: true,
            message: `${action.title} concluído!`,
            rewards: {
                money: moneyDelta,
                stamina: energyDelta, // Mapped to stamina
                karma: action.reputationReward // Mapped to karma
            }
        };
    },
    createAvatar: async (data: any) => {
        const { createAvatarAction } = await import('@/app/actions/avatar');
        return await createAvatarAction(data);
    }
};
