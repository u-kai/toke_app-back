import { SelectResult,BackendSelectResult } from 'type/SelectResult'
import { SQLError } from 'type/SQLError'
import { DBReturn } from 'type/DBReturn'
export class BackendReturnDataMaker {
    private dbReturnData: DBReturn
    constructor(dbReturnData: DBReturn) {
        this.dbReturnData = dbReturnData
    }
    private isSelectResult = (dbData: any): dbData is BackendSelectResult => {
        return dbData[0][0] !== undefined
    }

    private isErrorResult = (dbData: any): dbData is SQLError => {
        return (
            dbData.code !== undefined &&
            dbData.sqlMessage !== undefined &&
            dbData.errno !== undefined &&
            dbData.sqlState !== undefined
        )
    }
    private caseError = () => {
        return { status: 400, results: { error: this.dbReturnData as SQLError } }
    }
    private caseSelect = () => {
        const selectInfos = this.dbReturnData as BackendSelectResult
        const results:SelectResult = selectInfos[0]
        return { status: 200, results: { select:results } }
    }
    createData = () => {
        if (this.isErrorResult(this.dbReturnData)) {
            return this.caseError()
        }
        if (this.isSelectResult(this.dbReturnData)) {
            return this.caseSelect()
        }
    }
}
