import Grimoire from '@/components/Grimoire';

export default function Play() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-stone-900">
            <Grimoire />

            <div className="fixed top-4 left-4 z-50">
                <a href="/" className="text-stone-500 hover:text-gold-400 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity">
                    &lt; EXIT_TO_MAIN
                </a>
            </div>
        </main>
    );
}
