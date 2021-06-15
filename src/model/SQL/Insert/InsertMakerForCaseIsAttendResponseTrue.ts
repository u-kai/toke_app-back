import {InsertMakerForSomething} from "model/SQL/Insert/InsertMakerForSomething"

export class InsertMakerForCaseIsAttendResponseTrue extends InsertMakerForSomething{
    private tableName:string
    private insertKeys:["participant_id","attendance_requests_id"]
    private insertValues:string[]
    constructor(insertValues:string[]){
        super()
        this.tableName = "event_participants"
        this.insertKeys = ["participant_id","attendance_requests_id"]
        this.insertValues = insertValues
    }
 
    private makeCaseIsAttendResponseTrue = () => {
        return this.makeInsertInfo(this.tableName,this.insertKeys,this.insertValues)
    }
    SQLForCaseIsAttendResponseTrue = () => {
        const insertInfo = this.makeCaseIsAttendResponseTrue()
        return this.outputSQL(insertInfo)
    }
}