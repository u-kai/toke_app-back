import { InsertMakerForSomething } from '../../../model/SQL/Insert/InsertMakerForSomething'

export class InsertMakerForNewRequest extends InsertMakerForSomething {
    private tableName: string
    private insertKeys: string[]
    private insertValuse: string[]
    constructor(
        purpose: string,
        start_date: string,
        end_date: string,
        location: string,
        organizer_id: string,
        describes: string,
        brings: string,
        organizer_name: string,
        attendanceRequestId: string
    ) {
        super()
        this.tableName = 'attendance_requests'
        this.insertKeys = [
            'attendance_request_id',
            'purpose',
            'start_date',
            'end_date',
            'location',
            'organizer_id',
            'describes',
            'bring',
            'organizer_name',
        ]
        this.insertValuse = [
            attendanceRequestId,
            purpose,
            start_date,
            end_date,
            location,
            organizer_id,
            describes,
            brings,
            organizer_name,
        ]
    }
    private makeForNewRequest = () => {
        return this.makeInsertInfo(this.tableName, this.insertKeys, this.insertValuse)
    }
    SQLForNewRequest = () => {
        const insertInfo = this.makeForNewRequest()
        return this.outputSQL(insertInfo)
    }
}
