import { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import smileLightFace from '../../assets/companion/smile-light.jpg';
import smileDarkFace from '../../assets/companion/smile-dark.jpg';
import { useTypewriter } from '../../hooks/useTypewriter';

// The happy face has real artwork for each theme (not a CSS color
// invert) — a calm, eyes-open look for light mode and a dim,
// eyes-closed look for dark mode. Both are framed identically, so no
// per-image scale correction is needed here.
const SMILE_FACE = { light: smileLightFace, dark: smileDarkFace };

const EMPTY_LINES = ["No transactions yet. I'm bored, log something na."];
const LOW_BALANCE_LINES = ['Broke ka na naman, boi! Ang yabang mo pa!', 'Konti na lang imong kwarta. Chill on the spending.'];
const BIG_EXPENSE_LINES = ['Ang laki naman ng gastos mo... you sure about that?'];
const HEALTHY_LINES = ['Your balance looks fine, keep it up!', 'You still have money? Impressive talaga.'];

function pickLine({ balance, hasTransactions, latestExpense }) {
  if (!hasTransactions) return EMPTY_LINES[0];
  if (balance < 0) return LOW_BALANCE_LINES[0];
  if (latestExpense && latestExpense.amount >= 1000) return BIG_EXPENSE_LINES[0];
  if (balance < 500) return LOW_BALANCE_LINES[1];
  return HEALTHY_LINES[Math.floor(balance) % HEALTHY_LINES.length];
}

export default function CompanionDialogueBox({ balance, hasTransactions, latestExpense }) {
  const { theme } = useTheme();
  const line = useMemo(
    () => pickLine({ balance, hasTransactions, latestExpense }),
    [balance, hasTransactions, latestExpense],
  );

  const { displayedText } = useTypewriter(line);
  // Locked to the happy sprite for now — talking/sad art will come back
  // once the full expression set has light/dark pairs like this one does.

  return (
    <div className="companion">
      <div className="companion__avatar">
        <img src={SMILE_FACE[theme]} alt="" className="companion__face" draggable={false} />
      </div>
      <div className="companion__bubble">{displayedText}</div>
    </div>
  );
}
