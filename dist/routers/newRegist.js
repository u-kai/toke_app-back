"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const InsertNewAndUpdateSeqUser_1 = require("model/SQL/InsertNewAndUpdateSeqUser");
exports.router = express.Router();
exports.router.post('/', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const insertNewAndUpdateSeqUser = new InsertNewAndUpdateSeqUser_1.InsertNewAndUpdateSeqUser([userName, password]);
    insertNewAndUpdateSeqUser.run()
        .then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
