"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
const UpdateMakerForisAttendResponse_1 = require("~/model/SQL/Update/UpdateMakerForisAttendResponse");
const InsertMakerForCaseIsAttendResponseTrue_1 = require("~/model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue");
const DBResultCaster_1 = require("~/model/DBResultCaster");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const attendanceRequestId = req.body.attendanceRequestId;
    const isAttend = req.body.isAttend;
    const message = req.body.message;
    const selectMakerForLogin = new UpdateMakerForisAttendResponse_1.UpdateMakerForIsAttendResponse(userId, attendanceRequestId, isAttend, message);
    const sql = selectMakerForLogin.SQLForIsAttendResponse();
    mysqlExecuter.execute(sql).then((data) => {
        const updateBackendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
        const updateResponseData = updateBackendReturnDataMaker.createData();
        if (isAttend === 'true') {
            const caseIsAttend = new InsertMakerForCaseIsAttendResponseTrue_1.InsertMakerForCaseIsAttendResponseTrue([userId, attendanceRequestId]);
            const caseIsAttendSQL = caseIsAttend.SQLForCaseIsAttendResponseTrue();
            mysqlExecuter.execute(caseIsAttendSQL).then((data) => {
                const caster = new DBResultCaster_1.DBResultCaster(data);
                const insertBackendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
                const insertResponseData = insertBackendReturnDataMaker.createData();
                if ((insertResponseData === null || insertResponseData === void 0 ? void 0 : insertResponseData.status) === 400) {
                    res.json(insertResponseData);
                }
                else {
                    res.json(updateResponseData);
                }
            });
        }
        else {
            res.json(updateResponseData);
        }
    });
});
