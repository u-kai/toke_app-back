"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("model/SQL/MysqlExecuter");
const SelectMaker_1 = require("model/SQL/Select/SelectMaker");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const SelectMakerForSchedule_1 = require("model/SQL/Select/SelectMakerForSchedule");
const DBResultCaster_1 = require("model/DBResultCaster");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/count', (req, res) => {
    const user_id = req.body.user_id;
    const selectMakerForCount = new SelectMakerForSchedule_1.SelectMakerForSchedule(user_id);
    const sql = selectMakerForCount.SQLForAttendanceRequestsCount();
    mysqlExecuter.execute(sql).then((count) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(count);
        res.json(backendReturnDataMaker.createData());
    });
});
exports.router.post('/ids', (req, res) => {
    const user_id = req.body.user_id;
    const selectMakerForIds = new SelectMakerForSchedule_1.SelectMakerForSchedule(user_id);
    const sql = selectMakerForIds.SQLForAttendanceRequestsIds();
    console.log('ids', sql);
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataCaster = new DBResultCaster_1.DBResultCaster(results);
        const errorData = backendReturnDataCaster.castError();
        if (errorData) {
            const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(errorData);
            console.log(backendReturnDataMaker.createData());
            res.json(backendReturnDataMaker.createData());
        }
        const selectData = backendReturnDataCaster.castSelectResult();
        if (selectData) {
            const ids = selectData.map((select) => {
                var _a;
                const id = (_a = select.attendance_request_id) === null || _a === void 0 ? void 0 : _a.toString();
                if (id !== undefined) {
                    return id;
                }
                else {
                    return 'error';
                }
            });
            const selectMakerForInfos = new SelectMakerForSchedule_1.SelectMakerForSchedule(user_id);
            const sql = selectMakerForInfos.SQLForAttendanceRequestsInfos(ids);
            console.log('info', sql);
            mysqlExecuter.execute(sql).then((results) => {
                const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
                res.json(backendReturnDataMaker.createData());
            });
        }
    });
});
exports.router.post('/loop', (req, res) => {
    const selectInfos = req.body;
    let results = [];
    (() => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < req.body.length; i++) {
            const selectMaker = new SelectMaker_1.SelectMaker(selectInfos[i]);
            yield mysqlExecuter.execute(selectMaker.outputSQL()).then((result) => {
                const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(result);
                results = [...results, backendReturnDataMaker.createResults()];
            });
        }
        yield res.json({ status: 200, results: { select: results } });
    }))();
});
