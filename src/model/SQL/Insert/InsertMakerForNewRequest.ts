import {InsertMakerForSomething} from "model/SQL/Insert/InsertMakerForSomething"

export class InsertMakerForNewRequest extends InsertMakerForSomething{
    private tableName:string
    private insertKeys:string[]
    private insertValuse:string[]
    constructor(purpose:string,
        date:Date,
        location:string,
        organizer_id:string,
        describe:string,
        brings:string,
        organizer_name:string){
            super()
            this.tableName = "attendance_requests"
            this.insertKeys = ["purpose","date","location","organizer_id","describe","bring","organizer_name"]
            this.insertValuse = [purpose,date.toString(),location,organizer_id,describe,brings,organizer_name]
        }
    private makeForNewRequest = () => {
        return this.makeInsertInfo(this.tableName,this.insertKeys,this.insertValuse)
    }
    SQLForNewRequest = () => {
        const insertInfo = this.makeForNewRequest()
        return this.outputSQL(insertInfo)
    }

}