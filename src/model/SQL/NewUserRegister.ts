import {InsertNewAndUpdateSeqUser} from "model/SQL/InsertNewAndUpdateSeqUser"
import {InsertMakerForSomething} from "model/SQL/Insert/InsertMakerForSomething"
import { duplicateEntryError } from "datas/errors/duplicateEntryError"
import {MysqlExecuter} from "model/SQL/MysqlExecuter"

export class NewUserRegiser {
    private userName:string
    private password:string
    private tableName:string
    private insertNewAndUpdateSeqUser:InsertNewAndUpdateSeqUser
    constructor(userName:string,password:string){
        this.userName = userName
        this.password = password
        this.tableName = "user_info"
        this.insertNewAndUpdateSeqUser = new InsertNewAndUpdateSeqUser([this.userName,this.password])
    }
    SQLForGetCurrentId = () => {
        return `SELECT ${this.insertNewAndUpdateSeqUser.seqIdName} FROM ${this.insertNewAndUpdateSeqUser.seqTableName}`
    }
    SQLForInsertUserInfo = () => {
        return `INSERT INTO ${this.tableName} (user_id,user_name,image_path) VALUES((${this.SQLForGetCurrentId()}),'${this.userName}','')`
    }
    run = async()=>{
        return await this.insertNewAndUpdateSeqUser.confirmIsNotExist()
        .then((results:boolean)=>{
            if(results === false){
                return duplicateEntryError
            }
            const mysqlExecuter = new MysqlExecuter()
            const sqls:string[] = [
                this.SQLForInsertUserInfo(),
                this.insertNewAndUpdateSeqUser.SQLForInsertNew(),
                this.insertNewAndUpdateSeqUser.SQLForUpdateSeqTable()
            ]
            console.log("sqls",sqls)
            return mysqlExecuter.multiExecutes(sqls)
            
        })
    }
} 