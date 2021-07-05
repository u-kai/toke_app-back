import { SelectInfo } from '~/types/DB-types/SelectInfo'
import { SelectMakerForSomething } from '~/model/SQL/Select/SelectMakerForSomething'
export class SelectMakerForGetEventIds extends SelectMakerForSomething {
    private userId: string
    constructor(userId: string) {
        super('user_attendance_requests_info')
        this.userId = userId
    }
    private makeSelectInfoForIds = (): SelectInfo => {
        return this.makeSelectInfo(
            ['attendance_request_id'],
            ['user_id',"is_attendance"],
            [this.userId,"true"],
            ["AND"]
        )
    }
    sql = (): string => {
        const selectInfo: SelectInfo = this.makeSelectInfoForIds()
        return this.outputSQL(selectInfo)
    }
}
