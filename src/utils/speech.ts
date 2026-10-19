/**
 * Safe browser speech synthesis utility for English pronunciation.
 * Fully client-side, offline-compatible, no external APIs required.
 */

export function speakEnglish(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clear educational delivery
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(
      (v) =>
        (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || true)
    );

    if (enVoice) {
      utterance.voice = enVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.warn('Speech synthesis error:', error);
    if (onEnd) onEnd();
    return false;
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
