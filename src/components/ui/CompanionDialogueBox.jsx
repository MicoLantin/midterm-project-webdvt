import { useMemo } from 'react';

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

  return (
    <div className="companion">
      <div className="companion__avatar" aria-hidden="true">
        :0
      </div>
      <div className="companion__bubble">{line}</div>
    </div>
  );
}
