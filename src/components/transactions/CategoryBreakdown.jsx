import { formatCurrency } from '../../utils/format';

export default function CategoryBreakdown({ totals, grandTotal }) {
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return <p className="empty-state">log an expense to see the breakdown.</p>;
  }

  return (
    <div className="breakdown">
      {entries.map(([category, amount]) => {
        const pct = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
        return (
          <div className="breakdown__row" key={category}>
            <div className="breakdown__labels">
              <span>{category}</span>
              <span>
                {formatCurrency(amount)} · {pct}%
              </span>
            </div>
            <div className="breakdown__bar">
              <div className="breakdown__bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
