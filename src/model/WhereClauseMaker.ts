import { WhereClauseElements } from 'type/WhereClauseElements'

export class WhereClauseMaker {
    private headSQL: string
    private whereClauseElements: WhereClauseElements
    constructor(whereClauseElements: WhereClauseElements) {
        this.headSQL = 'WHERE'
        this.whereClauseElements = whereClauseElements
    }
    createWhereClause = (): string => {
        const keyValues = this.whereClauseElements.whereKeys.map((key, i) => {
            return `${key} = '${this.whereClauseElements.whereValues[i]}'${this.ajustWhereOperate(i)}`
        })
        return this.headSQL + ' ' + keyValues.join('')
    }
    private ajustWhereOperate = (index: number): string => {
        if (index > this.whereClauseElements.whereOperators.length - 1) {
            return ''
        }
        return ' ' + this.whereClauseElements.whereOperators[index] + ' '
    }
}
