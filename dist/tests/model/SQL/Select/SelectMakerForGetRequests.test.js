"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMakerForGetRequests_1 = require("model/SQL/Select/SelectMakerForGetRequests");
const userId = '0';
const res = false;
const selectInfoMakerForSchedule = new SelectMakerForGetRequests_1.SelectMakerForGetRequests(userId, res);
const sqlForNotResCount = selectInfoMakerForSchedule.SQLForAttendanceRequestsCount();
it('test count sql', () => {
    expect(sqlForNotResCount).toBe("SELECT count(*) FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'");
});
const sqlForNotResInfos = selectInfoMakerForSchedule.SQLForAttendanceRequestsInfos();
it('test info infos sql', () => {
    expect(sqlForNotResInfos).toBe("SELECT * FROM attendance_requests WHERE attendance_request_id IN (SELECT attendance_request_id FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false')");
});
