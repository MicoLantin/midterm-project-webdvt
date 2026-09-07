import { useMemo, useState } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import Splash from '../components/ui/Splash';
import CompanionDialogueBox from '../components/ui/CompanionDialogueBox';
import ThemeToggleButton from '../components/ui/ThemeToggleButton';
import Panel from '../components/ui/Panel';
import BalanceCard from '../components/transactions/BalanceCard';
import BudgetTracker from '../components/transactions/BudgetTracker';
import FilterBar from '../components/transactions/FilterBar';
import TransactionList from '../components/transactions/TransactionList';

export default function Dashboard() {
  const [entered, setEntered] = useState(() => sessionStorage.getItem('clarity:entered') === 'true');
  const { transactions, balance } = useTransactions();
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (type !== 'all' && t.type !== type) return false;
      if (category !== 'all' && t.category !== category) return false;
      return true;
    });
  }, [transactions, category, type]);

  const latestExpense = useMemo(() => transactions.find((t) => t.type === 'expense'), [transactions]);

  function handleEnter() {
    sessionStorage.setItem('clarity:entered', 'true');
    setEntered(true);
  }

  if (!entered) {
    return <Splash onEnter={handleEnter} />;
  }

  return (
    <div className="page-dashboard">
      <div className="page-dashboard__head">
        <CompanionDialogueBox balance={balance} hasTransactions={transactions.length > 0} latestExpense={latestExpense} />
        <ThemeToggleButton />
      </div>

      <BalanceCard balance={balance} />

      <Panel>
        <h2>budget</h2>
        <BudgetTracker />
      </Panel>

      <Panel className="dashboard-list">
        <div className="dashboard-list__head">
          <h2>transactions</h2>
          <FilterBar category={category} type={type} onCategoryChange={setCategory} onTypeChange={setType} />
        </div>
        <TransactionList transactions={filtered} />
      </Panel>
    </div>
  );
}
