"use client";

import { useState } from "react";
import { Volume2, Square } from "lucide-react";

interface VoiceAssistantProps {
    text: string;
}

export default function VoiceAssistant({ text }: VoiceAssistantProps) {
    const [speaking, setSpeaking] = useState(false);

    const speak = () => {
        if (!window.speechSynthesis) return;

        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onend = () => setSpeaking(false);

        setSpeaking(true);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <button
            onClick={speak}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded-full text-xs text-white border border-white/10"
            title={speaking ? "Stop Reading" : "Read Prediction"}
        >
            {speaking ? <Square size={14} className="animate-pulse" /> : <Volume2 size={14} />}
            {speaking ? "Stop" : "Listen to Analysis"}
        </button>
    );
}
