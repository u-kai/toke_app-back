"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlExecuter_1 = require("~/model/SQL/MysqlExecuter");
const DBInfo = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
};
const mysqlConnection = new MysqlExecuter_1.MysqlExecuter();
it('test connection', () => {
    mysqlConnection.execute('select * from test').then((data) => {
        console.log(data);
        expect(data !== null).toBe(true);
    });
});
