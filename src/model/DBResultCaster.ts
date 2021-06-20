import { DBReturn } from 'types/backend-return-types/DBReturn'
import { DBSelectResult } from 'types/backend-return-types/SelectResult'
import { SQLError } from 'types/backend-return-types/SQLError'
import { DBInsertUpdateDeleteResult } from 'types/backend-return-types/InsertUpdateDeleteResult'
import { causeUnknownError } from 'datas/errors/causeUnknownError'
import { DBResultChecker } from './DBResultChecker'
export class DBResultCaster extends DBResultChecker {
    dbReturn: DBReturn
    constructor(dbReturn: DBReturn) {
        super()
        this.dbReturn = dbReturn
    }
    castSelectResult = () => {
        if (this.isSelectResult(this.dbReturn)) {
            const selectData = this.dbReturn as DBSelectResult
            return selectData[0]
        }
        return false
    }
    castError = () => {
        if (this.isErrorResult(this.dbReturn) || this.isEmpty(this.dbReturn)) {
            const errorData = this.dbReturn as SQLError
            return errorData
        }
        return false
    }
    castEmpty = () => {
        
    }
    castOtherResult = () => {
        if (this.isOtherResult(this.dbReturn)) {
            const otherData = this.dbReturn as DBInsertUpdateDeleteResult
            return otherData[0]
        }
        return false
    }
}
