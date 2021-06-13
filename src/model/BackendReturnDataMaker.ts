import { SelectResult, BackendSelectResult } from 'type/SelectResult'
import { SQLError } from 'type/SQLError'
import { DBReturn } from 'type/DBReturn'
import { InsertUpdateDeleteResult, BackendInsertUpdateDeleteResult } from 'type/InsertUpdateDeleteResult'
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
    private isOtherResult = (dbData: any): dbData is BackendInsertUpdateDeleteResult => {
        const otherResutls = dbData[0]
        return (
            otherResutls.fieldCount !== undefined &&
            otherResutls.affectedRows !== undefined &&
            otherResutls.info !== undefined &&
            otherResutls.insertId !== undefined &&
            otherResutls.serverStatus !== undefined &&
            otherResutls.warningStatus !== undefined &&
            otherResutls.changedRows !== undefined
        )
    }
    private caseError = () => {
        return { status: 400, results: { error: this.dbReturnData as SQLError } }
    }
    private caseSelect = () => {
        const selectInfos = this.dbReturnData as BackendSelectResult
        const results: SelectResult = selectInfos[0]
        return { status: 200, results: { select: results } }
    }
    private caseOther = () => {
        const otherInfos = this.dbReturnData as BackendInsertUpdateDeleteResult
        const results: InsertUpdateDeleteResult = otherInfos[0]
        return { status: 200, results: { other: results } }
    }
    createData = () => {
        if (this.isErrorResult(this.dbReturnData)) {
            return this.caseError()
        }
        if (this.isSelectResult(this.dbReturnData)) {
            return this.caseSelect()
        }
        if (this.isOtherResult(this.dbReturnData)) {
            return this.caseOther()
        }
    }
}
