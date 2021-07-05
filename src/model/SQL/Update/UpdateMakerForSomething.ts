import { UpdateInfo } from '~/types/DB-types/UpdateInfo'
import { WhereClauseElements } from '~/types/DB-types/WhereClauseElements'
import { SQLInfoMaker } from '~/model/SQL/SQLInfoMaker'
import { UpdateMaker } from '~/model/SQL/Update/UpdateMaker'
import { WhereOperator } from '~/types/DB-types/WhereOperator'
export class UpdateMakerForSomething {
    makeUpdateInfo = (
        tableName: string,
        updateKeys: string[],
        updateValues: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[]
    ): UpdateInfo => {
        const updateInfoMaker = new SQLInfoMaker(tableName)
        return updateInfoMaker.makeUpdateInfo(updateKeys, updateValues, whereKeys, whereValues, whereOperators)
    }
    outputSQL = (updateInfo: UpdateInfo) => {
        const updateMaker = new UpdateMaker(updateInfo)
        return updateMaker.outputSQL()
    }
}
