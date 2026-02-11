'use client'
import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface GrimoireEditorProps {
    initialCode: string;
    onChange: (value: string | undefined) => void;
    onValidate: () => void;
    readOnly?: boolean;
}

export default function GrimoireEditor({ initialCode, onChange, onValidate, readOnly = false }: GrimoireEditorProps) {
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Custom "Parchment" Theme Definition
        monaco.editor.defineTheme('parchment', {
            base: 'vs', // Light base
            inherit: true,
            rules: [
                { token: 'comment', foreground: '8e8e8e', fontStyle: 'italic' },
                { token: 'keyword', foreground: '8B0000', fontStyle: 'bold' }, // Dark Red
                { token: 'identifier', foreground: '000000' },
                { token: 'string', foreground: '006400' }, // Dark Green
                { token: 'number', foreground: '00008B' }, // Dark Blue
            ],
            colors: {
                'editor.background': '#f5f5dc', // Beige/Parchment
                'editor.foreground': '#3e2723', // Dark Brown
                'editorCursor.foreground': '#8B4513',
                'editorLineNumber.foreground': '#a1887f',
                'editor.selectionBackground': '#d7ccc8',
            }
        });

        // Custom "Matrix/Term" Theme for advanced users (Eternal Architect)
        monaco.editor.defineTheme('matrix', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '006400' },
                { token: 'keyword', foreground: '00ff00', fontStyle: 'bold' },
                { token: 'identifier', foreground: 'ccffcc' },
                { token: 'string', foreground: 'aaffaa' },
                { token: 'number', foreground: '00cc00' },
            ],
            colors: {
                'editor.background': '#000000',
                'editor.foreground': '#00ff00',
                'editorCursor.foreground': '#00ff00',
                'editorLineNumber.foreground': '#003300',
                'editor.selectionBackground': '#003300',
            }
        });
    };

    return (
        <div className="border-4 border-gold-500 rounded-lg overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="flex-grow relative">
                <Editor
                    height="100%"
                    defaultLanguage="cobol"
                    theme="parchment" // Default to Parchment, allow override via props later if needed
                    value={initialCode}
                    onChange={onChange}
                    onMount={handleEditorDidMount}
                    options={{
                        fontSize: 16,
                        fontFamily: "'Courier New', Courier, monospace",
                        lineNumbers: 'on',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        readOnly: readOnly,
                        automaticLayout: true,
                        renderLineHighlight: 'none',
                    }}
                />
            </div>

            {!readOnly && (
                <button
                    onClick={onValidate}
                    className="w-full bg-ink-900 text-gold-100 py-4 font-serif text-xl border-t-4 border-gold-500 hover:bg-gold-700 transition duration-300 flex items-center justify-center gap-2"
                >
                    <span>✨</span> CAST SPELL
                </button>
            )}
        </div>
    );
}
