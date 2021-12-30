import { useQuery } from "react-query";
import { Expense } from "../App";
import { FetchUtil } from "../util/FetchUtil";

export const useGetExpenses = () => {
    const EXPENSES_KEY = "expenses";

    return useQuery<Expense[], Error>(EXPENSES_KEY, () =>
      FetchUtil({
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
                  created_at
                }
              }
            }
          `,
        })
      .then((res) => res.json())
      .then((res) => {
        return res.data.expenses
      })
    );
}