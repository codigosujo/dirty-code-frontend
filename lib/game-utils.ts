
import titlesData from "@/public/avatars/titles.json";

export async function getNoMoneyMessage(): Promise<string> {
    try {
        const response = await fetch('/actions/descriptions/no_money.json');
        if (response.ok) {
            const data = await response.json();
            const pool = data.messages;
            if (pool && pool.length > 0) {
                return pool[Math.floor(Math.random() * pool.length)];
            }
        }
    } catch (error) {
        console.error("Failed to load no money message", error);
    }
    return "Você não tem dinheiro suficiente para isso.";
}

export function isNoMoneyError(message: string): boolean {
    return message.toLowerCase().includes("not enough money");
}

export async function getNoEnergyMessage(): Promise<string> {
    try {
        const response = await fetch('/actions/descriptions/no_energy.json');
        if (response.ok) {
            const data = await response.json();
            const pool = data.stamina;
            if (pool && pool.length > 0) {
                return pool[Math.floor(Math.random() * pool.length)];
            }
        }
    } catch (error) {
        console.error("Failed to load no energy message", error);
    }
    return "Você está sem energia para trabalhar, vá jogar um lolzinho ou tomar um café para desbaratinar...";
}

export function formatMoney(value: number): string {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export function calculateAvatarFocus(hacking: number, work: number): 'work' | 'hacking' | 'both' {
    const totalActions = hacking + work;

    if (totalActions === 0) return 'work';

    if (Math.abs(hacking - work) < 10 && totalActions > 20) {
        return 'both';
    }

    if (hacking === work) return 'work';

    return hacking > work ? 'hacking' : 'work';
}

export function getAvatarTitle(level: number, hacking: number, work: number): string {
    const focus = calculateAvatarFocus(hacking, work);
    const titles = (titlesData as any)[focus];

    if (!titles) return "Iniciante";
    
    const value = Number(level) || 0;
    const thresholds = Object.keys(titles).map(Number).sort((a, b) => a - b);

    if (value >= thresholds[thresholds.length - 1]) {
        return titles[thresholds[thresholds.length - 1]];
    }

    const nextThreshold = thresholds.find(t => t > value);
    return nextThreshold ? titles[nextThreshold] : "Iniciante";
}
