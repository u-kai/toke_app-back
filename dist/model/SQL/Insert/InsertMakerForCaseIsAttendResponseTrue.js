"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMakerForCaseIsAttendResponseTrue = void 0;
const InsertMakerForSomething_1 = require("model/SQL/Insert/InsertMakerForSomething");
class InsertMakerForCaseIsAttendResponseTrue extends InsertMakerForSomething_1.InsertMakerForSomething {
    constructor(insertValues) {
        super();
        this.makeCaseIsAttendResponseTrue = () => {
            return this.makeInsertInfo(this.tableName, this.insertKeys, this.insertValues);
        };
        this.SQLForCaseIsAttendResponseTrue = () => {
            const insertInfo = this.makeCaseIsAttendResponseTrue();
            return this.outputSQL(insertInfo);
        };
        this.tableName = 'event_participants';
        this.insertKeys = ['participant_id', 'attendance_request_id'];
        this.insertValues = insertValues;
    }
}
exports.InsertMakerForCaseIsAttendResponseTrue = InsertMakerForCaseIsAttendResponseTrue;
