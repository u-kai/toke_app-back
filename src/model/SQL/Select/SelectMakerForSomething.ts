import { WhereOperator } from 'types/DB-types/WhereOperator'
import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SQLInfoMaker } from 'model/SQL/SQLInfoMaker'
import { SelectMaker } from 'model/SQL/Select/SelectMaker'
export class SelectMakerForSomething {
    tableName: string
    constructor(tableName: string) {
        this.tableName = tableName
    }
    makeSelectInfo = (
        selectDatas: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[],
        tableName?: string
    ): SelectInfo => {
        if (!tableName) {
            tableName = this.tableName
        }
        const selectInfoMaker = new SQLInfoMaker(tableName)
        return selectInfoMaker.makeSelectInfo(selectDatas, whereKeys, whereValues, whereOperators)
    }
    outputSQL = (selectInfo: SelectInfo) => {
        const selectMaker = new SelectMaker(selectInfo)
        return selectMaker.outputSQL()
    }
}
