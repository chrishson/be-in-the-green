import { useMutation, useQueryClient } from "react-query";
import { Entry } from "../App";

export const useInsertEntry = () => {

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
      ({category, expense_id, note, spend_amount}: Entry) =>
        fetch(process.env.REACT_APP_HASURA_API as string, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'x-hasura-admin-secret': process.env.REACT_APP_HASURA_API_SECRET as string
          },
          body: JSON.stringify({
            query: `
            mutation insert_entries_one($category: String!, $expense_id: uuid!, $note: String!, $spend_amount: Int!) {
              insert_entries_one(object: {category: $category, expense_id: $expense_id, note: $note, spend_amount: $spend_amount }) {
                  expense {
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
            }
          `,
            variables: {
              category, 
              expense_id, 
              note, 
              spend_amount
            },
          }),
        })
          .then((res) => res.json())
          .then((res) => res.data), {
              onSuccess: ({insert_entries_one}) => {
                  queryClient.setQueryData("expenses", [insert_entries_one.expense])
                },
          }
    );

    return mutate;
}
