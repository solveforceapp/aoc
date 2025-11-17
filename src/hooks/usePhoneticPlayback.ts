import { useCallback, useEffect, useState } from "react";
import type { LanguageUnits } from "../geometronomics/shapes";

export function usePhoneticPlayback(language: LanguageUnits | null) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    } else {
      setSupported(false);
    }
  }, []);

  const play = useCallback(() => {
    if (!language?.phoneme) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(language.phoneme.replace(/[/\\]/g, ''));
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [language]);

  return {
    play,
    supported,
    hasPhoneme: !!language?.phoneme
  };
}
