import * as mysql from 'mysql2/promise'
import { DBConfig } from 'type/DBConfig'

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
}
