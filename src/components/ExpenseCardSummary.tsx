import {Dispatch, SetStateAction} from "react";
import {Entry, Expense} from "../App";
import { useDeleteEntry } from "../hooks/useDeleteEntry";
import {Breakdown, ExpenseEntry, ExpenseEntryHistory} from "./ExpenseCardSummary.styles";

interface Props {
    expense: Expense,
    setSelectedCategory: Dispatch<SetStateAction<string>>
    setIsNewEntryFormExpanded: Dispatch<SetStateAction<boolean>>
}

export const ExpenseCardSummary = ({expense, setSelectedCategory, setIsNewEntryFormExpanded}: Props) => {
    const deleteEntry = useDeleteEntry();

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

    const deleteEntryHistoryItem = (id: string) => {
        deleteEntry(id)
    }

    const handleClick = (categoryName: string) => {
        setSelectedCategory(categoryName)
        setIsNewEntryFormExpanded(true)
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
                                <button onClick={() => {handleClick(categoryName)}}>
                                    +
                                </button>
                            </div>
                        </ExpenseEntry> 
                        {
                            historyObject.entries.map((entryHistoryItem: Entry, index: number) => {
                                return <ExpenseEntryHistory key={index}> 
                                    <div>
                                        {entryHistoryItem.note}
                                        <button onClick={() => {deleteEntryHistoryItem(entryHistoryItem.id!)}}>
                                            -- Delete
                                        </button>
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