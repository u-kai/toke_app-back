import { SelectInfo } from '../../../types/DB-types/SelectInfo'
import { WhereOperator } from '../../../types/DB-types/WhereOperator'
import { SelectMakerForSomething } from '../../../model/SQL/Select/SelectMakerForSomething'
export class SelectMakerForSchedule extends SelectMakerForSomething {
    private userId: string
    constructor(userId: string) {
        super('user_attendance_requests_info')
        this.userId = userId
    }
    private makeSelectInfoForCount = (): SelectInfo => {
        return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND'])
    }
    SQLForAttendanceRequestsCount = (): string => {
        const selectInfo: SelectInfo = this.makeSelectInfoForCount()
        return this.outputSQL(selectInfo)
    }

    private makeSelectInfoForIds = (): SelectInfo => {
        return this.makeSelectInfo(
            ['attendance_request_id'],
            ['user_id', 'is_response'],
            [this.userId, 'false'],
            ['AND']
        )
    }
    SQLForAttendanceRequestsIds = (): string => {
        const selectInfo: SelectInfo = this.makeSelectInfoForIds()
        return this.outputSQL(selectInfo)
    }

    private makeSelectInfosForInfos = (ids: string[]): SelectInfo => {
        const whereKeys = ids.map((_) => 'attendance_request_id')
        const whereOperators: WhereOperator[] = ids.map((_) => 'OR')
        if (whereOperators.length >= 1) {
            whereOperators.pop()
        }
        return this.makeSelectInfo(['*'], whereKeys, ids, whereOperators, 'attendance_requests')
    }
    SQLForAttendanceRequestsInfos = (ids: string[]): string => {
        const selectInfo: SelectInfo = this.makeSelectInfosForInfos(ids)
        return this.outputSQL(selectInfo)
    }
}
