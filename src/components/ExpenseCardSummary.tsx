import {Dispatch, SetStateAction} from "react";
import {Entry} from "./ExpenseCard";
import {Breakdown, ExpenseEntry} from "./ExpenseCardSummary.styles";

interface Props {
    entriesData: Entry[],
    setChosenExpense: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({entriesData, setChosenExpense}: Props) => {

    const aggregatedSpendStreamMockData = () => {
        return entriesData.reduce((aggregate: { [key: string]: number }, spendStreamItem: Entry) => {

            aggregate[spendStreamItem.category] = aggregate[spendStreamItem.category] ?
                aggregate[spendStreamItem.category] + spendStreamItem.spend_amount :
                spendStreamItem.spend_amount;

            return aggregate;
        }, {})
    }

    return (
        <Breakdown>
            <h3> Breakdown </h3>
            {
                Object.entries(aggregatedSpendStreamMockData()).map((spendEntry: [string, number], index) => {
                    return <ExpenseEntry key={index}>
                        <div>
                            {spendEntry[0]}
                        </div>
                        <div>
                            ${spendEntry[1]}
                            <button onClick={() => {setChosenExpense(spendEntry[0])}}>
                                +
                            </button>
                        </div>
                    </ExpenseEntry>
                })
            }
        </Breakdown>
    )
}