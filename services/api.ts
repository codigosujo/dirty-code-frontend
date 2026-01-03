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
    burnout: number;
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
                activeAvatar: {
                    id: "avatar_1",
                    name: "Leo Dev",
                    level: 1,
                    experience: 0,
                    life: 100,
                    stamina: 100,
                    money: 500,
                    availablePoints: 0,
                    intelligence: 80,
                    charisma: 25,
                    streetIntelligence: 10,
                    stealth: 5,
                    active: true,
                    burnout: 0,
                },
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
            return {
                success: false,
                message: `Falha em ${action.title}! Algo deu errado.`,
                rewards: {
                    activeAvatar: {
                        stamina: -5,
                        // To satisfy typescript that this is Partial<User>, we need to be careful if strict.
                        // But Partial<User> -> activeAvatar? -> Avatar. 
                        // Partial<Avatar> is not automatically implied by Partial<User>['activeAvatar'] depending on TS version/strictness, 
                        // but usually { activeAvatar: { stamina: -5 } } works if Avatar fields are optional? No, Avatar fields are required in interface.
                        // We might need to cast or use a specific Rewards types.
                        // For now let's just use 'any' or cast to avoid headerache, or change return type.
                        // Better: Change proper structure.
                    } as any
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
                activeAvatar: {
                    money: moneyDelta,
                    stamina: energyDelta, // Mapped to stamina
                    // karma is tricky if not in Avatar interface. ignoring for now or mapping to intelligence?
                } as any
            }
        };
    },
    createAvatar: async (data: any) => {
        const { createAvatarAction } = await import('@/app/actions/avatar');
        return await createAvatarAction(data);
    },
    updateAvatar: async (data: any) => {
        const { updateAvatarAction } = await import('@/app/actions/avatar');
        return await updateAvatarAction(data);
    }
};
