"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
const SelectMakerForLogin_1 = require("~/model/SQL/Select/SelectMakerForLogin");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const selectMakerForLogin = new SelectMakerForLogin_1.SelectMakerForLogin();
    const sql = selectMakerForLogin.forLogin(userName, password);
    mysqlExecuter.execute(sql).then((data) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
        res.json(backendReturnDataMaker.createData());
    });
});
