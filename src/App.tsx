import { useQuery } from 'react-query';
import './App.css';
import { ExpenseCard } from './components/ExpenseCard';

export interface Entry {
  id: string,
  category: string,
  note: string,
  spend_amount: number
}

export interface Expense {
  name: string,
  id: string,
  budget: number
  entries: Entry[]
}

function App() {

  const EXPENSES_KEY = "expenses";

  const { isSuccess, data: expenses, isError, error } = useQuery<Expense[], Error>(EXPENSES_KEY, () =>
    fetch(process.env.REACT_APP_HASURA_API as string, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_API_SECRET as string
      },
      body: JSON.stringify({
        query: `
          {
            expenses {
              id
              name
              budget
              entries {
                id
                category
                note
                spend_amount
              }
            }
          }
        `,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      return res.data.expenses
    })
  );

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div className="container">
      <main className="main">
          {
           isSuccess && expenses && <ExpenseCard expense={expenses[0]}/>
          }
      </main>
    </div>
  );
}

export default App;
