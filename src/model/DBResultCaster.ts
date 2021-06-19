import { DBReturn } from 'types/backend-return-types/DBReturn'
import { BackendSelectResult } from 'types/backend-return-types/SelectResult'
import { SQLError } from 'types/backend-return-types/SQLError'
import { BackendInsertUpdateDeleteResult } from 'types/backend-return-types/InsertUpdateDeleteResult'
import {causeUnknownError} from "datas/errors/causeUnknownError"
export class DBResultCaster {
    dbReturn: DBReturn
    constructor(dbReturn: DBReturn) {
        this.dbReturn = dbReturn
    }
    isSelectResult = (dbData: any): dbData is BackendSelectResult => {
        try {
            if (dbData[0][0] === undefined) {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
        return dbData[0][0] !== undefined && dbData[0].length !== 0
    }
    isEmpty = (dbData: any): dbData is SQLError => {
        return dbData[0].length === 0
    }
    isErrorResult = (dbData: any): dbData is SQLError => {
        return (
            dbData.code !== undefined &&
            dbData.sqlMessage !== undefined &&
            dbData.errno !== undefined &&
            dbData.sqlState !== undefined
        )
    }
    isOtherResult = (dbData: any): dbData is BackendInsertUpdateDeleteResult => {
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
    castSelectResult = () => {
        if (this.isSelectResult(this.dbReturn)) {
            const selectData = this.dbReturn as BackendSelectResult
            return selectData[0]
        }
        return //causeUnknownError("undefined error")
    }
    castError = () => {
        if (this.isErrorResult(this.dbReturn) || this.isEmpty(this.dbReturn)) {
            const errorData = this.dbReturn as SQLError
            return errorData
        }
        return causeUnknownError("undefined error")
    }
    castOtherResult = () => {
        if(this.isOtherResult(this.dbReturn)) {
            const otherData = this.dbReturn as BackendInsertUpdateDeleteResult
            return otherData[0]
        }
        return causeUnknownError("undefined error")
    }
}
