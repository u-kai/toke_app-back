import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForIsAttendResponse'

const tableName = 'test'
const userId = '1'
const attendance_request_id = '1'
const isAttend = 'true'
const messge = 'this is test'

const forIsAttendResponse = new UpdateMakerForIsAttendResponse(userId, attendance_request_id, isAttend, messge)
const sql = forIsAttendResponse.SQLForIsAttendResponse()

it('response update test', () => {
    expect(sql).toBe(
        "UPDATE test SET is_response = 'true',is_attendance = 'true',message = 'this is test' WHERE attendance_request_id = '1' AND user_id = '1'"
    )
})
