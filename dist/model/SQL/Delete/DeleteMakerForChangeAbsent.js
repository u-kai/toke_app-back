"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMakerForChangeAbsent = void 0;
const DeleteMakerForSomething_1 = require("~/model/SQL/Delete/DeleteMakerForSomething");
class DeleteMakerForChangeAbsent extends DeleteMakerForSomething_1.DeleteMakerForSomething {
    constructor(userId, attendanceRequestId) {
        super();
        this.makeChangeAbsentDeleteInfo = () => {
            const whereKeys = ['participant_id', 'attendance_request_id'];
            const whereValues = [this.userId, this.attendanceRequestId];
            const whereOperators = ['AND'];
            return this.makeDeleteInfo(this.tableName, whereKeys, whereValues, whereOperators);
        };
        this.SQLForChangeAbsent = () => {
            const deleteInfo = this.makeChangeAbsentDeleteInfo();
            return this.outputSQL(deleteInfo);
        };
        this.userId = userId;
        this.attendanceRequestId = attendanceRequestId;
        this.tableName = 'event_participants';
    }
}
exports.DeleteMakerForChangeAbsent = DeleteMakerForChangeAbsent;
