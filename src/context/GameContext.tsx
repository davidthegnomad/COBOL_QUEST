"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameStats {
    logic: number;
    memory: number;
    legacy: number;
    level: number;
    classType: string;
}

interface GameContextType {
    stats: GameStats;
    updateStats: (updates: Partial<GameStats>) => void;
    isLoading: boolean;
}

const defaultStats: GameStats = {
    logic: 10,
    memory: 10,
    legacy: 0,
    level: 1,
    classType: "Novice"
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<GameStats>(defaultStats);
    const [isLoading, setIsLoading] = useState(false);

    // List of keys allowed to be sent to the API to avoid sending unrelated state
    const ALLOWED_STATS = ['logic', 'memory', 'legacy', 'level'];

    useEffect(() => {
        // Load from LocalStorage on mount
        setIsLoading(true);
        try {
            const saved = localStorage.getItem('cobol-quest-save');
            if (saved) {
                const parsed = JSON.parse(saved);
                setStats({
                    ...defaultStats, // Ensure new fields are populated if missing
                    ...parsed
                });
            } else {
                // No save found, use defaults
                setStats(defaultStats);
            }
        } catch (error) {
            console.error("Failed to load save", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateStats = (updates: Partial<GameStats>) => {
        setStats(prev => {
            const newState = { ...prev, ...updates };
            // Save to LocalStorage immediately
            try {
                localStorage.setItem('cobol-quest-save', JSON.stringify(newState));
            } catch (err) {
                console.error("Failed to save progress", err);
            }
            return newState;
        });
    };

    return (
        <GameContext.Provider value={{ stats, updateStats, isLoading }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
