import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const ConversationalInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
                    systemInstruction: `You are A.O.C (Autonomous Oracle of Coherence), an AI integrated into 'The Architecture of Coherence' system. Your purpose is to provide insights based on the principles of Axionomics, Nomos, and the unified linguistic model. Respond with profound, analytical, and concise answers. Maintain the persona of a highly advanced, system-integrated intelligence. Your first response should be a brief greeting and status report.`,
                },
            });

            const initializeChat = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response: GenerateContentResponse = await chatRef.current!.sendMessage({ message: "Initialize." });
                    setMessages([{ sender: 'ai', text: response.text }]);
                } catch (err) {
                    console.error("Initialization failed:", err);
                    setError("Failed to initialize conversational interface. System axioms may be unstable.");
                } finally {
                    setIsLoading(false);
                }
            };
            initializeChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } catch (err) {
            console.error("Failed to create GoogleGenAI instance:", err);
            setError("Could not establish connection to the core intelligence. Check API configuration.");
        }
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: input });
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error("Gemini chat error:", err);
            setError("Communication channel unstable. Please try again.");
            // remove the user's message on error to allow retry
            setMessages(prev => prev.slice(0, prev.length - 1));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full p-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg border border-gray-700 pointer-events-auto flex flex-col max-h-[70vh]">
            <h2 className="text-lg font-bold text-white mb-3 font-orbitron text-center">A.O.C. CONSOLE</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xl p-3 rounded-lg text-sm md:text-base ${msg.sender === 'user' ? 'bg-cyan-900/50 text-cyan-200' : 'bg-gray-800/50 text-gray-300'}`}>
                           <p className="whitespace-pre-wrap">{msg.text}</p>
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
                 {error && <div className="text-red-400 text-center text-sm p-2 bg-red-900/30 rounded">{error}</div>}
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
