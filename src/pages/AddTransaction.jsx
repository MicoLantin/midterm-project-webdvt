import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionsContext';
import TransactionForm from '../components/transactions/TransactionForm';
import Panel from '../components/ui/Panel';

export default function AddTransaction() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  function handleSubmit(values) {
    addTransaction(values);
    navigate('/');
  }

  return (
    <div className="page-form">
      <h1>add transaction</h1>
      <Panel>
        <TransactionForm submitLabel="save transaction" onSubmit={handleSubmit} />
      </Panel>
    </div>
  );
}
