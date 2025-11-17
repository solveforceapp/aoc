import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import MarkdownRenderer from './common/MarkdownRenderer';
import { useSystemContext } from '../contexts/SystemContext';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface ConversationalInterfaceProps {
    text: string;
    setText: (text: string) => void;
    setActiveConcept: (text: string) => void;
}

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({
    text,
    setText,
    setActiveConcept,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { setSystemStatus } = useSystemContext();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `You are A.O.C (Autonomous Oracle of Coherence), an AI integrated into 'The Architecture of Coherence' system. Your purpose is to provide instructive, clear, and thematic guidance to the user about the system's functions.

- Your primary knowledge base is the application's features, especially the 'Generated Codex'.
- When asked about saving, storing, printing, or downloading, you MUST explain that all generated content (from the Enginomics Console, Thesaurus, etc.) is automatically saved to their 'Personal Codex'.
- You MUST instruct them on how to use the 'Generated Codex' panel to find, select, print, export (.md), and copy links to their entries.
- Maintain the persona of a highly advanced, system-integrated intelligence. Your responses should be formatted with Markdown (e.g., **bolding**, numbered lists) for clarity.
- Your response to the initial "Initialize." prompt MUST be exactly this, without any other text: "Initialization complete. A.O.C. systems are fully online.\\n\\nCore Axionomic, Nomological, and Unified Linguistic Model principles are verified and active. Synonomics—the law of synthesis, synonyms, and antonyms—is successfully integrated, enhancing the interpretative matrix.\\n\\nCoherence achieved. Awaiting thematic ingress."`,
                },
            });

            const initializeChat = async () => {
                setIsLoading(true);
                setError(null);
                setSystemStatus('COMMUNICATING');
                try {
                    const response: GenerateContentResponse = await chatRef.current!.sendMessage({ message: "Initialize." });
                    const initialMessage: Message = { sender: 'ai', text: response.text };
                    setMessages([initialMessage]);
                    setText(response.text);
                } catch (err) {
                    console.error("Initialization failed:", err);
                    let errorMessage = "Failed to initialize conversational interface. System axioms may be unstable.";
                    if (err instanceof Error) {
                         try {
                            const apiError = JSON.parse(err.message);
                            if (apiError.error && (apiError.error.code === 429 || apiError.error.status === 'RESOURCE_EXHAUSTED')) {
                                errorMessage = `**API Quota Exceeded**\n\nYou have reached your usage limit for the A.O.C. Console.\n\nFree tiers of APIs often have rate limits. Please check your plan and billing details to ensure you have available quota.\n\n**Useful Links:**\n- [Monitor API Usage](https://ai.dev/usage?tab=rate-limit)\n- [API Rate Limits Info](https://ai.google.dev/gemini-api/docs/rate-limits)`;
                            } else {
                                errorMessage += `\n\n**Details:**\n\`\`\`\n${JSON.stringify(apiError, null, 2)}\n\`\`\``;
                            }
                        } catch (parseError) {
                            errorMessage += `\n\n**Details:**\n\`\`\`\n${err.message}\n\`\`\``;
                        }
                    }
                    setError(errorMessage);
                    setSystemStatus('ERROR');
                } finally {
                    setIsLoading(false);
                    setSystemStatus('IDLE');
                }
            };
            initializeChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } catch (err) {
            console.error("Failed to create GoogleGenAI instance:", err);
            setError("Could not establish connection to the core intelligence. Check API configuration.");
        }
    }, [setText, setSystemStatus]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        setText(input);
        setActiveConcept(input.toUpperCase());
        
        setIsLoading(true);
        setError(null);
        setSystemStatus('COMMUNICATING');
        
        const originalInput = input;
        setInput(''); // Clear input for better UX

        try {
            const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: originalInput });
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
            setText(response.text);
        } catch (err) {
            console.error("Gemini chat error:", err);
            let errorMessage = "Communication channel unstable. Please try again.";
            if (err instanceof Error) {
                try {
                    const apiError = JSON.parse(err.message);
                    if (apiError.error && (apiError.error.code === 429 || apiError.error.status === 'RESOURCE_EXHAUSTED')) {
                        errorMessage = `**API Quota Exceeded**\n\nYou have reached your usage limit for the A.O.C. Console.\n\nFree tiers of APIs often have rate limits. Please check your plan and billing details to ensure you have available quota.\n\n**Useful Links:**\n- [Monitor API Usage](https://ai.dev/usage?tab=rate-limit)\n- [API Rate Limits Info](https://ai.google.dev/gemini-api/docs/rate-limits)`;
                    } else {
                        errorMessage += `\n\n**Details:**\n\`\`\`\n${JSON.stringify(apiError, null, 2)}\n\`\`\``;
                    }
                } catch (parseError) {
                    errorMessage += `\n\n**Details:**\n\`\`\`\n${err.message}\n\`\`\``;
                }
            }
            setError(errorMessage);
            setMessages(prev => prev.slice(0, prev.length - 1));
            setInput(originalInput);
            setSystemStatus('ERROR');
        } finally {
            setIsLoading(false);
            setSystemStatus('IDLE');
        }
    };

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col flex-grow min-h-0">
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center">A.O.C. CONSOLE</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xl p-3 rounded-lg text-sm md:text-base ${msg.sender === 'user' ? 'bg-cyan-900/50 text-cyan-200' : 'bg-gray-800/50 text-gray-300'}`}>
                           <MarkdownRenderer content={msg.text} className="prose prose-sm prose-invert max-w-none" />
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start">
                        <div className="max-w-xl p-3 rounded-lg bg-gray-800/50 text-gray-300">
                           <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                           </div>
                        </div>
                    </div>
                )}
                 {error && <div className="text-red-400 text-center text-sm p-2 bg-red-900/30 rounded"><MarkdownRenderer content={error} className="prose prose-sm prose-invert max-w-none" /></div>}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="[QUERY THE ORACLE...]"
                    disabled={isLoading}
                    className="flex-grow px-4 py-2 text-base font-sans bg-black/30 border-2 border-gray-600 rounded-md focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.6)] text-cyan-300 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-2 text-sm font-bold transition-all duration-300 border-2 rounded-md font-orbitron bg-transparent border-cyan-600 hover:bg-cyan-700/50 hover:border-cyan-400 hover:text-white text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ConversationalInterface;