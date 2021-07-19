import { causeUnknownError } from '../../datas/errors/causeUnknownError'
import { createConnectionError } from '../../datas/errors/createConnectionError'
import * as mysql from 'mysql2/promise'
import { MysqlConnecter } from '../../model/SQL/MysqlConnecter'
import { DBReturn } from '../../types/backend-return-types/DBReturn'
import { DBConfig } from '../../types/DB-types/DBConfig'
import { dbConfig } from '../../datas/dbConfig'
import { Success } from '../../types/backend-return-types/Success'
import { SQLError } from '../../types/backend-return-types/SQLError'
export class MysqlExecuter {
    private dbConfig: DBConfig
    private connetion: Promise<mysql.Connection | false>
    constructor() {
        this.dbConfig = dbConfig
        const connecter = new MysqlConnecter()
        this.connetion = connecter.returnConnection()
    }
    execute = async (sql: string) => {
        let results: any
        //     return this.connetion.then(async(connetion:mysql.Connection|false)=>{
        //         if(connetion){
        //             console.log("clear1")
        //             const results:DBReturn = await connetion.query(sql)
        //             .then((data)=>{
        //                 return data as DBReturn
        //             })
        //             .catch((e)=>{
        //                 return e as SQLError
        //             })
        //             console.log("clear2")
        //             await connetion.end()
        //             return results
        //         }
        //         return createConnectionError
        //     })
        // }
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
    multiExecutes = async (sqls: string[]): Promise<Success | SQLError> => {
        const results: Success = [[{ success: 'success' }]]
        let connection: mysql.Connection
        try {
            connection = await mysql.createConnection(this.dbConfig)
        } catch (e) {
            console.log('connection error', e)
            return createConnectionError
        }
        connection.beginTransaction()
        try {
            for (const i in sqls) {
                await connection.query(sqls[i])
                console.log('clear', i)
            }
            console.log('all success1')
            await connection.commit()
            console.log('all success2')
            await connection.end()
            return results
        } catch (e) {
            console.log('rollback', e)
            await connection.rollback()
            await connection.end()
            return causeUnknownError(e)
        }
    }
}
