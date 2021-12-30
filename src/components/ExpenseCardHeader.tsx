import {Entry, Expense} from "../App"
import { useDeleteAllEntriesByExpenseId } from "../hooks/useDeleteAllEntriesByExpenseId";
import {BottomSection, Header, ProgressBar, TopSection} from "./ExpenseCardHeader.styles";

export const ExpenseCardHeader = (expense: Expense) => {

    const deleteAllEntries = useDeleteAllEntriesByExpenseId();
    
    const totalSpentDollar = (entries: Entry[]) => {
        return entries.reduce((aggregate: number, entry: Entry) => {
            return aggregate + entry.spend_amount;
        }, 0)
    }

    const totalSpentPercentage = () => {
        return (totalSpentDollar(expense.entries) / expense.budget) * 100;
    }

    const totalAvailableSpend = () => {
        return expense.budget - totalSpentDollar(expense.entries);
    }

    const handleClick = () => {
        deleteAllEntries(expense.id)
    }

    return (
        <Header>
            <TopSection>
                <div>
                    <h2>{expense.name}</h2>
                </div>
                <div>
                    <p> {`$${totalAvailableSpend()} Left`}</p>
                </div>
            </TopSection>
            <BottomSection>
                <ProgressBar id="determinate"  value={totalSpentPercentage()} max="100"/>
                <div> {`Spent $${totalSpentDollar(expense.entries)}`}</div>
                <button onClick={handleClick}>
                    -- RESET
                </button>
            </BottomSection>
        </Header>
    )
}