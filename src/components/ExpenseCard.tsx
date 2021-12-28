import {useState} from "react";
import {Expense} from "../App"
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

export const ExpenseCard = (expense: Expense) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    
    return (
        <div>
            <ExpenseCardHeader {...expense}/>
            <main>
                <ExpenseCardSummary {...{expense, setSelectedCategory}}/>
                {
                    selectedCategory && <ExpenseCardNewEntry {...{expense, selectedCategory}}/>
                }
            </main>
        </div>
    )
}