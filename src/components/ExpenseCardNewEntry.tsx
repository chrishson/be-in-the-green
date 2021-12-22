import React, {Dispatch, SetStateAction, useState} from "react";
import {spendStreamItem} from "./ExpenseCard";

interface Props {
    setSpendStreamData: Dispatch<SetStateAction<spendStreamItem[]>>,
    spendStreamData: spendStreamItem[],
    chosenExpense: string
}

export const ExpenseCardNewEntry = ({spendStreamData, setSpendStreamData, chosenExpense}: Props) => {

    const [note, setNote] = useState<string>("")
    const [amount, setAmount] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSpendStreamData([...spendStreamData, {
            expenseId: 1,
            name: chosenExpense,
            spendAmount: parseInt(amount),
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