import {UpdateMakerForSomething} from "model/SQL/Update/UpdateMakerForSomething"
import { WhereOperator } from "types/DB-types/WhereOperator"

export class UpdateMakerForIsAttendResponse extends UpdateMakerForSomething{
    userId:string
    attendanceRequestId:string
    isAttend:"true"|"false"
    message:string
    constructor(tableName:string,userId:string,attendanceRequestId:string,isAttend:"true"|"false",message:string){
        super(tableName)
        this.userId = userId
        this.attendanceRequestId = attendanceRequestId
        this.isAttend = isAttend
        this.message = message
    }
    private makeIsAttendResponseUpdateInfo = ()=>{
        const whereKeys = ["attendance_requests_id","user_id"]
        const whereValues = [this.attendanceRequestId,this.userId]
        const whereOperators:WhereOperator[] = ["AND"]
        
        return this.makeUpdateInfo(["is_response","is_attendance","message"],
        ["true",this.isAttend,this.message],whereKeys,whereValues,whereOperators)
    }
    SQLForIsAttendResponse = () => {
        const updateInfo = this.makeIsAttendResponseUpdateInfo()
        return this.outputSQL(updateInfo)
    }
}
