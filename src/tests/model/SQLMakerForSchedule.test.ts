import { SQLMakerForSchedule } from "model/SQLMakerForSchedule"


const userId = "0"
const selectInfoMakerForSchedule = new SQLMakerForSchedule(userId)
const sqlForAttendanceRequestsCount = selectInfoMakerForSchedule.SQLForAttendanceRequestsCount()
it("test count sql",()=>{
    expect(sqlForAttendanceRequestsCount).toBe("SELECT count(*) FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'")
})


const sqlForAttendanceRequestIds = selectInfoMakerForSchedule.SQLForAttendanceRequestsIds()
it("test info ids sql",()=>{
    expect(sqlForAttendanceRequestIds).toBe("SELECT attendance_request_id FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'")
})

