"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForSchedule = void 0;
const SelectMakerForSomething_1 = require("~/model/SQL/Select/SelectMakerForSomething");
class SelectMakerForSchedule extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super('user_attendance_requests_info');
        this.makeSelectInfoForCount = () => {
            return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND']);
        };
        this.SQLForAttendanceRequestsCount = () => {
            const selectInfo = this.makeSelectInfoForCount();
            return this.outputSQL(selectInfo);
        };
        this.makeSelectInfoForIds = () => {
            return this.makeSelectInfo(['attendance_request_id'], ['user_id', 'is_response'], [this.userId, 'false'], ['AND']);
        };
        this.SQLForAttendanceRequestsIds = () => {
            const selectInfo = this.makeSelectInfoForIds();
            return this.outputSQL(selectInfo);
        };
        this.makeSelectInfosForInfos = (ids) => {
            const whereKeys = ids.map((_) => 'attendance_request_id');
            const whereOperators = ids.map((_) => 'OR');
            if (whereOperators.length >= 1) {
                whereOperators.pop();
            }
            return this.makeSelectInfo(['*'], whereKeys, ids, whereOperators, 'attendance_requests');
        };
        this.SQLForAttendanceRequestsInfos = (ids) => {
            const selectInfo = this.makeSelectInfosForInfos(ids);
            return this.outputSQL(selectInfo);
        };
        this.userId = userId;
    }
}
exports.SelectMakerForSchedule = SelectMakerForSchedule;
