import { useQuery } from "react-query";
import { Expense } from "../App";

export const useGetExpenses = () => {
    const EXPENSES_KEY = "expenses";

    return useQuery<Expense[], Error>(EXPENSES_KEY, () =>
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
}