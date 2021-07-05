"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetRequestsCount = void 0;
const SelectMakerForSomething_1 = require("model/SQL/Select/SelectMakerForSomething");
class SelectMakerForGetRequestsCount extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId, isResponse) {
        super('user_attendance_requests_info');
        this.makeSelectInfoForCount = () => {
            return this.makeSelectInfo(['count(*)'], ['user_id', 'is_response'], [this.userId, `${this.isResponse}`], ['AND']);
        };
        this.sql = () => {
            const selectInfo = this.makeSelectInfoForCount();
            return this.outputSQL(selectInfo);
        };
        this.userId = userId;
        this.isResponse = isResponse;
    }
}
exports.SelectMakerForGetRequestsCount = SelectMakerForGetRequestsCount;
