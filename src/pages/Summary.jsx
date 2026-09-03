import { useMemo } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import CategoryBreakdown from '../components/transactions/CategoryBreakdown';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import Panel from '../components/ui/Panel';
import { formatCurrency } from '../utils/format';

export default function Summary() {
  const { transactions } = useTransactions();

  const { totals, grandTotal, totalIncome, totalExpense } = useMemo(() => {
    const byCategory = {};
    let income = 0;
    let expense = 0;

    for (const tx of transactions) {
      if (tx.type === 'expense') {
        byCategory[tx.category] = (byCategory[tx.category] ?? 0) + tx.amount;
        expense += tx.amount;
      } else {
        income += tx.amount;
      }
    }

    const total = Object.values(byCategory).reduce((sum, v) => sum + v, 0);
    return { totals: byCategory, grandTotal: total, totalIncome: income, totalExpense: expense };
  }, [transactions]);

  return (
    <div className="page-summary">
      <div className="page-summary__head">
        <h1>summary</h1>
        <ThemeToggleButton />
      </div>

      <div className="summary-totals">
        <Panel className="summary-totals__item">
          <span>total income</span>
          <strong>{formatCurrency(totalIncome)}</strong>
        </Panel>
        <Panel className="summary-totals__item">
          <span>total expenses</span>
          <strong>{formatCurrency(totalExpense)}</strong>
        </Panel>
      </div>

      <Panel>
        <h2>spending by category</h2>
        <CategoryBreakdown totals={totals} grandTotal={grandTotal} />
      </Panel>
    </div>
  );
}
