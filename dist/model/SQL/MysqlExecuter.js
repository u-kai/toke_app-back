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
exports.MysqlExecuter = void 0;
const causeUnknownError_1 = require("~/datas/errors/causeUnknownError");
const createConnectionError_1 = require("~/datas/errors/createConnectionError");
const mysql = require("mysql2/promise");
const MysqlConnecter_1 = require("~/model/SQL/MysqlConnecter");
const dbConfig_1 = require("~/datas/dbConfig");
class MysqlExecuter {
    constructor() {
        this.execute = (sql) => __awaiter(this, void 0, void 0, function* () {
            let results;
            //     return this.connetion.then(async(connetion:mysql.Connection|false)=>{
            //         if(connetion){
            //             console.log("clear1")
            //             const results:DBReturn = await connetion.query(sql)
            //             .then((data)=>{
            //                 return data as DBReturn
            //             })
            //             .catch((e)=>{
            //                 return e as SQLError
            //             })
            //             console.log("clear2")
            //             await connetion.end()
            //             return results
            //         }
            //         return createConnectionError
            //     })
            // }
            try {
                const connection = yield mysql.createConnection(this.dbConfig);
                results = yield connection.query(sql);
                connection.end();
            }
            catch (e) {
                results = e;
                console.log(e);
                return e;
            }
            return results;
        });
        this.multiExecutes = (sqls) => __awaiter(this, void 0, void 0, function* () {
            const results = [[{ success: 'success' }]];
            let connection;
            try {
                connection = yield mysql.createConnection(this.dbConfig);
            }
            catch (e) {
                console.log('connection error', e);
                return createConnectionError_1.createConnectionError;
            }
            connection.beginTransaction();
            try {
                for (const i in sqls) {
                    yield connection.query(sqls[i]);
                    console.log('clear', i);
                }
                console.log('all success1');
                yield connection.commit();
                console.log('all success2');
                yield connection.end();
                return results;
            }
            catch (e) {
                console.log('rollback', e);
                yield connection.rollback();
                yield connection.end();
                return causeUnknownError_1.causeUnknownError(e);
            }
        });
        this.dbConfig = dbConfig_1.dbConfig;
        const connecter = new MysqlConnecter_1.MysqlConnecter();
        this.connetion = connecter.returnConnection();
    }
}
exports.MysqlExecuter = MysqlExecuter;
