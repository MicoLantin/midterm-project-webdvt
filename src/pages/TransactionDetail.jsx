import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../context/TransactionsContext';
import TransactionForm from '../components/transactions/TransactionForm';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Panel from '../components/ui/Panel';
import { formatCurrency, formatDate } from '../utils/format';

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransactionById, updateTransaction, deleteTransaction } = useTransactions();
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const transaction = getTransactionById(id);

  if (!transaction) {
    return (
      <div className="page-detail">
        <h1>transaction not found</h1>
        <p>this transaction doesn't exist — maybe it was already deleted.</p>
        <Link to="/" className="btn btn--primary">
          back to dashboard
        </Link>
      </div>
    );
  }

  function handleUpdate(values) {
    updateTransaction(id, values);
    setEditing(false);
  }

  function handleDelete() {
    deleteTransaction(id);
    navigate('/');
  }

  return (
    <div className="page-detail">
      <h1>transaction detail</h1>
      <Panel>
        {editing ? (
          <TransactionForm initialValues={transaction} submitLabel="save changes" onSubmit={handleUpdate} />
        ) : (
          <div className="detail-view">
            <div className="detail-view__row">
              <span>description</span>
              <span>{transaction.description}</span>
            </div>
            <div className="detail-view__row">
              <span>type</span>
              <span>{transaction.type}</span>
            </div>
            <div className="detail-view__row">
              <span>amount</span>
              <span>{formatCurrency(transaction.amount)}</span>
            </div>
            <div className="detail-view__row">
              <span>category</span>
              <span>{transaction.category}</span>
            </div>
            <div className="detail-view__row">
              <span>date</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
            <div className="detail-view__actions">
              <button type="button" className="btn" onClick={() => setEditing(true)}>
                edit
              </button>
              <button type="button" className="btn btn--danger" onClick={() => setConfirmOpen(true)}>
                delete
              </button>
            </div>
          </div>
        )}
      </Panel>

      <ConfirmDialog
        open={confirmOpen}
        title="delete this transaction?"
        message="this can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
