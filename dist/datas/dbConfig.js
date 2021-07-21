"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    host: 'localhost',
    database: 'toke_app',
};
