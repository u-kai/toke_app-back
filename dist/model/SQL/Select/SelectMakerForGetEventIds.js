"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetEventIds = void 0;
const SelectMakerForSomething_1 = require("model/SQL/Select/SelectMakerForSomething");
class SelectMakerForGetEventIds extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super('user_attendance_requests_info');
        this.makeSelectInfoForIds = () => {
            return this.makeSelectInfo(['attendance_request_id'], ['user_id', "is_attendance"], [this.userId, "true"], ["AND"]);
        };
        this.sql = () => {
            const selectInfo = this.makeSelectInfoForIds();
            return this.outputSQL(selectInfo);
        };
        this.userId = userId;
    }
}
exports.SelectMakerForGetEventIds = SelectMakerForGetEventIds;
