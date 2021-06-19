"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMakerForNewRequest = void 0;
const InsertMakerForSomething_1 = require("model/SQL/Insert/InsertMakerForSomething");
class InsertMakerForNewRequest extends InsertMakerForSomething_1.InsertMakerForSomething {
    constructor(purpose, start_date, end_date, location, organizer_id, describes, brings, organizer_name, attendanceRequestId) {
        super();
        this.makeForNewRequest = () => {
            return this.makeInsertInfo(this.tableName, this.insertKeys, this.insertValuse);
        };
        this.SQLForNewRequest = () => {
            const insertInfo = this.makeForNewRequest();
            return this.outputSQL(insertInfo);
        };
        this.tableName = 'attendance_requests';
        this.insertKeys = [
            'attendance_request_id',
            'purpose',
            'start_date',
            'end_date',
            'location',
            'organizer_id',
            'describes',
            'bring',
            'organizer_name',
        ];
        this.insertValuse = [
            attendanceRequestId,
            purpose,
            start_date,
            end_date,
            location,
            organizer_id,
            describes,
            brings,
            organizer_name,
        ];
    }
}
exports.InsertMakerForNewRequest = InsertMakerForNewRequest;
