import { InsertMakerForCaseIsAttendResponseTrue } from 'model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue'
const userId = '0'
const attendanceRequestId = '1'
const list = [userId, attendanceRequestId]
const forCaseIsAttend = new InsertMakerForCaseIsAttendResponseTrue(list)
const sql = forCaseIsAttend.SQLForCaseIsAttendResponseTrue()

it('insert sql test', () => {
    expect(sql).toBe(
        `INSERT INTO event_participants (participant_id,attendance_request_id) VALUES('${userId}','${attendanceRequestId}')`
    )
})
