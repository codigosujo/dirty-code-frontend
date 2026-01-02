'use client'

import { useRef } from "react";
import { Button, Card, CardBody, ScrollShadow } from "@heroui/react";

export type MenuItem = {
    title: string;
    id: string;
    desc: string;
    color: string;
    border: string;
    path: string;
    component: React.ReactNode;
}

interface GameMenuCarouselProps {
    items: MenuItem[];
    activeId: string;
    onSelect: (id: string) => void;
}

export function GameMenuCarousel({ items, activeId, onSelect }: GameMenuCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <ScrollShadow
            ref={scrollRef}
            orientation="horizontal"
            className="flex gap-4 snap-x snap-mandatory scrollbar-hide w-full mt-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <Card
                        key={item.id}
                        isPressable
                        onPress={() => onSelect(item.id)}
                        className={`
                                flex-shrink-0 w-64 border bg-black transition-all duration-300 snap-center
                                ${isActive
                                ? `bg-white/10 border-primary ring-1 ring-primary`
                                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                            }
                            `}
                    >
                        <CardBody className="p-4 flex flex-col items-start gap-2 overflow-hidden">
                            {/* Icon & Title */}
                            <div className="flex items-center gap-3 mb-1 w-full">
                                <div className={`p-2 rounded-lg bg-black/50 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                                    </svg>
                                </div>
                                <span className={`font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-300 decoration-slice'}`}>
                                    {item.title}
                                </span>
                            </div>

                            {/* Desc */}
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 text-left">
                                {item.desc}
                            </p>

                            {/* Active Indicator Bar */}
                            {isActive && (
                                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full shadow-glow"></div>
                            )}
                        </CardBody>
                    </Card>
                );
            })}
        </ScrollShadow>
    )
}
