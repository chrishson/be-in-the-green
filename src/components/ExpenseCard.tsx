import {useState} from "react";
import {Expense} from "../App"
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

export const ExpenseCard = (expense: Expense) => {
    const [chosenExpense, setChosenExpense] = useState<string>("")
    
    return (
        <div>
            <ExpenseCardHeader {...expense}/>
            <main>
                <ExpenseCardSummary {...{expense, setChosenExpense}}/>
                <ExpenseCardNewEntry {...{expense, chosenExpense}}/>
            </main>
        </div>
    )
}