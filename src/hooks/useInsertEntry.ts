import { useMutation, useQueryClient } from "react-query";
import { Entry } from "../App";
import { FetchUtil } from "../util/FetchUtil";

export const useInsertEntry = (collapseNewEntryForm: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
      ({category, expense_id, note, spend_amount}: Entry) =>
        FetchUtil({
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
        })
          .then((res) => res.json())
          .then((res) => res.data), {
              onSuccess: () => {
                collapseNewEntryForm();
                queryClient.invalidateQueries('expenses', {
                  refetchActive: true,
                  refetchInactive: false
                })
              },
          }
    );

    return mutate;
}
