import { InsertNewAndUpdateSeqGroup } from '~/model/SQL/InsertNewAndUpdateSeqGroup'

import { duplicateEntryError } from '~/datas/errors/duplicateEntryError'
import { MysqlExecuter } from '~/model/SQL/MysqlExecuter'
import { InsertMakerForSomething } from './Insert/InsertMakerForSomething'

export class NewGroupRegister {
    private memberIds: string[]
    private userGroupsTable: string
    private insertNewAndUpdateSeqGroup: InsertNewAndUpdateSeqGroup
    constructor(insertValuesInsufficientId: string[], memberIds: string[]) {
        this.insertNewAndUpdateSeqGroup = new InsertNewAndUpdateSeqGroup(insertValuesInsufficientId)
        this.memberIds = memberIds
        this.userGroupsTable = 'user_groups'
    }
    private createKeys = () => {
        return '(user_id,group_id)'
    }
    private createValues = () => {
        const seqId = this.insertNewAndUpdateSeqGroup.seqIdName
        const seqTableName = this.insertNewAndUpdateSeqGroup.seqTableName
        const values = this.memberIds.map((id) => `('${id}',(SELECT ${seqId} FROM ${seqTableName}))`)
        return values.join(',')
    }

    private SQLForInsertuserGroups = () => {
        return `INSERT INTO ${this.userGroupsTable} ${this.createKeys()} VALUES${this.createValues()}`
    }
    run = async () => {
        const mysqlExecuter = new MysqlExecuter()
        const sqls: string[] = [
            this.SQLForInsertuserGroups(),
            this.insertNewAndUpdateSeqGroup.SQLForInsertNew(),
            this.insertNewAndUpdateSeqGroup.SQLForUpdateSeqTable(),
        ]
        console.log('sqls', sqls)
        return mysqlExecuter.multiExecutes(sqls)
    }
}
