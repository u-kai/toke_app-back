"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const BackendReturnDataMaker_1 = require("~/model/BackendReturnDataMaker");
const NewEventRegister_1 = require("~/model/SQL/NewEventRegister");
const DBResultChecker_1 = require("~/model/DBResultChecker");
const app_1 = require("~/app");
exports.router = express.Router();
const dataChecker = new DBResultChecker_1.DBResultChecker();
exports.router.post('/', (req, res) => {
    const purpose = req.body.purpose;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const location = req.body.location;
    const organizer_id = req.body.organizer_id;
    const organizer_name = req.body.organizer_name;
    const describe = req.body.describe;
    const bring = req.body.bring;
    const insertValuesInsufficientId = [
        purpose,
        location,
        start_date,
        end_date,
        describe,
        bring,
        organizer_id,
        organizer_name,
    ];
    const memberIds = req.body.memberIds;
    const newEventRegister = new NewEventRegister_1.NewEventRegister(insertValuesInsufficientId, memberIds);
    newEventRegister.run().then((results) => {
        const backendReturnDataMaker = new BackendReturnDataMaker_1.BackendReturnDataMaker(results);
        app_1.io.emit("event", "success");
        //     io.on("connection",(socket:socketIo.Socket)=>{
        //         console.log("socket")
        //          socket.emit("event","sendSuccess")
        //     // if(dataChecker.isOtherResult(results)){
        //     //     io.on("connection",(socket:socketIo.Socket)=>{
        //     //         console.log("socket")
        //     //         socket.broadcast.emit("event","sendSuccess")
        //  })
        res.json(backendReturnDataMaker.createData());
    });
});
