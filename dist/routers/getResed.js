"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const SelectMakerForGetRequests_1 = require("model/SQL/Select/SelectMakerForGetRequests");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
const isResponse = true;
exports.router.post('/count', (req, res) => {
    const userId = req.body.userId;
    const selectMakerForCount = new SelectMakerForGetRequests_1.SelectMakerForGetRequests(userId, isResponse);
    const sql = selectMakerForCount.SQLForAttendanceRequestsCount();
    console.log('count', sql);
    mysqlExecuter.execute(sql).then((count) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(count);
        res.json(backendReturnDataMaker.createData());
    });
});
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const selectMakerForIds = new SelectMakerForGetRequests_1.SelectMakerForGetRequests(userId, isResponse);
    const sql = selectMakerForIds.SQLForAttendanceRequestsInfos();
    console.log('ids', sql);
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
exports.router.post("/responseInfo", (req, res) => {
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const sql = `SELECT message,is_attendance FROM user_attendance_requests_info WHERE user_id = ${userId} AND attendance_request_id = ${eventId}`;
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
