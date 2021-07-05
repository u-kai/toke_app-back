import * as mysql from 'mysql2/promise'
import { dbConfig } from '~/datas/DBConfig'
import { DBConfig } from '~/types/DB-types/DBConfig'
export class MysqlConnecter {
    dbConfig: DBConfig
    constructor() {
        this.dbConfig = dbConfig
    }
    returnConnection = async (): Promise<false | mysql.Connection> => {
        try {
            const connection = await mysql.createConnection(this.dbConfig)
            return connection
        } catch (e) {
            return false
        }
    }
}
