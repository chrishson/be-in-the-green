import React, {Dispatch, SetStateAction, useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import {Entry, Expense} from "../App";

interface Props {
    setEntriesData?: Dispatch<SetStateAction<Entry[]>>,
    expense: Expense,
    selectedCategory: string
}


export const ExpenseCardNewEntry = ({expense, selectedCategory}: Props) => {

    const [note, setNote] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({
            expense_id: expense.id,
            category: selectedCategory,
            spend_amount: parseInt(amount),
            note: note
        })
    }

    return (
        <div>
            <h3>{`New Entry For: ${selectedCategory}`}</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Note:</p>
                        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                    </label>
                    <label>
                        <p>Amount:</p>
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}