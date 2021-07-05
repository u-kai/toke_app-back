"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const SelectMakerForGetEvents_1 = require("model/SQL/Select/SelectMakerForGetEvents");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const selectMakerForEvents = new SelectMakerForGetEvents_1.SelectMakerForGetEvents(userId);
    const sql = selectMakerForEvents.SQLForEventInfos();
    console.log('ids', sql);
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
