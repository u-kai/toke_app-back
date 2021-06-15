import { WhereOperator } from 'types/DB-types/WhereOperator'
import { SelectInfo } from 'types/DB-types/SelectInfo'
import { InsertInfo } from 'types/DB-types/InsertInfo'
import { UpdateInfo } from 'types/DB-types/UpdateInfo'

export class SQLInfoMaker {
    tableName: string
    constructor(tableName: string) {
        this.tableName = tableName
    }
    makeSelectInfo = (
        selectDatas: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[]
    ): SelectInfo => {
        return {
            selectDatas: selectDatas,
            tableName: this.tableName,
            whereClaseElements: {
                whereKeys: whereKeys,
                whereValues: whereValues,
                whereOperators: whereOperators,
            },
        }
    }
    makeInsertInfo = (
        insertKeys: string[],
        insertValues: string[],
        // whereKeys: string[],
        // whereValues: string[],
        // whereOperators: WhereOperator[]
    ): InsertInfo => {
        return {
            tableName: this.tableName,
            insertKeys: insertKeys,
            insertValues: insertValues,
            // whereClauseElements: {
            //     whereKeys: whereKeys,
            //     whereValues: whereValues,
            //     whereOperators: whereOperators,
            // },
        }
    }
    makeUpdateInfo = (
        updateKeys: string[],
        updateValues: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[]
    ): UpdateInfo => {
        return {
            tableName: this.tableName,
            updateKeys: updateKeys,
            updateValues: updateValues,
            whereClauseElements: {
                whereKeys: whereKeys,
                whereValues: whereValues,
                whereOperators: whereOperators,
            },
        }
    }
    // makeDeleteInfo = ():DeleteInfo=>{}
}
