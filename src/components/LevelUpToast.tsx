'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LevelUpToastProps {
    show: boolean;
    level: number;
    className: string; // The "Class Name" like Data Weaver
    onClose: () => void;
}

export default function LevelUpToast({ show, level, className, onClose }: LevelUpToastProps) {
    // Auto-close after a few seconds if handled by parent, but here we just render
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="fixed top-8 right-8 z-[100] flex items-center gap-4 p-6 bg-stone-900 border-2 border-cyan-500 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
                    onClick={onClose}
                >
                    <div className="bg-cyan-500/20 p-3 rounded-full border border-cyan-400">
                        <Sparkles className="text-cyan-400 w-8 h-8" />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 text-xs uppercase tracking-tighter">System Interrupt: Elevation Detected</span>
                        </div>
                        <h4 className="font-medieval text-2xl text-white">LEVEL UP: {level}</h4>
                        <p className="font-mono text-gold-400 text-sm italic">New Rank: {className}</p>
                    </div>

                    {/* Mainframe-style scanning line effect */}
                    <motion.div
                        className="absolute left-0 top-0 w-1 h-full bg-cyan-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
