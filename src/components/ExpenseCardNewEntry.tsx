import React, {Dispatch, SetStateAction, useState} from "react";
import {Entry, Expense} from "../App";
import { useInsertEntry } from "../hooks/useInsertEntry";

interface Props {
    setEntriesData?: Dispatch<SetStateAction<Entry[]>>,
    expense: Expense,
    selectedCategory: string
}


export const ExpenseCardNewEntry = ({expense, selectedCategory}: Props) => {

    const [note, setNote] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const insertEntry = useInsertEntry();



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        insertEntry({
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