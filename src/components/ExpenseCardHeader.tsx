import {Entry} from "./ExpenseCard"
import {BottomSection, Header, ProgressBar, TopSection} from "./ExpenseCardHeader.styles";

interface Props {
    entriesData: Entry[],
    expenseData: {
        name: string;
        budget: number;
        entries: Entry[]
    }
}

export const ExpenseCardHeader = ({entriesData, expenseData}: Props) => {

    const totalSpentDollar = () => {
        return entriesData.reduce((aggregate: number, spendStreamItem: Entry) => {
            return aggregate + spendStreamItem.spend_amount;
        }, 0)
    }

    const totalSpentPercentage = () => {
        return (totalSpentDollar() / expenseData.budget) * 100;
    }

    const totalAvailableSpend = () => {
        return expenseData.budget - totalSpentDollar();
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
                <div> {`Spent $${totalSpentDollar()}`}</div>
            </BottomSection>
        </Header>
    )
}