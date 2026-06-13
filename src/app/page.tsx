import Image from 'next/image';
import Link from 'next/link';
import { Scroll, Zap, Skull, Terminal } from 'lucide-react';

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-cyan-900 selection:text-cyan-100">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            {/* Small Logo */}
                            <div className="relative w-8 h-8 rounded overflow-hidden border border-cyan-500/30">
                                <Image
                                    src="/cobol-crest.png"
                                    alt="COBOL Quest Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-fantasy text-xl font-bold tracking-wider text-stone-100">COBOL Quest</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/play" className="bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-md text-sm font-mono border border-cyan-500/30 transition-all">
                                    INITIATE_SEQUENCE
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('/hero-banner.png')" }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-70 bg-black"></span>
                </div>

                <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                            <div className="mb-8 flex justifying-center w-full justify-center">
                                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-cyan-500/50">
                                    <Image
                                        src="/cobol-crest.png"
                                        alt="COBOL Quest Seal"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <h1 className="text-white font-fantasy text-5xl md:text-7xl font-bold leading-tight mb-4 drop-shadow-lg">
                                The Silicon Sanctum
                            </h1>

                            <p className="mt-4 text-lg md:text-2xl text-stone-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                                "Master the ancient language that powers the world. COBOL Quest merges the rigid structure of 1950s mainframe programming with the immersive world of a modern RPG. Transcribe your spells, weave your data, and ascend to the rank of Eternal Architect."
                            </p>

                            <div className="flex justify-center gap-4 flex-col sm:flex-row">
                                <Link href="/play" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded shadow-lg transform hover:scale-105 transition-all text-lg font-mono border-2 border-cyan-400 flex items-center justify-center gap-2">
                                    <Terminal size={20} />
                                    START_QUEST
                                </Link>
                                <a href="#features" className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-4 px-8 rounded shadow-lg transition-all text-lg border border-stone-600 flex items-center justify-center gap-2">
                                    READ_DOCUMENTATION
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="relative py-20 bg-stone-900 border-t border-stone-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center MB-24">
                        <div className="w-full lg:w-6/12 px-4">
                            <h2 className="text-4xl font-fantasy text-gold-500 mb-4">Key Features</h2>
                            <p className="text-lg text-stone-400 mb-16">
                                Reclaim the lost arts of the Mainframe in a world built for the modern Technomancer.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-4/12 px-4 text-center mb-12 md:mb-0">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-xl rounded-lg bg-stone-800/50 border border-stone-700 p-8 hover:bg-stone-800 transition-colors group">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-stone-700 group-hover:bg-gold-600 group-hover:text-black transition-colors">
                                        <Scroll size={32} />
                                    </div>
                                    <h6 className="text-xl font-bold font-fantasy text-stone-200">The Grimoire IDE</h6>
                                    <p className="mt-2 mb-4 text-stone-400">
                                        Forget white screens. Our Grimoire is a high-end coding environment with parchment themes, syntax highlighting, and real-time validation.
                                    </p>
                                    <p className="text-xs font-mono text-gold-500/70 border-t border-stone-700 pt-4">"Code with the weight of history."</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-4/12 px-4 text-center mb-12 md:mb-0">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-xl rounded-lg bg-stone-800/50 border border-stone-700 p-8 hover:bg-stone-800 transition-colors group">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-stone-700 group-hover:bg-cyan-600 transition-colors">
                                        <Zap size={32} />
                                    </div>
                                    <h6 className="text-xl font-bold font-fantasy text-stone-200">The Silicon Sanctum</h6>
                                    <p className="mt-2 mb-4 text-stone-400">
                                        Traverse the Mainframe Circuit Map, an SVG-based world where every trace reflects your mastery. Watch Sector 1 light up as you advance.
                                    </p>
                                    <p className="text-xs font-mono text-cyan-500/70 border-t border-stone-700 pt-4">"Bridge the gap between sectors."</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-xl rounded-lg bg-stone-800/50 border border-stone-700 p-8 hover:bg-stone-800 transition-colors group">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-full bg-stone-700 group-hover:bg-red-900 transition-colors">
                                        <Skull size={32} />
                                    </div>
                                    <h6 className="text-xl font-bold font-fantasy text-stone-200">The Elder Technomancer</h6>
                                    <p className="mt-2 mb-4 text-stone-400">
                                        Receive guidance from an AI mentor who understands the "Ancient Laws." Flavorful, thematic feedback that helps you learn without breaking immersion.
                                    </p>
                                    <p className="text-xs font-mono text-red-400/70 border-t border-stone-700 pt-4">"Adjust your ink, Adept."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-stone-950 pt-8 pb-6 border-t border-stone-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-stone-500 font-mono py-1">
                                Copyright © {new Date().getFullYear()} COBOL Quest by <span className="text-stone-300">David the Gnomad Inc.</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-stone-600">
                                    "The banks use it. The governments require it. You will master it."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
