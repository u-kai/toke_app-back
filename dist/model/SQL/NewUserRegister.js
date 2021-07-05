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
exports.NewUserRegiser = void 0;
const InsertNewAndUpdateSeqUser_1 = require("model/SQL/InsertNewAndUpdateSeqUser");
const duplicateEntryError_1 = require("datas/errors/duplicateEntryError");
const MysqlExecuter_1 = require("model/SQL/MysqlExecuter");
class NewUserRegiser {
    constructor(userName, password) {
        this.SQLForGetCurrentId = () => {
            return `SELECT ${this.insertNewAndUpdateSeqUser.seqIdName} FROM ${this.insertNewAndUpdateSeqUser.seqTableName}`;
        };
        this.SQLForInsertUserInfo = () => {
            return `INSERT INTO ${this.tableName} (user_id,user_name,image_path) VALUES((${this.SQLForGetCurrentId()}),'${this.userName}','')`;
        };
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.insertNewAndUpdateSeqUser.confirmIsNotExist().then((results) => {
                if (results === false) {
                    return duplicateEntryError_1.duplicateEntryError;
                }
                const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
                const sqls = [
                    this.SQLForInsertUserInfo(),
                    this.insertNewAndUpdateSeqUser.SQLForInsertNew(),
                    this.insertNewAndUpdateSeqUser.SQLForUpdateSeqTable(),
                ];
                console.log('sqls', sqls);
                return mysqlExecuter.multiExecutes(sqls);
            });
        });
        this.userName = userName;
        this.password = password;
        this.tableName = 'users_info';
        this.insertNewAndUpdateSeqUser = new InsertNewAndUpdateSeqUser_1.InsertNewAndUpdateSeqUser([this.userName, this.password]);
    }
}
exports.NewUserRegiser = NewUserRegiser;
