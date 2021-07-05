"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMakerForIsAttendResponse = void 0;
const UpdateMakerForSomething_1 = require("~/model/SQL/Update/UpdateMakerForSomething");
class UpdateMakerForIsAttendResponse extends UpdateMakerForSomething_1.UpdateMakerForSomething {
    constructor(userId, attendanceRequestId, isAttend, message) {
        super();
        this.makeIsAttendResponseUpdateInfo = () => {
            const whereKeys = ['attendance_request_id', 'user_id'];
            const whereValues = [this.attendanceRequestId, this.userId];
            const whereOperators = ['AND'];
            return this.makeUpdateInfo(this.tableName, ['is_response', 'is_attendance', 'message'], ['true', this.isAttend, this.message], whereKeys, whereValues, whereOperators);
        };
        this.SQLForIsAttendResponse = () => {
            const updateInfo = this.makeIsAttendResponseUpdateInfo();
            return this.outputSQL(updateInfo);
        };
        this.userId = userId;
        this.attendanceRequestId = attendanceRequestId;
        this.isAttend = isAttend;
        this.message = message;
        this.tableName = 'user_attendance_requests_info';
    }
}
exports.UpdateMakerForIsAttendResponse = UpdateMakerForIsAttendResponse;
