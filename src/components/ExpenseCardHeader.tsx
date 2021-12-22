import React from "react";
import {spendStreamItem} from "./ExpenseCard"
import {BottomSection, Header, ProgressBar, TopSection} from "./ExpenseCardHeader.styles";

interface Props {
    spendStreamData: spendStreamItem[],
    expenseData: {
        name: string;
        budget: number;
    }
}

export const ExpenseCardHeader = ({spendStreamData, expenseData}: Props) => {

    const totalSpentDollar = () => {
        return spendStreamData.reduce((aggregate: number, spendStreamItem: spendStreamItem) => {
            return aggregate + spendStreamItem.spendAmount;
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