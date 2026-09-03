import { useEffect, useMemo, useRef, useState } from 'react';
import smileFace from '../../assets/companion/smile.jpg';
import talkingFace from '../../assets/companion/talking.jpg';
import sadFace from '../../assets/companion/sad.jpg';

// 'sad' is imported and mapped here so it's ready, but nothing sets
// face to 'sad' yet — that trigger condition is still to be decided.
const FACES = { smile: smileFace, talking: talkingFace, sad: sadFace };
const TALK_DURATION_MS = 1600;

const EMPTY_LINES = ["Wala pa tay transaction. I'm bored, log something."];
const LOW_BALANCE_LINES = ['Paldo ka na naman boi! Angasan mo pa!', 'Zero na imong kwarta, chill lang sa gastos.'];
const BIG_EXPENSE_LINES = ['Kadako sa gasto ha... sigurado ka?'];
const HEALTHY_LINES = ['Okay ra imong balance, keep it up.', 'Naa pa diay ka kwarta? Impressive.'];

function pickLine({ balance, hasTransactions, latestExpense }) {
  if (!hasTransactions) return EMPTY_LINES[0];
  if (balance < 0) return LOW_BALANCE_LINES[0];
  if (latestExpense && latestExpense.amount >= 1000) return BIG_EXPENSE_LINES[0];
  if (balance < 500) return LOW_BALANCE_LINES[1];
  return HEALTHY_LINES[Math.floor(balance) % HEALTHY_LINES.length];
}

export default function CompanionDialogueBox({ balance, hasTransactions, latestExpense }) {
  const line = useMemo(
    () => pickLine({ balance, hasTransactions, latestExpense }),
    [balance, hasTransactions, latestExpense],
  );

  const [face, setFace] = useState('smile');
  const timeoutRef = useRef(null);

  // Whenever the line changes, the companion "talks" briefly, then settles back to smiling.
  useEffect(() => {
    setFace('talking');
    timeoutRef.current = window.setTimeout(() => setFace('smile'), TALK_DURATION_MS);
    return () => window.clearTimeout(timeoutRef.current);
  }, [line]);

  return (
    <div className="companion">
      <div className="companion__avatar">
        <img src={FACES[face]} alt="" className="companion__face" draggable={false} />
      </div>
      <div className="companion__bubble">{line}</div>
    </div>
  );
}
