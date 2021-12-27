import {useState} from "react";
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

interface Props {
    expense: Expense
}

interface Expense {
    name: string,
    id: string,
    budget: number
    entries: Entry[]
}

export interface Entry {
    id: string,
    category: string,
    note: string,
    spend_amount: number
}

export const ExpenseCard = (props: Props) => {
    const [expenseData] = useState<Expense>(props.expense)
    const [entriesData, setEntriesData] = useState<Entry[]>(props.expense.entries)
    const [chosenExpense, setChosenExpense] = useState<string>("")

    return (
        <div>
            <ExpenseCardHeader {...{expenseData, entriesData}}/>
            <main>
                <ExpenseCardSummary {...{entriesData, setChosenExpense}}/>
                <ExpenseCardNewEntry {...{setEntriesData, entriesData, chosenExpense}}/>
            </main>
        </div>
    )
}