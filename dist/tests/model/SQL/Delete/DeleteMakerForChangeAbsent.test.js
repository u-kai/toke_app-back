"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteMakerForChangeAbsent_1 = require("model/SQL/Delete/DeleteMakerForChangeAbsent");
const tableName = 'test';
const userId = '1';
const attendance_request_id = '1';
const list = [userId, attendance_request_id];
const forChangeAbsent = new DeleteMakerForChangeAbsent_1.DeleteMakerForChangeAbsent(userId, attendance_request_id);
const sql = forChangeAbsent.SQLForChangeAbsent();
it('delete for change absent', () => {
    expect(sql).toBe("DELETE FROM event_participants WHERE participant_id = '1' AND attendance_request_id = '1'");
});
