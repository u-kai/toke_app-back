"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetRequests = void 0;
const SelectMakerForSomething_1 = require("model/SQL/Select/SelectMakerForSomething");
const SelectMakerForGetRequestsCount_1 = require("model/SQL/Select/SelectMakerForGetRequestsCount");
const SelectMakerForGetRequestsIds_1 = require("model/SQL/Select/SelectMakerForGetRequestsIds");
class SelectMakerForGetRequests extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId, isResponse) {
        super('user_attendance_requests_info');
        this.SQLForAttendanceRequestsCount = () => {
            return this.forCount.sql();
        };
        this.SQLForAttendanceRequestsInfos = () => {
            return `SELECT * FROM attendance_requests WHERE attendance_request_id IN (${this.forIds.sql()})`;
        };
        this.forCount = new SelectMakerForGetRequestsCount_1.SelectMakerForGetRequestsCount(userId, isResponse);
        this.forIds = new SelectMakerForGetRequestsIds_1.SelectMakerForGetRequestsIds(userId, isResponse);
    }
}
exports.SelectMakerForGetRequests = SelectMakerForGetRequests;
