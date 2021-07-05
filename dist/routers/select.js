"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const dbConfig_1 = require("~/datas/dbConfig");
const MysqlExecuter_1 = require("~/model/MysqlExecuter");
const SelectMaker_1 = require("~/model/SelectMaker");
exports.router = express.Router();
exports.router.post("/", (req, res) => {
    const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter(dbConfig_1.dbConfig);
    const selectMaker = new SelectMaker_1.SelectMaker(req.body);
    console.log(req.body.json());
    mysqlExecuter.execute(selectMaker.outputSQL())
        .then((data) => {
        console.log(data);
        res.json(data);
    });
});
