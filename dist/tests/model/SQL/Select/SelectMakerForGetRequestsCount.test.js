"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMakerForGetRequestsCount_1 = require("~/model/SQL/Select/SelectMakerForGetRequestsCount");
const userId = '0';
const res = false;
const selectMakerForNotResCount = new SelectMakerForGetRequestsCount_1.SelectMakerForGetRequestsCount(userId, res);
const sqlForNotResCount = selectMakerForNotResCount.sql();
it('test count sql', () => {
    expect(sqlForNotResCount).toBe("SELECT count(*) FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'");
});
