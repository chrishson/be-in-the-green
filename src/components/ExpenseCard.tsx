import {useState} from "react";
import {Expense, Entry} from "../App"
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

export const ExpenseCard = (expense: Expense) => {
    const [expenseData] = useState<Expense>(expense)
    const [entriesData, setEntriesData] = useState<Entry[]>(expense.entries)
    const [chosenExpense, setChosenExpense] = useState<string>("")

    console.log(expenseData, )

    return (
        <div>
            <ExpenseCardHeader {...expenseData}/>
            <main>
                <ExpenseCardSummary {...{entriesData, setChosenExpense}}/>
                <ExpenseCardNewEntry {...{setEntriesData, entriesData, chosenExpense}}/>
            </main>
        </div>
    )
}