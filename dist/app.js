"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const select = require("routers/schedule");
const login = require("routers/login");
const isAttendResponse = require("routers/isAttendResponse");
const newRequest = require("routers/newRequest");
const getMembers = require("routers/getMembers");
const newRegist = require("routers/newRegist");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(bodyParser.json());
const server = app.listen(8080, function () {
    console.log('start server');
});
app.use('/schedule', select.router);
app.use('/login', login.router);
app.use('/isAttendResponse', isAttendResponse.router);
app.use('/newRequest', newRequest.router);
app.use('/getMembers', getMembers.router);
app.use('/newRegist', newRegist.router);
app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.json(data);
});
app.get('/', (req, res) => {
    res.json({ data: 'test' });
});
