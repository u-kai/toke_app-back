import { InsertMakerForSomething } from './Insert/InsertMakerForSomething'
import * as mysql from 'mysql2/promise'
import { dbConfig, DBConfig } from 'datas/dbConfig'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'
import { createConnectionError } from 'datas/errors/createConnectionError'
import { SQLError } from 'types/backend-return-types/SQLError'
import { duplicateEntryError } from 'datas/errors/duplicateEntryError'
import { causeUnknownError } from 'datas/errors/causeUnknownError'
import { DBSelectResult } from 'types/backend-return-types/SelectResult'
import { DBResultCaster } from 'model/DBResultCaster'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { MysqlConnecter } from 'model/SQL/MysqlConnecter'
import { InsertNewAndUpdateSeq } from 'interfaces/InsertNewAndUpdateSeq'
import { DBResultChecker } from 'model/DBResultChecker'
import { MysqlExecuter } from './MysqlExecuter'
export class InsertNewAndUpdateSeqSomething implements InsertNewAndUpdateSeq {
    seqTableName: string
    seqIdName: string
    insertTableName: string
    insertValuesInsufficientId: string[]
    insertKeys: string[]
    constructor(
        seqTableName: string,
        seqIdName: string,
        insertTableName: string,
        insertKeys: string[],
        insertValuesInsufficientId: string[]
    ) {
        this.seqTableName = seqTableName
        this.seqIdName = seqIdName
        this.insertTableName = insertTableName
        this.insertKeys = insertKeys
        this.insertValuesInsufficientId = insertValuesInsufficientId
    }
    SQLForConfirmIsNotExist = () => {
        return 'each select statement'
    }
    confirmIsNotExist = async (): Promise<boolean> => {
        const mySqlConnecter = new MysqlConnecter()
        return mySqlConnecter.returnConnection().then(async (connection: mysql.Connection | false) => {
            if (connection) {
                const confirmNotExist = await connection.query(this.SQLForConfirmIsNotExist())
                const checker = new DBResultChecker()
                return checker.isEmpty(confirmNotExist)
            }
            return false
        })
    }
    SQLForInsertNew = () => {
        const insertMaker = new InsertMakerForSomething()
        const insertInfo = insertMaker.makeInsertInfo(
            this.insertTableName,
            this.insertKeys,
            this.addIdDataToInsertValues()
        )
        return insertMaker.outputSQL(insertInfo, this.insertKeys.length - 1)
    }
    SQLForUpdateSeqTable = () => {
        return `UPDATE ${this.seqTableName} SET ${this.seqIdName} = (${this.seqIdName} + 1)`
    }
    addIdDataToInsertValues = (): string[] => {
        return [...this.insertValuesInsufficientId, `(SELECT ${this.seqIdName} FROM ${this.seqTableName})`]
    }

    insertNewAndUpdateSeq = (): Promise<DBReturn> => {
        const mysqlExecuter = new MysqlExecuter()
        return mysqlExecuter.multiExecutes([this.SQLForInsertNew(), this.SQLForUpdateSeqTable()])
    }

    run = async () => {
        return await this.confirmIsNotExist().then((results: boolean) => {
            if (results === false) {
                return duplicateEntryError
            }
            return this.insertNewAndUpdateSeq()
        })
    }
}
