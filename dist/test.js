"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlExecuter_1 = require("model/MysqlExecuter");
const DBInfo = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
};
let results = '';
const m = new MysqlExecuter_1.MysqlExecuter(DBInfo);
const data = m.execute('select * from test').then((data) => {
    console.log(data);
    results = data;
});
