import { useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTransactions } from '../../context/TransactionsContext';
import { PERIODS, isInCurrentPeriod } from '../../utils/period';
import { formatCurrency } from '../../utils/format';

const NO_BUDGETS_SET = { daily: null, weekly: null, monthly: null };

export default function BudgetTracker() {
  const { transactions } = useTransactions();
  const [budgets, setBudgets] = useLocalStorage('clarity:budgets', NO_BUDGETS_SET);
  const [period, setPeriod] = useState('monthly');

  const spent = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense' && isInCurrentPeriod(t.date, period))
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions, period],
  );

  const budget = budgets[period];
  const hasBudget = budget !== null && budget > 0;
  const remaining = hasBudget ? budget - spent : 0;
  const isOverBudget = hasBudget && spent > budget;
  const percentSpent = hasBudget ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

  function handleBudgetChange(rawValue) {
    const amount = rawValue === '' ? null : Number(rawValue);
    setBudgets((prev) => ({ ...prev, [period]: amount }));
  }

  return (
    <div className="budget-tracker">
      <div className="budget-tracker__tabs">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            className={`budget-tracker__tab${p === period ? ' is-active' : ''}`}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <label className="field budget-tracker__input">
        <span>{period} budget (₱)</span>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="not set"
          value={budget ?? ''}
          onChange={(e) => handleBudgetChange(e.target.value)}
        />
      </label>

      {hasBudget && (
        <div className="budget-tracker__summary">
          <div className="breakdown__labels">
            <span>{formatCurrency(spent)} spent</span>
            <span>{isOverBudget ? `over by ${formatCurrency(Math.abs(remaining))}` : `${formatCurrency(remaining)} left`}</span>
          </div>
          <div className={`breakdown__bar${isOverBudget ? ' breakdown__bar--over' : ''}`}>
            <div className="breakdown__bar-fill" style={{ width: `${percentSpent}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
