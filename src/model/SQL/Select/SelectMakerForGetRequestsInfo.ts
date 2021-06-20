import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectMakerForSomething } from 'model/SQL/Select/SelectMakerForSomething'
import { WhereOperator } from 'types/DB-types/WhereOperator'
export class SelectMakerForGetRequestsInfo extends SelectMakerForSomething{
    constructor(){
        super('user_attendance_requests_info')
    }
    private makeSelectInfosForInfos = (ids: string[]): SelectInfo => {
        const whereKeys = ids.map((_) => 'attendance_request_id')
        const whereOperators: WhereOperator[] = ids.map((_) => 'OR')
        if (whereOperators.length >= 1) {
            whereOperators.pop()
        }
        return this.makeSelectInfo(['*'], whereKeys, ids, whereOperators, 'attendance_requests')
    }
    sql = (ids: string[]): string => {
        const selectInfo: SelectInfo = this.makeSelectInfosForInfos(ids)
        return this.outputSQL(selectInfo)
    }
}