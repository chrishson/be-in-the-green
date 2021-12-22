import {useState} from "react";
import {ExpenseCardHeader} from "./ExpenseCardHeader";
import {ExpenseCardSummary} from "./ExpenseCardSummary";
import {ExpenseCardNewEntry} from "./ExpenseCardNewEntry";

interface Expense {
    name: string,
    id: number,
    budget: number
}

export interface spendStreamItem {
    expenseId: number,
    name: string,
    spendAmount: number,
    note: string
}

const expenseMockData = {
    id: 1,
    name: 'Couples Budget',
    budget: 1000
};

const spendStreamMockData = [
    {
        expenseId: 1,
        name: 'Food',
        spendAmount: 50,
        note: 'Bought Taco Bell'
    },
    {
        expenseId: 1,
        name: 'Food',
        spendAmount: 50,
        note: 'Samsoonie'
    },
    {
        expenseId: 1,
        name: 'Entertainment',
        spendAmount: 20,
        note: 'badminton'
    }
]

export const ExpenseCard = () => {
    const [expenseData] = useState<Expense>(expenseMockData)
    const [spendStreamData, setSpendStreamData] = useState<spendStreamItem[]>(spendStreamMockData)
    const [chosenExpense, setChosenExpense] = useState<string>("")

    return (
        <div>
            <ExpenseCardHeader {...{expenseData, spendStreamData}}/>
            <main>
                <ExpenseCardSummary {...{spendStreamData, setChosenExpense}}/>
                <ExpenseCardNewEntry {...{setSpendStreamData, spendStreamData, chosenExpense}}/>
            </main>
        </div>
    )
}