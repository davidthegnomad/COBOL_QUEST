import Image from 'next/image';
import Grimoire from '@/components/Grimoire'; // Make sure path is correct
// Also need to use "client component" logic if `Grimoire` is using hooks, which it is.
// So `Grimoire` is already marked "use client".

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-900">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                {/* Placeholder for header */}
            </div>

            <Grimoire />

            <footer className="mt-8 text-center text-xs text-stone-500">
                Constructed by The Technomancer's Apprentice.
            </footer>
        </main>
    );
}
