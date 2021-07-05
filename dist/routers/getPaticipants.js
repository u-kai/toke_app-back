"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const attendanceRequestId = req.body.attendanceRequestId;
    // const selectMakerForEvents = new SelectMakerForGetEvents(userId)
    // const sql = selectMakerForEvents.SQLForEventInfos()
    const sql = `select user_name from users_info where user_id IN (select participant_id from event_participants where attendance_request_id = ${attendanceRequestId})`;
    console.log('ids', sql);
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
