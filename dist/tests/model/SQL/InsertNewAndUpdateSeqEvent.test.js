"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InsertNewAndUpdateSeqEvent_1 = require("~/model/SQL/InsertNewAndUpdateSeqEvent");
const seqTableName = 'seq_event_id';
const seqIdName = 'seq_event_id';
const insertTableName = 'attendance_requests';
const insertValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const insertNewTest = new InsertNewAndUpdateSeqEvent_1.InsertNewAndUpdateSeqEvent(insertValues);
const currentId = 1;
const SQLForConfirmNotExist = `SELECT * FROM users_login WHERE name = 'kai' AND password = 'kaitest'`;
const SQLForInsertNew = `INSERT INTO ${insertTableName} (name,password,user_id) VALUES('kai','kaitest',(SELECT ${seqIdName} FROM ${seqTableName}))`;
const sqlForUpdateSeq = `UPDATE ${seqTableName} SET ${seqIdName} = (${seqIdName} + 1)`;
it('test confirm not exist', () => {
    expect(insertNewTest.SQLForConfirmIsNotExist()).toBe(SQLForConfirmNotExist);
});
it('test insert new', () => {
    expect(insertNewTest.SQLForInsertNew()).toBe(SQLForInsertNew);
});
it('test updateSeq', () => {
    expect(insertNewTest.SQLForUpdateSeqTable()).toBe(sqlForUpdateSeq);
});
