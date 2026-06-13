"use client";

import React, { useState, useEffect } from 'react';
import { Scroll, Skull, Zap, Brain, Hourglass, ChevronRight, ChevronLeft, ShieldCheck, Terminal, Database } from 'lucide-react';
import { validateLevel1, validateLevel17, validateLevel18, validateLevel19, validateLevel20, validateLevel21, validateLevel22, validateLevel23, validateLevel24, validateLevel25, validateLevel26, validateLevel27, validateLevel28, validateLevel29, validateLevel30, validateLevel31, validateLevel32, validateLevel33, ValidationResult } from '../lib/cobol';
import { useGame } from '../context/GameContext';
import GrimoireEditor from './GrimoireEditor';
import TechnomancerStats from './TechnomancerStats';
import MainframeMap from './MainframeMap';
import ArchitectAscensionModal from './ArchitectAscensionModal';
import LevelUpToast from './LevelUpToast';
// Server validation removed for web version

import { getTechnomancerClass, getXPToNextLevel } from '../lib/levelLogic';

interface LevelConfig {
    id: number;
    title: string;
    lore: string;
    initialCode: string;
    validator: (code: string) => ValidationResult;
}

const LEVELS: LevelConfig[] = [
    {
        id: 1,
        title: "The Identification Ritual",
        lore: "You stand before the Gilded Gate of the Mainframe. The silent hum of the Elder Code vibrates through the floor. To enter, you must inscribe your true name into the fabric of reality. The Spirits of the Void (Null Pointers) will consume the nameless. \n\nTask: Complete the IDENTIFICATION DIVISION to declare your PROGRAM-ID.",
        initialCode: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. ____________.
       AUTHOR. ____________.`,
        validator: validateLevel1
    },
    {
        id: 17,
        title: "The Gateway to CICS",
        lore: "The local archives are not enough. You must now reach out to the Great Network—the CICS (Customer Information Control System). In this realm, spells are not cast once and forgotten; they are triggered by 'Transactions'—short, powerful bursts of magic invoked by users across the kingdom. \n\nTask: Declare a CICS command to send a simple text map to a terminal.",
        initialCode: `       PROCEDURE DIVISION.
      * CICS spells are wrapped in special sigils.
           ____ CICS 
               SEND TEXT FROM('WELCOME TO THE NETWORK')
               ERASE
           ____ ____.
           GOBACK.`,
        validator: validateLevel17
    },
    {
        id: 18,
        title: "The Screen Weaver",
        lore: "In the old ways, text flowed like a river. In the CICS realm, we use BMS Maps—ethereal templates that define exactly where runes appear on a screen. You do not just 'display'; you 'SEND MAP'. This allows the user to see fields for names, gold, and health in fixed positions. \n\nTask: Invoke the command to project the map named HEROMAP from the mapset MAPSET1.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               SEND ___('HEROMAP')
               MAPSET('MAPSET1')
               ERASE
           END-EXEC.
           GOBACK.`,
        validator: validateLevel18
    },
    {
        id: 19,
        title: "The Commarea Pouch",
        lore: "Transactions are fleeting. When one ends, the Mainframe forgets everything—unless you store your essence in the COMMAREA. Think of it as a small pouch of memory passed from one spell to the next. If you do not check the length of this pouch, you may be reaching into nothingness. \n\nTask: In the LINKAGE SECTION, define the sacred name used by CICS to hold passed data, and then check if its length (EIBCALEN) is greater than zero.",
        initialCode: `       DATA DIVISION.
       LINKAGE SECTION.
       01  ___________.
           05 HERO-DATA  PIC X(100).

       PROCEDURE DIVISION.
           IF ________ > 0
               DISPLAY "DATA RECEIVED"
           ELSE
               DISPLAY "FIRST TIME INITIALIZATION"
           END-IF.
           GOBACK.`,
        validator: validateLevel19
    },
    {
        id: 20,
        title: "The Pulse of the User",
        lore: "A Master Technomancer must react to the user's gaze. Did they press the PF3 rune to flee? Or ENTER to strike? We use the HANDLE AID ritual to tell the program which paragraph to jump to based on the key pressed. \n\nTask: Set up a handler that jumps to the EXIT-RITUAL paragraph if the user presses PF3.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               HANDLE AID
               ___(EXIT-RITUAL)
           END-EXEC.
           
      * The program waits for user interaction here...`,
        validator: validateLevel20
    },
    {
        id: 21,
        title: "The Shield of Stability",
        lore: "In the CICS realm, a single missing record can shatter a spell. You must raise a 'Shield of Stability.' By invoking HANDLE CONDITION, you tell the Mainframe: 'If the data is NOT FOUND, do not crash; instead, jump to this sanctuary (paragraph). \n\nTask: Set up a condition handler for the NOTFND (Not Found) event that directs the flow to a paragraph named RECORD-MISSING.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               HANDLE CONDITION
               ______(RECORD-MISSING)
           END-EXEC.
           
           EXEC CICS
               READ DATASET('HEROES')
               INTO(HERO-RECORD)
               RIDFLD(HERO-ID)
           END-EXEC.`,
        validator: validateLevel21
    },
    {
        id: 22,
        title: "The Dragon's Hoard",
        lore: "You have moved beyond simple scrolls (flat files). Now, you stand before the Dragon’s Hoard—the Relational Database. Here, data is stored in massive, interconnected tables. To retrieve gold or stats, you must embed a new language within your COBOL: the Structured Query Language (SQL). \n\nTask: Write a SELECT statement to find the GOLD_COUNT for a specific hero.",
        initialCode: `       PROCEDURE DIVISION.
      * SQL spells begin with EXEC SQL and end with END-EXEC.
           ________
               SELECT GOLD_COUNT
               INTO :WS-GOLD
               FROM HERO_TABLE
               WHERE HERO_ID = :WS-ID
           ________.`,
        validator: validateLevel22
    },
    {
        id: 23,
        title: "The Cursor's Compass",
        lore: "Sometimes the hoard is too vast to carry at once. A single SELECT cannot hold a thousand items. You must summon a Cursor—a magical compass that points to one row at a time. You must DECLARE it, OPEN it, and FETCH from it until the hoard is empty. \n\nTask: Define the command to retrieve the next row of data from the HOARD-CURSOR.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC SQL OPEN HOARD-CURSOR END-EXEC.

           PERFORM UNTIL SQLCODE NOT = 0
               EXEC SQL
                   _____ HOARD-CURSOR
                   INTO :WS-ITEM-NAME
               END-EXEC
           END-PERFORM.

           EXEC SQL CLOSE HOARD-CURSOR END-EXEC.`,
        validator: validateLevel23
    },
    {
        id: 24,
        title: "The Vow of Finality",
        lore: "When dealing with the Dragon's Hoard (DB2), your changes are not permanent until you swear a Vow of Finality. If your spell is interrupted halfway through a gold transfer, the gold could vanish into the ether! You must COMMIT to save your work, or ROLLBACK to return the world to how it was before the ritual began. \n\nTask: Complete the logic to finalize the database changes if the transaction is successful.",
        initialCode: `       PROCEDURE DIVISION.
           IF SQLCODE = 0
               EXEC SQL ______ END-EXEC
               DISPLAY "THE HOARD IS UPDATED."
           ELSE
               EXEC SQL ________ END-EXEC
               DISPLAY "RITUAL FAILED. REALITY RESTORED."
           END-IF.`,
        validator: validateLevel24
    },
    {
        id: 25,
        title: "The JCL Chariot",
        lore: "You have written the spells, but now you must command the Chariot (The Operating System) to run them. JCL is the language of the Charioteers. It tells the Mainframe: 'Who is paying for this?', 'Which program are we running?', and 'Which scrolls (Files) should be loaded into the carriage?' \n\nTask: Identify the EXEC statement to run your compiled program named LVL-UP and define the Data Definition (DD) for the output.",
        initialCode: `//TECHJOB  JOB (ACCT),'MASTER ADEPT'
//STEP01   ____ PGM=LVL-UP
//SYSOUT   __ SYSOUT=*
//SYSIN    DD *
  (Input data goes here)
/*`,
        validator: validateLevel25
    },
    {
        id: 26,
        title: "The VSAM Shadow-Key",
        lore: "Standard scrolls are read from start to finish. But the VSAM Shadow-Keys allow you to teleport directly to any line in a massive archive instantly. You must define a KSDS (Key-Sequenced Data Set) and use the START command to position your gaze at a specific index before reading. \n\nTask: Complete the START command to position the file pointer at a specific HERO-ID before beginning a sequential read.",
        initialCode: `       PROCEDURE DIVISION.
           MOVE "H1024" TO HERO-ID-KEY.
           _____ SCROLL-FILE
               KEY IS NOT LESS THAN HERO-ID-KEY
               INVALID KEY
                   DISPLAY "KEY NOT IN ARCHIVE"
           END-START.`,
        validator: validateLevel26
    },
    {
        id: 27,
        title: "The Duel of Locks",
        lore: "In the Network, two Sorcerers may try to update the same Dragon's Hoard at once. This leads to the Curse of the Deadlock. You must ENQ (Enqueue) a resource to lock others out while you work, and DEQ (Dequeue) it to release the lock when your ritual is finished. \n\nTask: Secure the resource named 'GOLD-VAULT' so no other transaction can touch it.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               ___ RESOURCE('GOLD-VAULT')
               LENGTH(10)
           END-EXEC.
           
      * Perform the gold transfer logic here...
           
           EXEC CICS
               ___ RESOURCE('GOLD-VAULT')
               LENGTH(10)
           END-EXEC.`,
        validator: validateLevel27
    },
    {
        id: 28,
        title: "The Bridge to the New World",
        lore: "The kingdoms of the Outside (The Web) do not speak in fixed-width records. They speak in a tongue called JSON. You must use the TRANSFORM ritual to convert your internal Essence into a format that the Web Spirits can understand. \n\nTask: Use the CICS command to turn a COBOL data structure into a JSON container.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               ________ TRANSFORM
               JSONTRANSFORM('HERO-TO-JSON')
               CHANNEL('HERO-CHANNEL')
               CONTAINER('HERO-DATA')
           END-EXEC.`,
        validator: validateLevel28
    },
    {
        id: 29,
        title: "The Mirror Ritual",
        lore: "A Master Architect does not wait for one spell to finish before starting the next. You must learn to 'Fork' your consciousness. By using the START command, you can launch a background familiar to handle long-running tasks (like massive gold calculations) while your main ritual continues to serve the user. \n\nTask: Initiate a new transaction named GOLD to run in the background, passing it the HERO-DATA container.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               _____ TRANSID('GOLD')
               INTERVAL(0)
               FROM(HERO-DATA)
           END-EXEC.
           
           DISPLAY "BACKGROUND RITUAL INITIATED."
           GOBACK.`,
        validator: validateLevel29
    },
    {
        id: 30,
        title: "The Eternal Architect",
        lore: "You stand at the summit. The Mainframe is no longer a mystery, but a tool of your own design. For your final rite, you must architect the 'Golden Bridge'. You must receive a request from the Web, validate it against the Dragon's Hoard, and update the Ancient Scrolls—all while ensuring no other sorcerer interferes. \n\nTask: Complete the high-level logic flow for the Architect's program.",
        initialCode: `       PROCEDURE DIVISION.
      * Step 1: Lock the vault
           EXEC CICS ENQ RESOURCE('VAULT') END-EXEC.
           
      * Step 2: Fetch the current gold
           EXEC SQL _____ GOLD FROM HERO_TAB WHERE ID = :H-ID END-EXEC.
           
      * Step 3: Check for errors
           IF SQLCODE NOT = 0
               EXEC SQL ________ END-EXEC
           ELSE
      * Step 4: Finalize the update
               EXEC SQL ______ END-EXEC
           END-IF.

      * Step 5: Release the vault
           EXEC CICS DEQ RESOURCE('VAULT') END-EXEC.
           GOBACK.`,
        validator: validateLevel30
    },
    {
        id: 31,
        title: "The Legacy Ouroboros (Phase 1)",
        lore: "EMERGENCY! The Ancient Record has entered a Deadlock Loop. A rogue transaction is consuming all the Mainframe's Mana. If the Ouroboros isn't quelled, the entire database will revert to the 'Dark Ages'. \n\nTask: Find the missing COMMIT that is causing the database to hold a lock indefinitely.",
        initialCode: `       EXEC SQL
           UPDATE KINGDOM_TREASURY
           SET GOLD = GOLD - 1000
           WHERE REALM = 'CENTRAL'
       END-EXEC.

      * ERROR: The boss has "eaten" the next line.
      * What command must be placed here to release the locks?
       ________________.`,
        validator: validateLevel31
    },
    {
        id: 32,
        title: "The Legacy Ouroboros (Phase 2)",
        lore: "The Ouroboros launches a 'Transaction Storm'. Thousands of requests are hitting the terminal. \n\nTask: Implement a HANDLE CONDITION to catch the SYSIDERR (System ID Error) before the server crashes.",
        initialCode: `       EXEC CICS
           HANDLE CONDITION
           __________(TERMINATE-RITUAL)
       END-EXEC.`,
        validator: validateLevel32
    },
    {
        id: 33,
        title: "The Legacy Ouroboros (Phase 3)",
        lore: "The beast is weak. To defeat it, the user must write a perfect PROCEDURE that reads the final status of the 'Ouroboros' record and, if it exists, deletes it from the database. \n\nTask: Delete the corruption and commit the victory.",
        initialCode: `       EXEC SQL
           SELECT STATUS INTO :WS-STATUS
           FROM BOSS_TABLE WHERE ID = 'OUROBOROS'
       END-EXEC.

       IF SQLCODE = 0 AND WS-STATUS = 'WEAK'
           EXEC SQL
               ______ FROM BOSS_TABLE
               WHERE ID = 'OUROBOROS'
           END-EXEC
           EXEC SQL COMMIT END-EXEC
           DISPLAY "THE LEGACY IS SECURED!"
       ELSE
           DISPLAY "THE BEAST REGENERATES..."
       END-IF.`,
        validator: validateLevel33
    }
];

export default function Grimoire() {
    const { stats, updateStats } = useGame();

    // Level State
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const currentLevel = LEVELS[currentLevelIndex];

    const [code, setCode] = useState(currentLevel.initialCode);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showVictoryModal, setShowVictoryModal] = useState(false);

    // Level Up State
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [levelUpData, setLevelUpData] = useState({ level: 1, className: "Novice Technomancer" });

    // Reset code when level changes
    useEffect(() => {
        setCode(currentLevel.initialCode);
        setFeedback(null);
        setIsSuccess(false);
    }, [currentLevelIndex]);

    // Theme logic - The Master's Console
    const isEternalArchitect = stats.classType === "Eternal Architect";

    const handleCompile = async () => {
        // 1. Client-Side Validation (Immediate feedback)
        const localResult = currentLevel.validator(code);
        const { success: finalSuccess, message: finalMessage, statRewards, newClassType } = localResult;

        // 2. Server-Side Validation (REMOVED for static web version)
        // Validation now happens purely in the browser using the local validator logic.


        if (finalSuccess) {
            setIsSuccess(true);
            setFeedback(finalMessage);

            // XP and Leveling Logic
            let newXP = stats.legacy + statRewards.legacy;
            let newLevelNum = stats.level;
            let leveledUp = false;

            // Check for Level Up (Overflow XP)
            while (newXP >= getXPToNextLevel(newLevelNum)) {
                newXP -= getXPToNextLevel(newLevelNum);
                newLevelNum++;
                leveledUp = true;
            }

            const updates: any = {
                legacy: newXP,
                logic: stats.logic + statRewards.logic,
                memory: stats.memory + statRewards.memory,
                level: newLevelNum
            };

            // Handle Class Promotion via Level
            if (leveledUp) {
                const newClass = getTechnomancerClass(newLevelNum);

                // Trigger Toast
                setLevelUpData({ level: newLevelNum, className: newClass });
                setShowLevelUp(true);
                setTimeout(() => setShowLevelUp(false), 6000); // 6s to allow reading

                if (newClass !== stats.classType) {
                    updates.classType = newClass;
                }
            }

            // Handle Specific Class Promotion (e.g. Boss Rewards overrides)
            if (newClassType) {
                updates.classType = newClassType;
                // If they become the Eternal Architect (Level 33 or 30 depending on config), show the victory modal
                if (newClassType === "Eternal Architect" && currentLevel.id >= 30) {
                    setTimeout(() => setShowVictoryModal(true), 2000); // Slight delay for dramatic effect
                }
            }

            updateStats(updates);

            // Client-side only mode: API call removed.
            // Progress is implicitly saved via updateStats which now uses LocalStorage.
            console.log("Progress saved for:", currentLevel.title);

        } else {
            setIsSuccess(false);
            setFeedback(finalMessage);
            updateStats({
                logic: Math.max(0, stats.logic + statRewards.logic)
            });
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        }
    };

    const prevLevel = () => {
        if (currentLevelIndex > 0) {
            setCurrentLevelIndex(prev => prev - 1);
        }
    };

    return (
        <div className={`min-h-screen p-8 flex items-center justify-center font-serif transition-colors duration-1000 ${isEternalArchitect ? 'bg-black text-cyan-400 font-mono' : 'bg-stone-900 text-ink-DEFAULT'}`}>

            {/* Map Modal */}
            {showMap && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={() => setShowMap(false)}>
                    <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-medieval text-gold-500">The Silicon Sanctum</h2>
                            <button onClick={() => setShowMap(false)} className="text-stone-400 hover:text-white">✕ CLOSE</button>
                        </div>
                        <MainframeMap
                            currentLevel={stats.level}
                            onLevelSelect={(id) => {
                                const idx = LEVELS.findIndex(l => l.id === id);
                                if (idx !== -1) {
                                    setCurrentLevelIndex(idx);
                                    setShowMap(false);
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Victory Modal */}
            <ArchitectAscensionModal
                isOpen={showVictoryModal}
                onClose={() => setShowVictoryModal(false)}
                heroName={stats.classType === "Novice" ? "Novice Coder" : "Master Adept"}
            />

            {/* Level Up Toast */}
            <LevelUpToast
                show={showLevelUp}
                level={levelUpData.level}
                className={levelUpData.className}
                onClose={() => setShowLevelUp(false)}
            />

            {/* The Ancient Tome (or Master's Console) Container */}
            <div className={`relative w-full max-w-6xl aspect-[3/2] rounded-lg shadow-2xl flex overflow-hidden transition-all duration-1000 ${isEternalArchitect
                ? 'bg-black border-4 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.5)]'
                : 'bg-[#5c4033] border-8 border-[#2b1d16]'
                }`}>

                {/* Left Page: Lore & Instructions */}
                <div className={`flex-1 p-8 relative flex flex-col ${isEternalArchitect
                    ? 'bg-black/90 border-r border-cyan-900 text-cyan-100'
                    : 'bg-parchment border-r border-[#d4c5a6] shadow-inner'
                    }`}>
                    {!isEternalArchitect && <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('/parchment-texture.png')] mix-blend-multiply"></div>}

                    <div className="relative z-10 flex flex-col h-full">
                        <header className={`border-b-2 pb-4 mb-6 ${isEternalArchitect ? 'border-cyan-500/50' : 'border-ink-light/30'}`}>
                            <h1 className={`text-3xl font-bold flex items-center gap-2 ${isEternalArchitect ? 'text-cyan-400 font-mono tracking-widest' : 'text-ink-dark'}`}>
                                {isEternalArchitect ? <Terminal className="w-8 h-8" /> : <Scroll className="w-8 h-8 text-gold-DEFAULT" />}
                                {currentLevel.title}
                            </h1>
                            <div className={`mt-2 flex flex-wrap gap-4 text-sm ${isEternalArchitect ? 'font-mono text-cyan-600' : 'font-mono text-ink-light'}`}>
                                <TechnomancerStats logic={stats.logic} memory={stats.memory} legacy={stats.legacy} />
                                {isEternalArchitect && <span className="flex items-center gap-1 text-yellow-400 font-bold glow w-full mt-2 justify-center"><ShieldCheck size={16} /> ETERNAL ARCHITECT</span>}
                            </div>
                        </header>

                        <div className={`prose flex-grow text-lg leading-relaxed overflow-y-auto ${isEternalArchitect ? 'prose-invert text-cyan-200 font-mono' : 'prose-stone'}`}>
                            <p className="whitespace-pre-line">{currentLevel.lore}</p>

                            <div className={`mt-8 p-4 border rounded text-sm italic ${isEternalArchitect
                                ? 'bg-cyan-900/20 border-cyan-500/50 text-cyan-300'
                                : 'bg-yellow-100/50 border-yellow-200 text-ink-dark'
                                }`}>
                                <strong>{isEternalArchitect ? "SYSTEM ALERT:" : "Elder Hint:"}</strong> {currentLevel.id >= 31 ? "The Ouroboros is tricky. Watch your syntax carefully." : "All COBOL statements must end with a period."}
                            </div>
                        </div>

                        {feedback && (
                            <div className={`mt-6 p-4 border rounded ${isSuccess ? 'bg-green-100 border-green-300 text-green-900' : 'bg-red-100 border-red-300 text-red-900'}`}>
                                {isSuccess ? '✨ ' : '💀 '} {feedback}
                            </div>
                        )}

                        {/* Level Navigation Controls */}
                        <div className={`mt-4 flex justify-between pt-4 border-t ${isEternalArchitect ? 'border-cyan-900' : 'border-ink-light/10'}`}>
                            <button
                                onClick={prevLevel}
                                disabled={currentLevelIndex === 0}
                                className={`flex items-center hover:scale-105 transition-all ${currentLevelIndex === 0 ? 'opacity-0' : 'opacity-100'} ${isEternalArchitect ? 'text-cyan-500 hover:text-cyan-300' : 'hover:text-gold-DEFAULT'}`}
                            >
                                <ChevronLeft size={20} /> {isEternalArchitect ? "PREV_NODE" : "Prev Ritual"}
                            </button>
                            <span className="font-mono text-xs opacity-50">Page {currentLevelIndex + 1} of {LEVELS.length}</span>
                            <button
                                onClick={() => setShowMap(true)}
                                className={`px-4 py-1 border rounded text-xs uppercase tracking-widest hover:bg-gold-900/20 transition-colors ${isEternalArchitect ? 'border-cyan-700 text-cyan-500' : 'border-gold-700 text-gold-600'}`}
                            >
                                View Map
                            </button>
                            <button
                                onClick={nextLevel}
                                disabled={currentLevelIndex === LEVELS.length - 1}
                                className={`flex items-center hover:scale-105 transition-all ${currentLevelIndex === LEVELS.length - 1 ? 'opacity-0' : 'opacity-100'} ${isEternalArchitect ? 'text-cyan-500 hover:text-cyan-300' : 'hover:text-gold-DEFAULT'}`}
                            >
                                {isEternalArchitect ? "NEXT_NODE" : "Next Ritual"} <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Page: The Code Editor */}
                <div className={`flex-1 p-8 relative flex flex-col ${isEternalArchitect ? 'bg-gray-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]' : 'bg-parchment shadow-inner'}`}>
                    {!isEternalArchitect && <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('/parchment-texture.png')] mix-blend-multiply"></div>}

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`text-xl font-bold ${isEternalArchitect ? 'text-cyan-500' : 'text-ink-dark'}`}>The Inscription</h2>
                            <span className={`text-xs font-mono ${isEternalArchitect ? 'text-cyan-700' : 'text-ink-light'}`}>COBOL-85</span>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-grow w-full h-[500px]"> {/* Fixed height for editor container */}
                            <GrimoireEditor
                                initialCode={code}
                                onChange={(val) => setCode(val || '')}
                                onValidate={handleCompile}
                            />
                        </div>
                    </div>
                </div>

                {/* Book Spine (Visual) */}
                {!isEternalArchitect && <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-[#2b1d16]/20 via-transparent to-[#2b1d16]/20 pointer-events-none"></div>}

                {/* Digital Spine */}
                {isEternalArchitect && <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-cyan-900 shadow-[0_0_10px_#06b6d4]"></div>}
            </div>
        </div>
    );
}
