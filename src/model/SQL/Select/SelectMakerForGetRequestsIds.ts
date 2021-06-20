import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectMakerForSomething } from 'model/SQL/Select/SelectMakerForSomething'
export class SelectMakerForGetRequestsIds extends SelectMakerForSomething{
    private userId:string
    private isResponse:boolean
    constructor(userId:string,isResponse:boolean){
        super('user_attendance_requests_info')
        this.userId = userId
        this.isResponse = isResponse
    }
    private makeSelectInfoForIds = (): SelectInfo => {
        return this.makeSelectInfo(
            ['attendance_request_id'],
            ['user_id', 'is_response'],
            [this.userId, `${this.isResponse}`],
            ['AND']
        )
    }
    sql = (): string => {
        const selectInfo: SelectInfo = this.makeSelectInfoForIds()
        return this.outputSQL(selectInfo)
    }
}