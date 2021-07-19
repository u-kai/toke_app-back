"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("../model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("../model/BackendReturnDataMaker");
const SelectMakerForGetGroups_1 = require("../model/SQL/Select/SelectMakerForGetGroups");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userId = req.body.userId;
    const selectMaker = new SelectMakerForGetGroups_1.SelectMakerForGetGroups(userId);
    const sql = selectMaker.SQLForGetGroups();
    console.log('getGroups', sql);
    mysqlExecuter.execute(sql).then((data) => {
        const selectBackendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
        const selectResponseData = selectBackendReturnDataMaker.createData();
        res.json(selectResponseData);
    });
});
