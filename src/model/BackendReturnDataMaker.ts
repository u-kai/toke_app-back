import { SelectResult, DBSelectResult } from 'types/backend-return-types/SelectResult'
import { SQLError } from 'types/backend-return-types/SQLError'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import {
    InsertUpdateDeleteResult,
    DBInsertUpdateDeleteResult,
} from 'types/backend-return-types/InsertUpdateDeleteResult'
import { DBResultChecker } from 'model/DBResultChecker'
import { Success } from 'types/backend-return-types/Success'
export class BackendReturnDataMaker {
    private dbReturnData: DBReturn
    constructor(dbReturnData: DBReturn) {
        this.dbReturnData = dbReturnData
    }
    private caseError = () => {
        return { status: 400, results: { error: this.dbReturnData as SQLError } }
    }
    private caseEmpty = () => {
        const emptyError: SQLError = {
            code: '0',
            sqlMessage: 'データが見つかりませんでした．',
            sqlState: '',
            errno: -1000,
        }
        return { status: 400, results: { error: emptyError } }
    }
    private caseSelect = () => {
        const selectInfos = this.dbReturnData as DBSelectResult
        if (selectInfos.length === 0) {
            return { status: 400, results: { error: { code: '0', sqlState: '0', errno: 0, sqlMessage: 'not fund' } } }
        }
        const results: SelectResult = selectInfos[0]
        return { status: 200, results: { select: results } }
    }
    private caseSuccess = () => {
        const successInfos = this.dbReturnData as Success
        const result = successInfos[0]
        return { status: 200, results: { success: result } }
    }
    private caseOther = () => {
        const otherInfos = this.dbReturnData as DBInsertUpdateDeleteResult
        const results: InsertUpdateDeleteResult = otherInfos[0]
        if (results.affectedRows === 0) {
            return this.caseEmpty()
        }
        return { status: 200, results: { other: results } }
    }
    createData = () => {
        const checker = new DBResultChecker()
        if (checker.isEmpty(this.dbReturnData)) {
            return this.caseEmpty()
        }
        if (checker.isErrorResult(this.dbReturnData)) {
            return this.caseError()
        }
        if (checker.isSuccessResult(this.dbReturnData)) {
            return this.caseSuccess()
        }
        if (checker.isSelectResult(this.dbReturnData)) {
            return this.caseSelect()
        }
        if (checker.isOtherResult(this.dbReturnData)) {
            return this.caseOther()
        }
    }
    createResults = () => {
        const checker = new DBResultChecker()
        if (checker.isSelectResult(this.dbReturnData)) {
            return this.dbReturnData[0]
        }
        return 'Error'
    }
}
