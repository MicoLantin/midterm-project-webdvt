import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion';

// Reveals `text` one character at a time, like a retro game dialogue box.
// Returns the partially-revealed text and whether it's still typing.
export function useTypewriter(text, speedMs = 28) {
  const reduced = prefersReducedMotion();
  const [typedText, setTypedText] = useState(text);
  const [visibleCount, setVisibleCount] = useState(reduced ? text.length : 0);

  // When `text` changes, reset progress synchronously during render rather
  // than in an effect — this is React's documented pattern for adjusting
  // state in response to a prop change ("You Might Not Need an Effect").
  if (text !== typedText) {
    setTypedText(text);
    setVisibleCount(reduced ? text.length : 0);
  }

  useEffect(() => {
    if (reduced) return undefined;

    const id = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= text.length) {
          window.clearInterval(id);
          return count;
        }
        return count + 1;
      });
    }, speedMs);

    return () => window.clearInterval(id);
  }, [text, speedMs, reduced]);

  return { displayedText: text.slice(0, visibleCount), isTyping: !reduced && visibleCount < text.length };
}
