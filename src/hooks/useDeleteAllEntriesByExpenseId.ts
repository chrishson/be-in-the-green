import { useMutation, useQueryClient } from "react-query";
import { FetchUtil } from "../util/FetchUtil";

export const useDeleteAllEntriesByExpenseId = () => {

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (expense_id: string) =>
      FetchUtil({
          query: `
          mutation delete_entries_by_expense_id($expense_id: uuid!) {
            delete_entries(where: {expense_id: {_eq: $expense_id}}) {
                affected_rows
                returning {
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
          }
        `,
          variables: {
            expense_id
          },
        })
        .then((res) => res.json())
        .then((res) => res.data), {
            onSuccess: () => {
                queryClient.invalidateQueries('expenses', {
                  refetchActive: true,
                  refetchInactive: false
                })
              },
        }
  );

    return mutate;
}
