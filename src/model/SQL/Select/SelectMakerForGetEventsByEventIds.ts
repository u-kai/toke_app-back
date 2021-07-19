import { SelectInfo } from "../../../types/DB-types/SelectInfo";
import { SelectMakerForSchedule } from "./SelectMakerForSchedule";
import { SelectMakerForSomething } from "./SelectMakerForSomething";

class SelectMakerForGetMyEventIds extends SelectMakerForSomething{
    private userId:string
    constructor(userId:string){
        super('user_attendance_requests_info')
        this.userId = userId
    }
    private makeSelectInfoForGetMyEventIds = ():SelectInfo => {
        return this.makeSelectInfo(
            ["attendance_request_id"],
            ["user_id"],
            [this.userId],
            []
        )
    }
    sql = ():string => {
        const selectInfo:SelectInfo = this.makeSelectInfoForGetMyEventIds()
        return this.outputSQL(selectInfo)
    }
}

export class SelectMakerForGetMyEventInfo extends SelectMakerForSomething{
    private userId:string
    constructor(userId:string){
        super("attendance_requests")
        this.userId = userId
    }
    private factory = () => {
        return new SelectMakerForGetMyEventIds(this.userId)
    }
    SQLForGetMyEventInfo = () => {
        return `SELECT * FROM ${this.tableName} WHERE attendance_request_id IN (${this.factory().sql()})`
    }
}