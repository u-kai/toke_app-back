import { UpdateMakerForSomething } from 'model/SQL/Update/UpdateMakerForSomething'
import { WhereOperator } from 'types/DB-types/WhereOperator'

export class UpdateMakerForIsAttendResponse extends UpdateMakerForSomething {
    private userId: string
    private attendanceRequestId: string
    private isAttend: 'true' | 'false'
    private message: string
    private tableName: string
    constructor(userId: string, attendanceRequestId: string, isAttend: 'true' | 'false', message: string) {
        super()
        this.userId = userId
        this.attendanceRequestId = attendanceRequestId
        this.isAttend = isAttend
        this.message = message
        this.tableName = 'user_attendance_requests_info'
    }
    private makeIsAttendResponseUpdateInfo = () => {
        const whereKeys = ['attendance_request_id', 'user_id']
        const whereValues = [this.attendanceRequestId, this.userId]
        const whereOperators: WhereOperator[] = ['AND']

        return this.makeUpdateInfo(
            this.tableName,
            ['is_response', 'is_attendance', 'message'],
            ['true', this.isAttend, this.message],
            whereKeys,
            whereValues,
            whereOperators
        )
    }
    SQLForIsAttendResponse = () => {
        const updateInfo = this.makeIsAttendResponseUpdateInfo()
        return this.outputSQL(updateInfo)
    }
}
