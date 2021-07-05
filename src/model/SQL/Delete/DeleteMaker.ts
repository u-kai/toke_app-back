import { DeleteInfo } from '~/types/DB-types/DeleteInfo'
import { WhereClauseMaker } from '~/model/SQL/WhereClauseMaker'
export class DeleteMaker {
    private headSQL: string
    private deleteInfo: DeleteInfo
    constructor(deleteInfo: DeleteInfo) {
        this.headSQL = 'DELETE FROM'
        this.deleteInfo = deleteInfo
    }
    private createWhereClause = () => {
        const whereClauseMaker = new WhereClauseMaker(this.deleteInfo.whereClauseElements)
        return whereClauseMaker.createWhereClause()
    }
    outputSQL = () => {
        return `${this.headSQL} ${this.deleteInfo.tableName} ${this.createWhereClause()}`
    }
}
