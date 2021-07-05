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
exports.InsertNewAndUpdateSeqSomething = void 0;
const InsertMakerForSomething_1 = require("./Insert/InsertMakerForSomething");
const duplicateEntryError_1 = require("datas/errors/duplicateEntryError");
const MysqlConnecter_1 = require("model/SQL/MysqlConnecter");
const DBResultChecker_1 = require("model/DBResultChecker");
const MysqlExecuter_1 = require("./MysqlExecuter");
class InsertNewAndUpdateSeqSomething {
    constructor(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId) {
        this.SQLForConfirmIsNotExist = () => {
            return 'each select statement';
        };
        this.confirmIsNotExist = () => __awaiter(this, void 0, void 0, function* () {
            const mySqlConnecter = new MysqlConnecter_1.MysqlConnecter();
            return mySqlConnecter.returnConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
                if (connection) {
                    const confirmNotExist = yield connection.query(this.SQLForConfirmIsNotExist());
                    const checker = new DBResultChecker_1.DBResultChecker();
                    return checker.isEmpty(confirmNotExist);
                }
                return false;
            }));
        });
        this.SQLForInsertNew = () => {
            const insertMaker = new InsertMakerForSomething_1.InsertMakerForSomething();
            const insertInfo = insertMaker.makeInsertInfo(this.insertTableName, this.insertKeys, this.addIdDataToInsertValues());
            return insertMaker.outputSQL(insertInfo, this.insertKeys.length - 1);
        };
        this.SQLForUpdateSeqTable = () => {
            return `UPDATE ${this.seqTableName} SET ${this.seqIdName} = (${this.seqIdName} + 1)`;
        };
        this.addIdDataToInsertValues = () => {
            return [...this.insertValuesInsufficientId, `(SELECT ${this.seqIdName} FROM ${this.seqTableName})`];
        };
        this.insertNewAndUpdateSeq = () => {
            const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
            return mysqlExecuter.multiExecutes([this.SQLForInsertNew(), this.SQLForUpdateSeqTable()]);
        };
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.confirmIsNotExist().then((results) => {
                if (results === false) {
                    return duplicateEntryError_1.duplicateEntryError;
                }
                return this.insertNewAndUpdateSeq();
            });
        });
        this.seqTableName = seqTableName;
        this.seqIdName = seqIdName;
        this.insertTableName = insertTableName;
        this.insertKeys = insertKeys;
        this.insertValuesInsufficientId = insertValuesInsufficientId;
    }
}
exports.InsertNewAndUpdateSeqSomething = InsertNewAndUpdateSeqSomething;
