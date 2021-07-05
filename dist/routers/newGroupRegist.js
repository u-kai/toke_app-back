"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const BackendReturnDataMaker_1 = require("model/BackendReturnDataMaker");
const NewGroupRegister_1 = require("model/SQL/NewGroupRegister");
exports.router = express.Router();
exports.router.post('/', (req, res) => {
    const memberIds = req.body.memberIds;
    const groupName = req.body.groupName;
    const insertValuesInsufficientId = [groupName];
    const newEventRegister = new NewGroupRegister_1.NewGroupRegister(insertValuesInsufficientId, memberIds);
    newEventRegister.run().then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        res.json(backendReturnDataMaker.createData());
    });
});
