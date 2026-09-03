import TransactionListItem from './TransactionListItem';

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty-state">no transactions match these filters yet.</p>;
  }

  return (
    <div className="tx-list">
      {transactions.map((t) => (
        <TransactionListItem key={t.id} transaction={t} />
      ))}
    </div>
  );
}
