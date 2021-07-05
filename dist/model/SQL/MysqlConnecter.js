"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlConnecter = void 0;
const mysql = require("mysql2/promise");
const DBConfig_1 = require("~/datas/DBConfig");
class MysqlConnecter {
    constructor() {
        this.returnConnection = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield mysql.createConnection(this.dbConfig);
                return connection;
            }
            catch (e) {
                return false;
            }
        });
        this.dbConfig = DBConfig_1.dbConfig;
    }
}
exports.MysqlConnecter = MysqlConnecter;
