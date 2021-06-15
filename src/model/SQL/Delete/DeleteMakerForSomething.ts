import { DeleteMaker } from 'model/SQL/Delete/DeleteMaker'
import { SQLInfoMaker } from 'model/SQL/SQLInfoMaker'
import { DeleteInfo } from 'types/DB-types/DeleteInfo'
import { WhereOperator } from 'types/DB-types/WhereOperator'

export class DeleteMakerForSomething {
    makeDeleteInfo = (
        tableName: string,
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[]
    ): DeleteInfo => {
        const deleteInfoMaker = new SQLInfoMaker(tableName)
        return deleteInfoMaker.makeDeleteInfo(whereKeys, whereValues, whereOperators)
    }
    outputSQL = (deleteInfo: DeleteInfo) => {
        const deleteMaker = new DeleteMaker(deleteInfo)
        return deleteMaker.outputSQL()
    }
}
