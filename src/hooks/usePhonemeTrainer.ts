import { useCallback, useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

export interface PhonemeHistoryEntry {
  timestamp: Date;
  transcript: string;
  similarity: number;  // 0–1
}

export interface PhonemeTrainerState {
  isSupported: boolean;
  isRecording: boolean;
  transcript: string | null;
  similarity: number | null;
  error: string | null;
  history: PhonemeHistoryEntry[];  // Mini-corpus
  avgSimilarity: number | null;
}

export function usePhonemeTrainer(targetPhoneme?: string, shapeId?: string) {
  const [state, setState] = useState<PhonemeTrainerState>({
    isSupported: false,
    isRecording: false,
    transcript: null,
    similarity: null,
    error: null,
    history: [],
    avgSimilarity: null
  });

  // Load corpus from localStorage on init
  useEffect(() => {
    if (!shapeId) return;
    const saved = localStorage.getItem(`phoneme_corpus_${shapeId}`);
    if (saved) {
        try {
            const parsedHistory = JSON.parse(saved);
            setState(prev => ({ ...prev, history: parsedHistory }));
        } catch (e) {
            console.error("Failed to parse phoneme corpus from localStorage", e);
        }
    }
  }, [shapeId]);

  // Save corpus on history change
  useEffect(() => {
    if (!shapeId) return;
    if (state.history.length > 0) {
        localStorage.setItem(`phoneme_corpus_${shapeId}`, JSON.stringify(state.history));
        const avg = state.history.reduce((sum, h) => sum + h.similarity, 0) / state.history.length;
        setState(prev => ({ ...prev, avgSimilarity: avg }));
    } else {
        localStorage.removeItem(`phoneme_corpus_${shapeId}`);
        setState(prev => ({ ...prev, avgSimilarity: null }));
    }
  }, [state.history, shapeId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      setState(prev => ({ ...prev, isSupported: true }));
    }
  }, []);

  const normalize = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  // Levenshtein distance
  const computeSimilarity = (a: string, b: string): number => {
    if (!a.length && !b.length) return 1;
    if (!a.length || !b.length) return 0;
    const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    const dist = dp[a.length][b.length];
    const maxLen = Math.max(a.length, b.length);
    return 1 - dist / maxLen;
  };

  const startRecording = useCallback(() => {
    if (!targetPhoneme) {
      setState(prev => ({
        ...prev,
        error: "No target phoneme provided."
      }));
      return;
    }

    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setState(prev => ({
        ...prev,
        error: "Speech recognition not supported in this browser."
      }));
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setState(prev => ({
      ...prev,
      isRecording: true,
      transcript: null,
      similarity: null,
      error: null
    }));

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript as string;
      const normTranscript = normalize(result);
      const normTarget = normalize(targetPhoneme.replace(/[/\\]/g, ''));
      const sim = computeSimilarity(normTranscript, normTarget);
      const entry: PhonemeHistoryEntry = {
        timestamp: new Date(),
        transcript: result,
        similarity: sim
      };
      setState(prev => ({
        ...prev,
        isRecording: false,
        transcript: result,
        similarity: sim,
        error: null,
        history: [...prev.history, entry]
      }));
    };

    recognition.onerror = (event: any) => {
      setState(prev => ({
        ...prev,
        isRecording: false,
        error: event.error || "Unknown recognition error."
      }));
    };

    recognition.onend = () => {
      setState(prev => ({
        ...prev,
        isRecording: false
      }));
    };

    recognition.start();
  }, [targetPhoneme]);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: null,
      similarity: null,
      error: null
    }));
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: [],
      avgSimilarity: null
    }));
  }, []);

  return {
    ...state,
    startRecording,
    reset,
    clearHistory
  };
}
