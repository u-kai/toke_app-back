import { DeleteMakerForSomething } from 'model/SQL/Delete/DeleteMakerForSomething'
import { WhereOperator } from 'types/DB-types/WhereOperator'

export class DeleteMakerForChangeAbsent extends DeleteMakerForSomething {
    private userId: string
    private attendanceRequestId: string
    private tableName: string
    constructor(userId: string, attendanceRequestId: string) {
        super()
        this.userId = userId
        this.attendanceRequestId = attendanceRequestId
        this.tableName = 'event_participants'
    }
    private makeChangeAbsentDeleteInfo = () => {
        const whereKeys = ['participant_id', 'attendance_requests_id']
        const whereValues = [this.userId, this.attendanceRequestId]
        const whereOperators: WhereOperator[] = ['AND']

        return this.makeDeleteInfo(this.tableName, whereKeys, whereValues, whereOperators)
    }
    SQLForChangeAbsent = () => {
        const deleteInfo = this.makeChangeAbsentDeleteInfo()
        return this.outputSQL(deleteInfo)
    }
}
