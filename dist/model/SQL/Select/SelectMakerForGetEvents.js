"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetEvents = void 0;
const SelectMakerForSomething_1 = require("~/model/SQL/Select/SelectMakerForSomething");
const SelectMakerForGetEventIds_1 = require("~/model/SQL/Select/SelectMakerForGetEventIds");
class SelectMakerForGetEvents extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super('user_attendance_requests_info');
        this.SQLForEventInfos = () => {
            return `SELECT * FROM attendance_requests WHERE attendance_request_id IN (${this.forIds.sql()})`;
        };
        this.forIds = new SelectMakerForGetEventIds_1.SelectMakerForGetEventIds(userId);
    }
}
exports.SelectMakerForGetEvents = SelectMakerForGetEvents;
