import { formatCurrency } from '../../utils/format';

export default function BalanceCard({ balance }) {
  return (
    <div className="balance-card panel">
      <span className="balance-card__label">current balance</span>
      <span className="balance-card__amount">{formatCurrency(balance)}</span>
    </div>
  );
}
