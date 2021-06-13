import { SelectResult } from 'type/SelectResult'
import { DBOperation } from 'type/DBOperation'
import { SQLError } from 'type/SQLError'
import { DBReturn } from 'type/DBReturn'
export class BackendReturnDataMaker {
    dbOperation: DBOperation
    dbReturnData: DBReturn
    constructor(dbOperation: DBOperation, dbReturnData: DBReturn) {
        this.dbOperation = dbOperation
        this.dbReturnData = dbReturnData
    }
    // isSelectResult = ():boolean => {
    //     const
    //     return
    // }
    isErrorResult = (): boolean => {
        const isError = (dbData: any): dbData is SQLError => {
            return (
                dbData.code !== undefined &&
                dbData.sqlMessage !== undefined &&
                dbData.errno !== undefined &&
                dbData.sqlState !== undefined
            )
        }
        return isError(this.dbReturnData)
    }
    // checkDataType = () => {

    // }
    caseError = () => {
        return { status: 400, results: [{ error: this.dbReturnData }] }
    }
    createData = () => {
        return this.isErrorResult()
    }
}
