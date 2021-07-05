"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const SelectMakerForGetEventsByEventIds_1 = require("model/SQL/Select/SelectMakerForGetEventsByEventIds");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const selectMakerForIds = new SelectMakerForGetEventsByEventIds_1.SelectMakerForGetMyEventInfo(userId);
    const sql = `SELECT name from users_login where user_id = ${userId}`;
    console.log("userName", sql);
    mysqlExecuter.execute(sql).then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        console.log("userName", results);
        res.json(backendReturnDataMaker.createData());
    });
});
