import {Dispatch, SetStateAction} from "react";
import {spendStreamItem} from "./ExpenseCard";
import {Breakdown, ExpenseEntry} from "./ExpenseCardSummary.styles";

interface Props {
    spendStreamData: spendStreamItem[],
    setChosenExpense: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({spendStreamData, setChosenExpense}: Props) => {

    const aggregatedSpendStreamMockData = () => {
        return spendStreamData.reduce((aggregate: { [key: string]: number }, spendStreamItem: spendStreamItem) => {

            aggregate[spendStreamItem.name] = aggregate[spendStreamItem.name] ?
                aggregate[spendStreamItem.name] + spendStreamItem.spendAmount :
                spendStreamItem.spendAmount;

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