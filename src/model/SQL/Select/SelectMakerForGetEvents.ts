import { SelectMakerForSomething } from '../../../model/SQL/Select/SelectMakerForSomething'
import { SelectMakerForGetEventIds } from '../../../model/SQL/Select/SelectMakerForGetEventIds'

export class SelectMakerForGetEvents extends SelectMakerForSomething {
    private forIds: SelectMakerForGetEventIds
    constructor(userId: string) {
        super('user_attendance_requests_info')
        this.forIds = new SelectMakerForGetEventIds(userId)
    }
    SQLForEventInfos = (): string => {
        return `SELECT * FROM attendance_requests WHERE attendance_request_id IN (${this.forIds.sql()})`
    }
}
