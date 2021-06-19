import { causeUnknownError } from 'datas/errors/causeUnknownError'
import { createConnectionError } from 'datas/errors/createConnectionError'
import * as mysql from 'mysql2/promise'
import Connection = require('mysql2/typings/mysql/lib/Connection')
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { DBConfig } from 'types/DB-types/DBConfig'

export class MysqlExecuter {
    private dbConfig: DBConfig
    constructor(dbConfig: DBConfig) {
        this.dbConfig = dbConfig
    }
    execute = async (sql: string) => {
        let results: any
        try {
            const connection = await mysql.createConnection(this.dbConfig)
            results = await connection.query(sql)
            connection.end()
        } catch (e) {
            results = e
            console.log(e)
            return e
        }
        return results
    }
    multiExecutes = async (sqls: string[]) => {
        const results: DBReturn = [[{ success: 'success' }]]
        let connection: mysql.Connection
        try {
            connection = await mysql.createConnection(this.dbConfig)
        } catch (e) {
            console.log('connection error', e)
            return createConnectionError
        }
        try {
            for (const i in sqls) {
                await connection.query(sqls[i])
            }
            console.log('all success1')
            await connection.commit()
            console.log('all success2')
            return results
        } catch (e) {
            console.log('rollback', e)
            await connection.rollback()
            await connection.end()
            return causeUnknownError(e)
        }
    }
}
