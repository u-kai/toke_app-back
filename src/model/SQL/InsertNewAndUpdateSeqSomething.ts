import { InsertMakerForSomething } from "./Insert/InsertMakerForSomething"
import * as mysql from "mysql2/promise"
import {dbConfig} from "datas/dbConfig"
import {SelectMakerForLogin} from "model/SQL/Select/SelectMakerForLogin"
export class InsertNewAndUpdateSeqSomething{
    seqTableName:string
    seqIdName:string
    insertTableName:string
    insertValues:string[]
    insertKeys:string[]
    dbConfig:{}
    constructor(seqTableName:string,seqIdName:string,insertTableName:string,insertKeys:string[],insertValues:string[]){
        this.seqTableName = seqTableName
        this.seqIdName = seqIdName
        this.insertTableName = insertTableName
        this.insertKeys = insertKeys
        this.insertValues = insertValues
        this.dbConfig = dbConfig
    }

    SQLForGetCurrentSeqId = () => {
        return `SELECT ${this.seqIdName} FROM ${this.seqTableName}`
    }
    SQLForUpdateSeqTable = (currentId:number) => {
        return `UPDATE ${this.seqTableName} SET ${this.seqIdName} = ${currentId + 1}`
    }
    SQLForInsertNew = (insertId:number) => {
        const insertMaker = new InsertMakerForSomething()
        const insertInfo = insertMaker.makeInsertInfo(this.insertTableName,this.insertKeys,this.addInsertIdInfoForValues(insertId.toString()))
        return insertMaker.outputSQL(insertInfo)
    }
    addInsertIdInfoForValues = (insertId:string):string[] => {
        return [...this.insertValues,insertId]
    }
    SQLForConfirmNotExist = () => {
        const selectMakerForLogin = new SelectMakerForLogin("user_login")
        return selectMakerForLogin.forLogin(this.insertKeys[0],this.insertKeys[1])
    }
    run = async()=> {
        let connection:mysql.Connection
        try{
            connection = await mysql.createConnection(this.dbConfig)
        }catch(e){
            return e
        }
        try{
            const confirmNotExist = await connection.query(this.SQLForConfirmNotExist())
            if(this.isSelectResult(confirmNotExist)){
                return {
                    code: '1',
                    sqlMessage: 'データが既に存在しています．別の名前，パスワードを設定してください',
                    sqlState: '',
                    errno: -2000,
                }
            }
            let results = await connection.query(this.SQLForGetCurrentSeqId())
            if(this.isSelectResult(results)){
                const castResults = results as mysql.RowDataPacket[][]
                const currentIdMap:{[key:string]:number} = castResults[0][0]
                const currentId = Object.values(currentIdMap)[0] 
                await connection.query(this.SQLForUpdateSeqTable(currentId))
                await connection.query(this.SQLForInsertNew(currentId))
                await connection.commit()//not await ?
                await connection.end()
                return [[{"success":"success"}]]
            }else{
                return {
                    code: '1',
                    sqlMessage: 'エラーです．管理者に報告してください．',
                    sqlState: '',
                    errno: -2000,
                }
            }
        }catch(e){
            await connection.rollback()
            await connection.end()
            return e
        }
    }
    isSelectResult = (dbData: any): dbData is mysql.RowDataPacket[][] => {
        try {
            if (dbData[0][0] === undefined) {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
        return dbData[0][0] !== undefined && dbData[0].length !== 0
    }
}