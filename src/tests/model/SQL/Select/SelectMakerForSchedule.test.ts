import { SelectMakerForSchedule } from 'model/SQL/Select/SelectMakerForSchedule'

const userId = '0'
const selectInfoMakerForSchedule = new SelectMakerForSchedule(userId)
const sqlForNotResCount = selectInfoMakerForSchedule.SQLForAttendanceRequestsCount()
it('test count sql', () => {
    expect(sqlForNotResCount).toBe(
        "SELECT count(*) FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'"
    )
})

const sqlForNotResIds = selectInfoMakerForSchedule.SQLForAttendanceRequestsIds()
it('test info ids sql', () => {
    expect(sqlForNotResIds).toBe(
        "SELECT attendance_request_id FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'"
    )
})

const sqlForNotResInfos = selectInfoMakerForSchedule.SQLForAttendanceRequestsInfos(['1', '2'])
it('test info infos sql', () => {
    expect(sqlForNotResInfos).toBe(
        "SELECT * FROM attendance_requests WHERE attendance_request_id = '1' OR attendance_request_id = '2'"
    )
})
