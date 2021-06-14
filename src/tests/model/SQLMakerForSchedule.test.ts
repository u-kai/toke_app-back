import { SQLMakerForSchedule } from "model/SQLMakerForSchedule"


const userId = "0"
const selectInfoMakerForSchedule = new SQLMakerForSchedule(userId)
const sqlForAttendanceRequestsCount = selectInfoMakerForSchedule.forAttendanceRequestsCount()
it("test count sql",()=>{
    expect(sqlForAttendanceRequestsCount).toBe("SELECT count(*) FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'")
})

