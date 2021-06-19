"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMaker = void 0;
const WhereClauseMaker_1 = require("model/SQL/WhereClauseMaker");
class SelectMaker {
    constructor(selectInfo) {
        this.expandSelectDatas = () => {
            return this.selectInfo.selectDatas.join(',');
        };
        this.createWhereClause = () => {
            const whereClauseMaker = new WhereClauseMaker_1.WhereClauseMaker(this.selectInfo.whereClaseElements);
            return whereClauseMaker.createWhereClause();
        };
        this.outputSQL = () => {
            return `${this.headSql} ${this.expandSelectDatas()} FROM ${this.selectInfo.tableName} ${this.createWhereClause()}`;
        };
        this.headSql = 'SELECT';
        if (selectInfo.selectDatas) {
            this.selectInfo = selectInfo;
            return;
        }
        selectInfo.selectDatas = ['*'];
        this.selectInfo = selectInfo;
    }
}
exports.SelectMaker = SelectMaker;
