"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
const UpdateMakerForisAttendResponse_1 = require("~/model/SQL/Update/UpdateMakerForisAttendResponse");
const InsertMakerForCaseIsAttendResponseTrue_1 = require("~/model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const attendanceRequestId = req.body.attendanceRequestId;
    const isAttend = req.body.isAttend;
    const message = req.body.message;
    const updateMakerForIsAttendResponse = new UpdateMakerForisAttendResponse_1.UpdateMakerForIsAttendResponse(userId, attendanceRequestId, isAttend, message);
    const updateIsAttendResponseSql = updateMakerForIsAttendResponse.SQLForIsAttendResponse();
    if (isAttend === 'true') {
        const insertMakerForCaseIsAttendResponseTrue = new InsertMakerForCaseIsAttendResponseTrue_1.InsertMakerForCaseIsAttendResponseTrue([
            userId,
            attendanceRequestId,
        ]);
        const insertCaseIsAttendTrueSql = insertMakerForCaseIsAttendResponseTrue.SQLForCaseIsAttendResponseTrue();
        const sqls = [updateIsAttendResponseSql, insertCaseIsAttendTrueSql];
        mysqlExecuter.multiExecutes(sqls).then((data) => {
            const insertAndBackendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
            const responseData = insertAndBackendReturnDataMaker.createData();
            res.json(responseData);
        });
    }
    if (isAttend === 'false') {
        console.log('isattned', updateIsAttendResponseSql);
        mysqlExecuter.execute(updateIsAttendResponseSql).then((data) => {
            const onlyUpdateDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
            const responseData = onlyUpdateDataMaker.createData();
            console.log("change", responseData);
            res.json(responseData);
        });
    }
});
