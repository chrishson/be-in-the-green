import {Dispatch, SetStateAction} from "react";
import {Entry, Expense} from "../App";
import {Breakdown, ExpenseEntry} from "./ExpenseCardSummary.styles";

interface Props {
    expense: Expense,
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({expense, setSelectedCategory}: Props) => {

    const aggregatedSpendStreamMockData = () => {
        return expense.entries.reduce((aggregate: { [key: string]: number }, entry: Entry) => {

            aggregate[entry.category] = aggregate[entry.category] ?
                aggregate[entry.category] + entry.spend_amount :
                entry.spend_amount;

            return aggregate;
        }, {})
    }

    return (
        <Breakdown>
            <h3> Breakdown </h3>
            {
                Object.entries(aggregatedSpendStreamMockData()).map((entry: [string, number], index) => {
                    return <ExpenseEntry key={index}>
                        <div>
                            {entry[0]}
                        </div>
                        <div>
                            ${entry[1]}
                            <button onClick={() => {setSelectedCategory(entry[0])}}>
                                +
                            </button>
                        </div>
                    </ExpenseEntry>
                })
            }
        </Breakdown>
    )
}