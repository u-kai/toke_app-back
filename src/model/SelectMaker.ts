import { SelectInfo } from 'type/SelectInfo'
import { WhereClauseMaker } from 'model/WhereClauseMaker'
export class SelectMaker {
    private headSql: string
    private selectInfo: SelectInfo
    constructor(selectInfo: SelectInfo) {
        this.headSql = 'SELECT'
        if (selectInfo.selectDatas) {
            this.selectInfo = selectInfo
            return
        }
        selectInfo.selectDatas = ['*']
        this.selectInfo = selectInfo
    }
    private expandSelectDatas = (): string => {
        return this.selectInfo.selectDatas!.join(',')
    }
    private createWhereClause = (): string => {
        const whereClauseMaker = new WhereClauseMaker(this.selectInfo.whereClaseElements)
        return whereClauseMaker.createWhereClause()
    }
    outputSQL = () => {
        return `${this.headSql} ${this.expandSelectDatas()} FROM ${
            this.selectInfo.tableName
        } ${this.createWhereClause()}`
    }
}
