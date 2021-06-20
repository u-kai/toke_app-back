import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectMakerForSomething } from 'model/SQL/Select/SelectMakerForSomething'
export class SelectMakerForGetRequestsCount extends SelectMakerForSomething {
    private userId: string
    private isResponse: boolean
    constructor(userId: string, isResponse: boolean) {
        super('user_attendance_requests_info')
        this.userId = userId
        this.isResponse = isResponse
    }
    private makeSelectInfoForCount = (): SelectInfo => {
        return this.makeSelectInfo(
            ['count(*)'],
            ['user_id', 'is_response'],
            [this.userId, `${this.isResponse}`],
            ['AND']
        )
    }
    sql = (): string => {
        const selectInfo: SelectInfo = this.makeSelectInfoForCount()
        return this.outputSQL(selectInfo)
    }
}
