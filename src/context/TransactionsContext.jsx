import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TransactionsContext = createContext(null);

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('clarity:transactions', []);

  const addTransaction = useCallback(
    (data) => {
      const record = { id: makeId(), ...data };
      setTransactions((prev) => [record, ...prev]);
      return record;
    },
    [setTransactions],
  );

  const updateTransaction = useCallback(
    (id, updates) => {
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    },
    [setTransactions],
  );

  const deleteTransaction = useCallback(
    (id) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [setTransactions],
  );

  const getTransactionById = useCallback((id) => transactions.find((t) => t.id === id), [transactions]);

  const balance = useMemo(
    () => transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0),
    [transactions],
  );

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionById,
      balance,
    }),
    [transactions, addTransaction, updateTransaction, deleteTransaction, getTransactionById, balance],
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions must be used within a TransactionsProvider');
  return ctx;
}
