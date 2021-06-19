import { DBSelectResult } from 'types/backend-return-types/SelectResult'
import { SQLError } from 'types/backend-return-types/SQLError'
import { DBInsertUpdateDeleteResult } from 'types/backend-return-types/InsertUpdateDeleteResult'

export class DBResultChecker {
    isSelectResult = (dbData: any): dbData is DBSelectResult => {
        try {
            if (dbData[0].length === undefined) {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
        return dbData[0][0] !== undefined && dbData[0].length !== 0
    }

    isEmpty = (dbData: any): dbData is SQLError => {
        try {
            return dbData[0].length === 0
        } catch (e) {
            console.log(e)
            return false
        }
    }
    isErrorResult = (dbData: any): dbData is SQLError => {
        return (
            dbData.code !== undefined &&
            dbData.sqlMessage !== undefined &&
            dbData.errno !== undefined &&
            dbData.sqlState !== undefined
        )
    }
    isOtherResult = (dbData: any): dbData is DBInsertUpdateDeleteResult => {
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
}
