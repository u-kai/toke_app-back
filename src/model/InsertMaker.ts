import { InsertInfo } from 'types/DB-types/InsertInfo'
import { WhereClauseMaker } from 'model/WhereClauseMaker'

export class InsertMaker {
    private headSQL: string
    private insertInfo: InsertInfo
    constructor(insertInfo: InsertInfo) {
        this.headSQL = 'INSERT INTO'
        this.insertInfo = insertInfo
    }
    private createWhereClause = (): string => {
        const whereClauseMaker = new WhereClauseMaker(this.insertInfo.whereClauseElements)
        return whereClauseMaker.createWhereClause()
    }
    private createKeyValuses = (): string => {
        const keys = `(${this.insertInfo.insertKeys.join(',')})`
        const values = `VALUES(${this.addSingleQuoteForValues()})`
        return `${keys} ${values}`
    }
    private addSingleQuoteForValues = (): string => {
        const addSingleQuoteValues = this.insertInfo.insertValues.map((value) => {
            return "'" + value + "'"
        })
        return addSingleQuoteValues.join(',')
    }
    outputSQL = () => {
        return `${this.headSQL} ${this.insertInfo.tableName} ${this.createKeyValuses()} ${this.createWhereClause()}`
    }
}
