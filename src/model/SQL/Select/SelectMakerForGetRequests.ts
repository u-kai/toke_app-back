import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectMakerForSomething } from 'model/SQL/Select/SelectMakerForSomething'
import { SelectMakerForGetRequestsCount } from 'model/SQL/Select/SelectMakerForGetRequestsCount'
import { SelectMakerForGetRequestsIds } from 'model/SQL/Select/SelectMakerForGetRequestsIds'

export class SelectMakerForGetRequests extends SelectMakerForSomething {
    private forIds: SelectMakerForGetRequestsIds
    private forCount: SelectMakerForGetRequestsCount
    constructor(userId: string, isResponse: boolean) {
        super('user_attendance_requests_info')
        this.forCount = new SelectMakerForGetRequestsCount(userId, isResponse)
        this.forIds = new SelectMakerForGetRequestsIds(userId, isResponse)
    }
    SQLForAttendanceRequestsCount = (): string => {
        return this.forCount.sql()
    }
    SQLForAttendanceRequestsInfos = (): string => {
        return `SELECT * FROM attendance_requests WHERE attendance_request_id IN (${this.forIds.sql()})`
    }
}
