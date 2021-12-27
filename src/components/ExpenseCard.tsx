import {useState} from "react";
import {Expense, Entry} from "../App"
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

interface Props {
    expense: Expense
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