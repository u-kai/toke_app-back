import { SelectMaker } from "model/SelectMaker";
import { SelectInfo } from 'types/DB-types/SelectInfo'
import { WhereOperator } from 'types/DB-types/WhereOperator'

export class SQLMakerForSchedule {
    private userId: string
    private tableName: string
    constructor(userId: string) {
        this.userId = userId
        this.tableName = 'user_attendance_requests_info'
    }
    private makeSelectInfo = (
        selectDatas: string[],
        whereKeys: string[],
        whereValues: string[],
        whereOperators: WhereOperator[],
        tableName?: string
    ): SelectInfo => {
        if (!tableName) {
            tableName = this.tableName
        }
        return {
            selectDatas: selectDatas,
            tableName: tableName,
            whereClaseElements: {
                whereKeys: whereKeys,
                whereValues: whereValues,
                whereOperators: whereOperators,
            },
        }
    }
    private outputSQL = (selectInfo:SelectInfo) => {
        const selectMaker = new SelectMaker(selectInfo)
        return selectMaker.outputSQL()
    }
    private makeSelectInfoForCount = (): SelectInfo => {
        return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND'])
    }
    SQLForAttendanceRequestsCount = ():string => {
        const selectInfo:SelectInfo = this.makeSelectInfoForCount()
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
    SQLForAttendanceRequestsIds = ():string=>{
        const selectInfo:SelectInfo = this.makeSelectInfoForIds()
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
}
