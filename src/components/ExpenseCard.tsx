import {useState} from "react";
import {Expense} from "../App"
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

export const ExpenseCard = (expense: Expense) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [isNewEntryFormExpanded, setIsNewEntryFormExpanded] = useState<boolean>(false)

    const handleNewEntryFormClick = () => {
        if (selectedCategory) {
            setSelectedCategory("")
            return;
        }
        setIsNewEntryFormExpanded(!isNewEntryFormExpanded)
    }
    
    return (
        <div>
            <ExpenseCardHeader {...expense}/>
            <main>
                <ExpenseCardSummary {...{expense, setSelectedCategory, setIsNewEntryFormExpanded}}/>
                {
                    (isNewEntryFormExpanded) && <ExpenseCardNewEntry {...{expense, selectedCategory, setIsNewEntryFormExpanded}}/>
                }
                <button onClick={handleNewEntryFormClick}>
                    Add New Category + Entry
                </button>
            </main>
        </div>
    )
}