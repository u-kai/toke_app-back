import { InsertNewAndUpdateSeqEvent } from 'model/SQL/InsertNewAndUpdateSeqEvent'
import { InsertMakerForRequestMembers } from 'model/SQL/Insert/InsertMakerForRequestMembers'
import { duplicateEntryError } from 'datas/errors/duplicateEntryError'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'

export class NewEventRegister {
    private memberIds: string[]
    private insertNewAndUpdateSeqEvent: InsertNewAndUpdateSeqEvent
    constructor(insertValuesInsufficientId: string[], memberIds: string[]) {
        this.memberIds = memberIds
        this.insertNewAndUpdateSeqEvent = new InsertNewAndUpdateSeqEvent(insertValuesInsufficientId)
    }
    private SQLForInsertRequestMembers = () => {
        const insertMaker = new InsertMakerForRequestMembers(this.memberIds)
        return insertMaker.SQLForRequestMembers()
    }
    run = async () => {
        return await this.insertNewAndUpdateSeqEvent.confirmIsNotExist().then((results: boolean) => {
            if (results === false) {
                return duplicateEntryError
            }
            const mysqlExecuter = new MysqlExecuter()
            const sqls: string[] = [
                this.SQLForInsertRequestMembers(),
                this.insertNewAndUpdateSeqEvent.SQLForInsertNew(),
                this.insertNewAndUpdateSeqEvent.SQLForUpdateSeqTable(),
            ]
            console.log('sqls', sqls)
            return mysqlExecuter.multiExecutes(sqls)
        })
    }
}
