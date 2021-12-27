import {Dispatch, SetStateAction} from "react";
import {Entry} from "../App";
import {Breakdown, ExpenseEntry} from "./ExpenseCardSummary.styles";

interface Props {
    entriesData: Entry[],
    setChosenExpense: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({entriesData, setChosenExpense}: Props) => {

    const aggregatedSpendStreamMockData = () => {
        return entriesData.reduce((aggregate: { [key: string]: number }, entry: Entry) => {

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
                            <button onClick={() => {setChosenExpense(entry[0])}}>
                                +
                            </button>
                        </div>
                    </ExpenseEntry>
                })
            }
        </Breakdown>
    )
}