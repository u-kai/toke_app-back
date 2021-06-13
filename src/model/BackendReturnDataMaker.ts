import { SelectResult } from 'type/SelectResult'
import { DBOperation } from 'type/DBOperation'
import { SQLError } from 'type/SQLError'
import { DBReturn } from 'type/DBReturn'
export class BackendReturnDataMaker {
    private dbOperation: DBOperation
    private dbReturnData: DBReturn
    constructor(dbOperation: DBOperation, dbReturnData: DBReturn) {
        this.dbOperation = dbOperation
        this.dbReturnData = dbReturnData
    }
    private isSelectResult = (dbData: any): dbData is SelectResult => {
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
        return { status: 200, results: { select: this.dbReturnData as SelectResult } }
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
