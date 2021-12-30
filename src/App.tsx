import { useGetExpenses } from './hooks/useGetExpenses';
import './App.css';
import { ExpenseCard } from './components/ExpenseCard';

export interface Entry {
  id?: string
  category: string
  note: string
  spend_amount: number
  expense_id: string
  created_at?: string
}

export interface Expense {
  name: string
  id: string
  budget: number
  entries: Entry[]
}

function App() {

  const { isSuccess, data: expenses, isLoading, isError, error } = useGetExpenses()

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container">
      <main className="main">
          {
           isSuccess && expenses && <ExpenseCard {...expenses[0]}/>
          }
      </main>
    </div>
  );
}

export default App;
