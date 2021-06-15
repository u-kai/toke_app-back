import { SelectResult, BackendSelectResult } from 'types/backend-return-types/SelectResult'
import { SQLError } from 'types/backend-return-types/SQLError'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import {
    InsertUpdateDeleteResult,
    BackendInsertUpdateDeleteResult,
} from 'types/backend-return-types/InsertUpdateDeleteResult'
export class BackendReturnDataMaker {
    private dbReturnData: DBReturn
    constructor(dbReturnData: DBReturn) {
        this.dbReturnData = dbReturnData
    }
    private isSelectResult = (dbData: any): dbData is BackendSelectResult => {
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
    private isEmpty = (dbData: any): dbData is SQLError => {
        return dbData[0].length === 0
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
        const selectInfos = this.dbReturnData as BackendSelectResult
        if (selectInfos.length === 0) {
            return { status: 400, results: { error: { code: '0', sqlState: '0', errno: 0, sqlMessage: 'not fund' } } }
        }
        const results: SelectResult = selectInfos[0]
        return { status: 200, results: { select: results } }
    }
    private caseOther = () => {
        const otherInfos = this.dbReturnData as BackendInsertUpdateDeleteResult
        const results: InsertUpdateDeleteResult = otherInfos[0]
        if (results.affectedRows === 0) {
            return this.caseEmpty()
        }
        return { status: 200, results: { other: results } }
    }
    createData = () => {
        if (this.isEmpty(this.dbReturnData)) {
            return this.caseEmpty()
        }
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
    createResults = () => {
        if (this.isSelectResult(this.dbReturnData)) {
            return this.dbReturnData[0]
        }
        return 'Error'
    }
}
