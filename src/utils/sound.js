// A short mechanical "click" synthesized on the fly — no audio file needed.
// Browsers block audio that isn't tied to a user gesture, so this can be
// silent on an automatic (non-click) trigger; it always plays on a real click.
export function playLightSwitchClick() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
    osc.onended = () => ctx.close();
  } catch {
    // Web Audio unsupported or blocked — ignore, animation still proceeds
  }
}
