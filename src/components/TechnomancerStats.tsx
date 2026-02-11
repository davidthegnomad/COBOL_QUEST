'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatProps {
    label: string;
    value: number;
    maxValue: number;
    color: string; // e.g., 'bg-blue-500' for Logic, 'bg-purple-500' for Memory
    icon?: string;
}

const ProgressBar = ({ label, value, maxValue, color, icon }: StatProps) => {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <span className="font-medieval text-gold-400 text-lg uppercase tracking-widest flex items-center gap-2">
                    {icon && <span className="text-xl">{icon}</span>}
                    {label}
                </span>
                <span className="text-gold-200 font-mono text-sm">{value} / {maxValue}</span>
            </div>
            <div className="h-4 w-full bg-stone-900 border border-gold-900/30 rounded-full overflow-hidden shadow-inner relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
                />
                {/* Glow effect at the tip of the bar */}
                <motion.div
                    animate={{ left: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 h-full w-2 bg-white blur-md opacity-50 -ml-1 pointer-events-none"
                />
            </div>
        </div>
    );
};

const Satchel = ({ items }: { items: any[] }) => (
    <div className="mt-8 border-t border-gold-700/30 pt-4">
        <h4 className="text-gold-500 font-medieval mb-3 uppercase tracking-wider text-sm">Inventory (Satchel)</h4>
        <div className="flex gap-3 flex-wrap">
            <AnimatePresence>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                        title={item.name + ": " + item.effect}
                        className="w-12 h-12 bg-stone-800 border-2 border-gold-600/50 rounded-lg flex items-center justify-center cursor-help hover:scale-110 hover:border-gold-400 transition-all shadow-lg group relative"
                    >
                        <span className="text-2xl drop-shadow-md group-hover:drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]">
                            {item.icon || '📜'}
                        </span>

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-black text-gold-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-gold-500/30">
                            {item.name}
                        </div>
                    </motion.div>
                ))}
                {items.length === 0 && (
                    <p className="text-stone-500 text-sm italic">Your satchel is empty...</p>
                )}
            </AnimatePresence>
        </div>
    </div>
);

export default function TechnomancerStats({ logic, memory, legacy, items = [] }: { logic: number, memory: number, legacy: number, items?: any[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-stone-950/80 border-2 border-gold-700 rounded-xl backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-sm w-full"
        >
            <h3 className="text-2xl font-medieval text-center text-gold-500 mb-6 tracking-tighter border-b border-gold-800 pb-2">
                Current Attunement
            </h3>

            <ProgressBar label="Logic" value={logic} maxValue={500} color="bg-cyan-600" icon="⚡" />
            <ProgressBar label="Memory" value={memory} maxValue={500} color="bg-indigo-600" icon="🧠" />

            {/* Legacy is often treated differently, maybe as XP bar or just a number */}
            <div className="mt-4 flex justify-between items-center bg-stone-900/50 p-3 rounded border border-gold-900/30">
                <span className="font-medieval text-gold-600 uppercase text-sm">Legacy (XP)</span>
                <span className="font-mono text-gold-300 font-bold">{legacy}</span>
            </div>

            <Satchel items={items} />
        </motion.div>
    );
}
