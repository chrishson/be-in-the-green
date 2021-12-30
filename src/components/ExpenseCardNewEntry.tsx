import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Expense} from "../App";
import { useInsertEntry } from "../hooks/useInsertEntry";

interface Props {
    expense: Expense
    selectedCategory: string
    setIsNewEntryFormExpanded: Dispatch<SetStateAction<boolean>>
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const ExpenseCardNewEntry = ({expense, selectedCategory, setIsNewEntryFormExpanded, setSelectedCategory}: Props) => {

    const [note, setNote] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [category, setCategory] = useState<string>(selectedCategory)

    useEffect(() => { 
        setCategory(selectedCategory)
    }, [selectedCategory])

    const insertEntryCallback = () => {
        setIsNewEntryFormExpanded(false)
        setSelectedCategory("")
    }

    const insertEntry = useInsertEntry(insertEntryCallback);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        insertEntry({
            expense_id: expense.id,
            category: category,
            spend_amount: parseInt(amount),
            note: note
        })

    }

    return (
        <div>
            <h3>
                {
                    selectedCategory && `New Entry For: ${selectedCategory}`
                }
                {
                    !selectedCategory && `New Entry`
                }
            </h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    {!selectedCategory && <label>
                        <p>Category:</p>
                        <input type="text" value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }} />
                    </label>}
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