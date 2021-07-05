"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getNotRes = require("~/routers/getNotRes");
const login = require("~/routers/login");
const newAttendResponseRegist = require("~/routers/newAttendResponseRegist");
const getMembers = require("~/routers/getMembers");
const newUserRegist = require("~/routers/newUserRegist");
const newEventRegist = require("~/routers/newEventRegist");
const newGroupRegist = require("~/routers/newGroupRegist");
const getGroups = require("~/routers/getGroups");
const changResponse = require("~/routers/changeResponse");
const getResed = require("~/routers/getResed");
const getEvent = require("~/routers/getEvent");
const getPaticipants = require("~/routers/getPaticipants");
const getMyEvents = require("~/routers/getMyEvents");
const getUserName = require("~/routers/getUserName");
const getRequests = require("~/routers/getRequests");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(bodyParser.json());
app.use('/getNotRes', getNotRes.router);
app.use('/getResed', getResed.router);
app.use('/login', login.router);
app.use('/newAttendResponseRegist', newAttendResponseRegist.router);
app.use('/newEventRegist', newEventRegist.router);
app.use('/getMembers', getMembers.router);
app.use('/getGroups', getGroups.router);
app.use('/newUserRegist', newUserRegist.router);
app.use('/newGroupRegist', newGroupRegist.router);
app.use('/changeResponse', changResponse.router);
app.use("/getEvent", getEvent.router);
app.use("/getPaticipants", getPaticipants.router);
app.use("/getMyEvents", getMyEvents.router);
app.use("/getUserName", getUserName.router);
app.use("/getRequests", getRequests.router);
const server = http.createServer(app);
exports.io = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// io.on("connection",(socket:socketIo.Socket)=>{
//     socket.on("responseEvent",(:string)=>{
//         console.log(name)
//         io.emit("chat message",name)
//     })
// })
app.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.json(data);
});
app.get('/', (req, res) => {
    res.json({ data: 'test' });
});
server.listen(8080, () => console.log('start server'));
