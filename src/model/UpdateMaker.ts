import { UpdateInfo } from 'type/UpdateInfo'
import { WhereClauseElements } from 'type/WhereClauseElements'
import { WhereClauseMaker } from 'model/WhereClauseMaker'
export class UpdateMaker {
    private headSQL: string
    private updateInfo: UpdateInfo
    private whereClauseElements: WhereClauseElements
    constructor(updateInfo: UpdateInfo) {
        this.headSQL = 'UPDATE'
        this.updateInfo = updateInfo
        this.whereClauseElements = updateInfo.whereClauseElements
    }
    createWhereClase = (): string => {
        const whereClauseMaker = new WhereClauseMaker(this.whereClauseElements)
        return whereClauseMaker.createWhereClause()
    }
    private createkeyValues = (): string => {
        const keyValues = this.updateInfo.updateKeys.map((key, i) => {
            return `${key} = '${this.updateInfo.updateValues[i]}'`
        })
        return keyValues.join(',')
    }
    outputSQL = () => {
        return `${this.headSQL} ${this.updateInfo.tableName} SET ${this.createkeyValues()} ${this.createWhereClase()}`
    }
}
