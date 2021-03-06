"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
const InsertMakerForNewRequest_1 = require("~/model/SQL/Insert/InsertMakerForNewRequest");
const InsertMakerForRequestMembers_1 = require("~/model/SQL/Insert/InsertMakerForRequestMembers");
exports.router = express.Router();
const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
exports.router.post('/', (req, res) => {
    const purpose = req.body.purpose;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const location = req.body.location;
    const organizer_id = req.body.organizer_id;
    const organizer_name = req.body.organizer_name;
    const describe = req.body.describe;
    const bring = req.body.describe;
    const memberIds = req.body.memberIds;
    const insertMakerForNewRequest = new InsertMakerForNewRequest_1.InsertMakerForNewRequest(purpose, start_date, end_date, location, organizer_id, describe, bring, organizer_name, '13');
    const sqlForNewRequest = insertMakerForNewRequest.SQLForNewRequest();
    const insertMakerForRequestMembers = new InsertMakerForRequestMembers_1.InsertMakerForRequestMembers(memberIds, '13');
    const sqlForRequestMembers = insertMakerForRequestMembers.SQLForRequestMembers();
    console.log(sqlForRequestMembers);
    console.log(sqlForNewRequest);
    mysqlExecuter.multiExecutes([sqlForNewRequest, sqlForRequestMembers]).then((data) => {
        const insertBackendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(data);
        res.json(insertBackendReturnDataMaker.createData());
    });
});
