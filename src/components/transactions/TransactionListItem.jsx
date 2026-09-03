import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/format';

// Memoized so an unrelated re-render of the transaction list (e.g. from a
// filter change elsewhere, or a theme toggle) doesn't re-render every row —
// only rows whose own `transaction` prop actually changed re-render.
function TransactionListItem({ transaction }) {
  const { id, description, category, amount, type, date } = transaction;

  return (
    <Link to={`/transaction/${id}`} className="tx-row">
      <div className="tx-row__main">
        <span className="tx-row__desc">{description}</span>
        <span className="tx-row__meta">
          {category} · {formatDate(date)}
        </span>
      </div>
      <span className={`tx-row__amount tx-row__amount--${type}`}>
        {type === 'income' ? '+' : '−'} {formatCurrency(amount, { signless: true })}
      </span>
    </Link>
  );
}

export default memo(TransactionListItem);
