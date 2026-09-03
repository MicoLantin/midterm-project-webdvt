import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionsProvider } from './context/TransactionsContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionDetail from './pages/TransactionDetail';
import Summary from './pages/Summary';

export default function App() {
  return (
    <ThemeProvider>
      <TransactionsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/transaction/:id" element={<TransactionDetail />} />
              <Route path="/summary" element={<Summary />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TransactionsProvider>
    </ThemeProvider>
  );
}
