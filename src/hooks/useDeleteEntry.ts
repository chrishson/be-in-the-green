import { useMutation, useQueryClient } from "react-query";
import { FetchUtil } from "../util/FetchUtil";

export const useDeleteEntry = () => {

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (id: string) =>
      FetchUtil({
          query: `
          mutation delete_an_object($id: uuid!) {
            delete_entries_by_pk(id: $id) {
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
            id
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
