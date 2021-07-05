import { InsertInfo } from '~/types/DB-types/InsertInfo'
import { WhereClauseMaker } from '~/model/SQL/WhereClauseMaker'

export class InsertMaker {
    private headSQL: string
    private insertInfo: InsertInfo
    constructor(insertInfo: InsertInfo) {
        this.headSQL = 'INSERT INTO'
        this.insertInfo = insertInfo
    }
    createKeyValuses = (sqlStatementIndex?: number): string => {
        const keys = `(${this.insertInfo.insertKeys.join(',')})`
        const values = `VALUES(${this.addSingleQuoteForValues(sqlStatementIndex)})`
        return `${keys} ${values}`
    }
    addSingleQuoteForValues = (sqlStatementIndex?: number): string => {
        const addSingleQuoteValues = this.insertInfo.insertValues.map((value, i) => {
            if (sqlStatementIndex === i) {
                return value
            }
            return "'" + value + "'"
        })
        return addSingleQuoteValues.join(',')
    }
    outputSQL = (sqlStatementIndex?: number) => {
        return `${this.headSQL} ${this.insertInfo.tableName} ${this.createKeyValuses(sqlStatementIndex)}`
    }
}
