export class InsertMakerForRequestMembers {
    private memberIds: string[]
    private attendanceRequestId: string
    private tableName: string
    private headSQL: string
    constructor(memberIds: string[], attendanceRequestId: string) {
        this.tableName = 'user_attendance_requests_info'
        this.memberIds = memberIds
        this.attendanceRequestId = attendanceRequestId
        this.headSQL = 'INSERT INTO'
    }
    createKeys = () => {
        return '(user_id,attendance_request_id,is_attendance,is_response,message)'
    }
    createValues = () => {
        const values = this.memberIds.map((id) => `('${id}','${this.attendanceRequestId}','false','false','')`)
        return values.join(',')
    }
    SQLForRequestMembers = () => {
        return `${this.headSQL} ${this.tableName} ${this.createKeys()} VALUES${this.createValues()}`
    }
}
