"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetMyEventInfo = void 0;
const SelectMakerForSomething_1 = require("./SelectMakerForSomething");
class SelectMakerForGetMyEventIds extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super('user_attendance_requests_info');
        this.makeSelectInfoForGetMyEventIds = () => {
            return this.makeSelectInfo(["attendance_request_id"], ["user_id"], [this.userId], []);
        };
        this.sql = () => {
            const selectInfo = this.makeSelectInfoForGetMyEventIds();
            return this.outputSQL(selectInfo);
        };
        this.userId = userId;
    }
}
class SelectMakerForGetMyEventInfo extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super("attendance_requests");
        this.factory = () => {
            return new SelectMakerForGetMyEventIds(this.userId);
        };
        this.SQLForGetMyEventInfo = () => {
            return `SELECT * FROM ${this.tableName} WHERE attendance_request_id IN (${this.factory().sql()})`;
        };
        this.userId = userId;
    }
}
exports.SelectMakerForGetMyEventInfo = SelectMakerForGetMyEventInfo;
