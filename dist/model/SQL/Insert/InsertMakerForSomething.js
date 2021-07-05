"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMakerForSomething = void 0;
const SQLInfoMaker_1 = require("~/model/SQL/SQLInfoMaker");
const InsertMaker_1 = require("~/model/SQL/Insert/InsertMaker");
class InsertMakerForSomething {
    constructor() {
        this.makeInsertInfo = (tableName, insertKeys, insertValues) => {
            const insertInfoMaker = new SQLInfoMaker_1.SQLInfoMaker(tableName);
            return insertInfoMaker.makeInsertInfo(insertKeys, insertValues);
        };
        this.outputSQL = (insertInfo, sqlStatementIndex) => {
            const insertMaker = new InsertMaker_1.InsertMaker(insertInfo);
            return insertMaker.outputSQL(sqlStatementIndex);
        };
    }
}
exports.InsertMakerForSomething = InsertMakerForSomething;
