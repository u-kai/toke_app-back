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
export class InsertNewAndUpdateSeqSomething {
    private seqTableName: string
    private seqIdName: string
    private insertTableName: string
    private insertValues: string[]
    private insertKeys: string[]
    private dbConfig: DBConfig
    constructor(
        seqTableName: string,
        seqIdName: string,
        insertTableName: string,
        insertKeys: string[],
        insertValues: string[]
    ) {
        this.seqTableName = seqTableName
        this.seqIdName = seqIdName
        this.insertTableName = insertTableName
        this.insertKeys = insertKeys
        this.insertValues = insertValues
        this.dbConfig = dbConfig
    }

    SQLForInsertNew = () => {
        const insertMaker = new InsertMakerForSomething()
        const insertInfo = insertMaker.makeInsertInfo(
            this.insertTableName,
            this.insertKeys,
            this.addIdForInsertValues()
        )
        return insertMaker.outputSQL(insertInfo)
    }
    SQLForUpdateSeqTable = () => {
        return `UPDATE ${this.seqTableName} SET ${this.seqIdName} = (${this.seqIdName} + 1)`
    }
    addIdForInsertValues = (): string[] => {
        return [...this.insertValues, `(SELECT ${this.seqIdName} from ${this.seqTableName})`]
    }
    SQLForConfirmIsNotExist = () => {
        const selectMakerForLogin = new SelectMakerForLogin('user_login')
        return selectMakerForLogin.forLogin(this.insertKeys[0], this.insertKeys[1])
    }
    createConnection = async (): Promise<mysql.Connection | false> => {
        try {
            const connection = await mysql.createConnection(this.dbConfig)
            return connection
        } catch (e) {
            return false
        }
    }
    confirmIsNotExist = async (connection: mysql.Connection): Promise<boolean | SQLError> => {
        try {
            const confirmNotExist = await connection.query(this.SQLForConfirmIsNotExist())
            // const checker = new DBResultCaster()
            // if(this.isSelectResult(confirmNotExist)){
            //     return false
            // }
        } catch (e) {
            console.log(e)
            return false
        }
        return true
    }

    // run = async()=> {
    //     const promiseConnection = this.createConnection()
    //     promiseConnection.then((connection:false|mysql.Connection)=>{
    //         if(connection){
    //             const SQLForInsertNew = `INSERT INTO user_login (id,name,password) Valuse
    //             ((select seq_user_id from seq_user_id),'newuser','password')`
    //             connection.query(SQLForInsertNew).then((results:DBReturn)=>{
    //                 const caster = new DBResultCaster(results)
    //                 if(isOther(results)){
    //                     const updateSeq = `UPDATE seq_user_id set seq_user_id  =  seq_user_id + 1`
    //                     const
    //                 }
    //             })
    //         }
    //     })
    //     // let connection:mysql.Connection
    // try{
    //     connection = await mysql.createConnection(this.dbConfig)
    // }catch(e){
    //     return e
    // }
    // const primiseConnection = this.createConnection()
    // primiseConnection.then((connection)=>{
    //     if(connection){
    //         this.confirmNotExist(connection)
    //         .then((confirmResults:boolean|SQLError)=>{
    //             if(!confirmResults){
    //                 return duplicateEntryError
    //             }
    //             if(confirmResults === true){
    //                 this.returnCurrentId(connection)
    //                 .then((currentId)=>{
    //                     if(typeof currentId === "number"){
    //                         (async()=>{
    //                             await connection.query(this.S)
    //                         })
    //                     }
    //                     return currentId
    //                 })
    //             }
    //         })
    //     }
    //     return createConnectionError
    // })
    // try{
    //     const confirmNotExist = await connection.query(this.SQLForConfirmNotExist())
    //     if(this.isSelectResult(confirmNotExist)){
    //         return duplicateEntryError
    //     }
    //     let results = await connection.query(this.SQLForGetCurrentSeqId())
    //     if(this.isSelectResult(results)){
    //         const castResults = results as mysql.RowDataPacket[][]
    //         const currentIdMap:{[key:string]:number} = castResults[0][0]
    //         const currentId = Object.values(currentIdMap)[0]
    //         await connection.query(this.SQLForUpdateSeqTable(currentId))
    //         await connection.query(this.SQLForInsertNew(currentId))
    //         await connection.commit()//not await ?
    //         await connection.end()
    //         return [[{"success":"success"}]]
    //     }else{
    //         return {
    //             code: '1',
    //             sqlMessage: 'エラーです．管理者に報告してください．',
    //             sqlState: '',
    //             errno: -2000,
    //         }
    //     }
    // }catch(e){
    //     await connection.rollback()
    //     await connection.end()
    //     return e
    // }
    // }
    // isSelectResult = (dbData: any): dbData is mysql.RowDataPacket[][] => {
    //     try {
    //         if (dbData[0][0] === undefined) {
    //             return false
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         return false
    //     }
    //     return dbData[0][0] !== undefined && dbData[0].length !== 0
    // }
}