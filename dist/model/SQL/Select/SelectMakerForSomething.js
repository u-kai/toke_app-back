"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForSomething = void 0;
const SQLInfoMaker_1 = require("../../../model/SQL/SQLInfoMaker");
const SelectMaker_1 = require("../../../model/SQL/Select/SelectMaker");
class SelectMakerForSomething {
    constructor(tableName) {
        this.makeSelectInfo = (selectDatas, whereKeys, whereValues, whereOperators, tableName) => {
            if (!tableName) {
                tableName = this.tableName;
            }
            const selectInfoMaker = new SQLInfoMaker_1.SQLInfoMaker(tableName);
            return selectInfoMaker.makeSelectInfo(selectDatas, whereKeys, whereValues, whereOperators);
        };
        this.outputSQL = (selectInfo) => {
            const selectMaker = new SelectMaker_1.SelectMaker(selectInfo);
            return selectMaker.outputSQL();
        };
        this.tableName = tableName;
    }
}
exports.SelectMakerForSomething = SelectMakerForSomething;
