import { useQuery } from 'react-query';
import './App.css';
import { ExpenseCard } from './components/ExpenseCard';

function App() {

  const { isSuccess, data } = useQuery("data", () =>
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
        return res.data
      })
  );

  return (
    <div className="container">
      <main className="main">
          {
           isSuccess && <ExpenseCard expense={data.expenses[0]}/>
          }
      </main>
    </div>
  );
}

export default App;
