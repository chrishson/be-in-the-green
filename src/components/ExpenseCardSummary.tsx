import {Dispatch, SetStateAction} from "react";
import {Entry, Expense} from "../App";
import {Breakdown, ExpenseEntry, ExpenseEntryHistory} from "./ExpenseCardSummary.styles";

interface Props {
    expense: Expense,
    setSelectedCategory: Dispatch<SetStateAction<string>>
}

export const ExpenseCardSummary = ({expense, setSelectedCategory}: Props) => {

    const aggregatedSpendStreamMockData = () => {
        return Object.values(expense.entries).reduce((aggregate: { [key: string]: any }, entry: Entry) => {
            aggregate[entry.category] = aggregate[entry.category] ?
                {
                    total_spend_amount: aggregate[entry.category].total_spend_amount + entry.spend_amount,
                    entries: [...aggregate[entry.category].entries, entry]
                } :
                {
                    total_spend_amount: entry.spend_amount,
                    entries: [entry]
                }

            return aggregate;
        }, {})
    }

    return (
        <Breakdown>
            <h3> Breakdown </h3>
            {
                Object.entries(aggregatedSpendStreamMockData()).map(([categoryName, historyObject]: [string, {total_spend_amount: string, entries: Entry[]}], index) => {
                    return <div key={index}>
                        <ExpenseEntry>
                            <div>
                                {categoryName}
                            </div>
                            <div>
                                ${historyObject.total_spend_amount}
                                <button onClick={() => {setSelectedCategory(categoryName)}}>
                                    +
                                </button>
                            </div>
                        </ExpenseEntry> 
                        {
                            historyObject.entries.map((entryHistoryItem: Entry, index: number) => {
                                return <ExpenseEntryHistory key={index}> 
                                    <div>
                                        {entryHistoryItem.note}
                                    </div>
                                    <div>
                                        {entryHistoryItem.spend_amount}
                                    </div>
                                </ExpenseEntryHistory>
                            })
                        }
                    </div>
                })
            }
        </Breakdown>
    )
}