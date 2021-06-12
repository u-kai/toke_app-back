"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlExecuter_1 = require("model/MysqlExecuter");
const DBInfo = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
};
const m = new MysqlExecuter_1.MysqlExecuter(DBInfo);
m.execute('select * from test');
