"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMakerForRequestMembers = void 0;
class InsertMakerForRequestMembers {
    constructor(memberIds, attendanceRequestId) {
        this.createKeys = () => {
            return '(user_id,attendance_request_id,is_attendance,is_response,message)';
        };
        this.createValues = () => {
            const values = this.memberIds.map((id) => `('${id}','${this.attendanceRequestId}','false','false','')`);
            return values.join(',');
        };
        this.SQLForRequestMembers = () => {
            return `${this.headSQL} ${this.tableName} ${this.createKeys()} VALUES${this.createValues()}`;
        };
        this.tableName = 'user_attendance_requests_info';
        this.memberIds = memberIds;
        this.attendanceRequestId = attendanceRequestId;
        this.headSQL = 'INSERT INTO';
    }
}
exports.InsertMakerForRequestMembers = InsertMakerForRequestMembers;
