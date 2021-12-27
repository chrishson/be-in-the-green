import {Entry, Expense} from "../App"
import {BottomSection, Header, ProgressBar, TopSection} from "./ExpenseCardHeader.styles";

export const ExpenseCardHeader = (expenseData: Expense) => {
    
    const totalSpentDollar = (entries: Entry[]) => {
        return entries.reduce((aggregate: number, entry: Entry) => {
            return aggregate + entry.spend_amount;
        }, 0)
    }

    const totalSpentPercentage = () => {
        return (totalSpentDollar(expenseData.entries) / expenseData.budget) * 100;
    }

    const totalAvailableSpend = () => {
        return expenseData.budget - totalSpentDollar(expenseData.entries);
    }

    return (
        <Header>
            <TopSection>
                <div>
                    <h2>{expenseData.name}</h2>
                </div>
                <div>
                    <p> {`$${totalAvailableSpend()} Left`}</p>
                </div>
            </TopSection>
            <BottomSection>
                <ProgressBar id="determinate"  value={totalSpentPercentage()} max="100"/>
                <div> {`Spent $${totalSpentDollar(expenseData.entries)}`}</div>
            </BottomSection>
        </Header>
    )
}