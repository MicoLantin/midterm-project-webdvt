import { useEffect, useRef, useState } from 'react';
import frame1 from '../../assets/splash/frame1.jpg';
import frame2 from '../../assets/splash/frame2.jpg';
import frame3 from '../../assets/splash/frame3.jpg';

const FRAMES = [frame1, frame2, frame3];
const FRAME_INTERVAL_MS = 260;
const FLY_DURATION_MS = 650;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Splash({ onEnter }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [flying, setFlying] = useState(false);
  const reduced = useRef(prefersReducedMotion());

  useEffect(() => {
    if (reduced.current) return undefined;
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  function handleEnter() {
    if (flying) return;
    if (reduced.current) {
      onEnter();
      return;
    }
    setFlying(true);
    window.setTimeout(onEnter, FLY_DURATION_MS);
  }

  return (
    <div
      className="splash"
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
    >
      <img
        className={`splash__bulb${flying ? ' is-flying' : ''}`}
        src={FRAMES[frameIndex]}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <p className={`splash__hint${flying ? ' is-hidden' : ''}`}>— click anywhere —</p>
      <div className={`splash__flash${flying ? ' is-active' : ''}`} aria-hidden="true" />
    </div>
  );
}
