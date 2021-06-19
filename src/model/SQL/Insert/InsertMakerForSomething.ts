import { SQLInfoMaker } from 'model/SQL/SQLInfoMaker'
import { InsertMaker } from 'model/SQL/Insert/InsertMaker'
import { InsertInfo } from 'types/DB-types/InsertInfo'
export class InsertMakerForSomething {
    makeInsertInfo = (tableName: string, insertKeys: string[], insertValues: string[]): InsertInfo => {
        const insertInfoMaker = new SQLInfoMaker(tableName)
        return insertInfoMaker.makeInsertInfo(insertKeys, insertValues)
    }
    outputSQL = (insertInfo: InsertInfo, sqlStatementIndex?: number) => {
        const insertMaker = new InsertMaker(insertInfo)
        return insertMaker.outputSQL(sqlStatementIndex)
    }
}
