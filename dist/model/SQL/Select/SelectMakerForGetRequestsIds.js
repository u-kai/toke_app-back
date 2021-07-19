"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetRequestsIds = void 0;
const SelectMakerForSomething_1 = require("../../../model/SQL/Select/SelectMakerForSomething");
class SelectMakerForGetRequestsIds extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId, isResponse) {
        super('user_attendance_requests_info');
        this.makeSelectInfoForIds = () => {
            return this.makeSelectInfo(['attendance_request_id'], ['user_id', 'is_response'], [this.userId, `${this.isResponse}`], ['AND']);
        };
        this.sql = () => {
            const selectInfo = this.makeSelectInfoForIds();
            return this.outputSQL(selectInfo);
        };
        this.userId = userId;
        this.isResponse = isResponse;
    }
}
exports.SelectMakerForGetRequestsIds = SelectMakerForGetRequestsIds;
