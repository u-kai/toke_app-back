export class InsertMakerForRequestMembers {
    private memberIds: string[]
    private tableName: string
    private headSQL: string
    constructor(memberIds: string[]) {
        this.tableName = 'user_attendance_requests_info'
        this.memberIds = memberIds
        this.headSQL = 'INSERT INTO'
    }
    createKeys = () => {
        return '(user_id,attendance_request_id,is_attendance,is_response,message)'
    }
    createValues = () => {
        const values = this.memberIds.map((id) => `('${id}',(SELECT seq_event_id FROM seq_event_id),'false','false','')`)
        return values.join(',')
    }
    SQLForRequestMembers = () => {
        return `${this.headSQL} ${this.tableName} ${this.createKeys()} VALUES${this.createValues()}`
    }
}
