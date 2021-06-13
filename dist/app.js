"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const select = require("routers/select");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());
var server = app.listen(8080, function () {
    console.log("start server");
});
app.use("/select", select.router);
app.post("/", (req, res) => {
    const data = req.body;
    console.log(data);
    res.json(data);
});
app.get("/", (req, res) => {
    res.json({ "data": "test" });
});
