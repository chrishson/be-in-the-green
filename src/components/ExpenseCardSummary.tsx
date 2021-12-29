import {Dispatch, SetStateAction} from "react";
import { useMutation, useQueryClient } from "react-query";
import {Entry, Expense} from "../App";
import {Breakdown, ExpenseEntry, ExpenseEntryHistory} from "./ExpenseCardSummary.styles";

interface Props {
    expense: Expense,
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({expense, setSelectedCategory}: Props) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        (id: string) =>
          fetch(process.env.REACT_APP_HASURA_API as string, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': process.env.REACT_APP_HASURA_API_SECRET as string
            },
            body: JSON.stringify({
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
            }),
          })
            .then((res) => res.json())
            .then((res) => res.data), {
                onSuccess: ({delete_entries_by_pk}) => {
                    queryClient.setQueryData("expenses", [delete_entries_by_pk.expense])
                  },
            }
      );

    const aggregatedSpendStreamMockData = () => {
        return Object.values(expense.entries).reduce((aggregate: { [key: string]: any }, entry: Entry) => {
            aggregate[entry.category] = aggregate[entry.category] ?
                {
                    total_spend_amount: aggregate[entry.category].total_spend_amount + entry.spend_amount,
                    entries: [...aggregate[entry.category].entries, entry]
                } :
                {
                    total_spend_amount: entry.spend_amount,
                    entries: [entry]
                }

            return aggregate;
        }, {})
    }

    const deleteEntryHistoryItem = (id: string) => {
        mutate(id)
    }

    return (
        <Breakdown>
            <h3> Breakdown </h3>
            {
                Object.entries(aggregatedSpendStreamMockData()).map(([categoryName, historyObject]: [string, {total_spend_amount: string, entries: Entry[]}], index) => {
                    return <div key={index}>
                        <ExpenseEntry>
                            <div>
                                {categoryName}
                            </div>
                            <div>
                                ${historyObject.total_spend_amount}
                                <button onClick={() => {setSelectedCategory(categoryName)}}>
                                    +
                                </button>
                            </div>
                        </ExpenseEntry> 
                        {
                            historyObject.entries.map((entryHistoryItem: Entry, index: number) => {
                                return <ExpenseEntryHistory key={index}> 
                                    <div>
                                        {entryHistoryItem.note}
                                        <button onClick={() => {deleteEntryHistoryItem(entryHistoryItem.id!)}}>
                                            -- Delete
                                        </button>
                                    </div>
                                    <div>
                                        {entryHistoryItem.spend_amount}
                                    </div>
                                </ExpenseEntryHistory>
                            })
                        }
                    </div>
                })
            }
        </Breakdown>
    )
}