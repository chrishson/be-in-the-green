import React, {Dispatch, SetStateAction, useState} from "react";
import {Entry} from "./ExpenseCard";

interface Props {
    setEntriesData: Dispatch<SetStateAction<Entry[]>>,
    entriesData: Entry[],
    chosenExpense: string
}

export const ExpenseCardNewEntry = ({entriesData, setEntriesData, chosenExpense}: Props) => {

    const [note, setNote] = useState<string>("")
    const [amount, setAmount] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setEntriesData([...entriesData, {
            id: "test-guid",
            category: chosenExpense,
            spend_amount: parseInt(amount),
            note: note
        }])
    }

    return (
        <div>
            <h3>{`New Entry For: ${chosenExpense}`}</h3>
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