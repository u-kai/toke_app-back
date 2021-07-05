"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMaker = void 0;
const WhereClauseMaker_1 = require("~/model/WhereClauseMaker");
class InsertMaker {
    constructor(insertInfo) {
        this.createWhereClause = () => {
            const whereClauseMaker = new WhereClauseMaker_1.WhereClauseMaker(this.insertInfo.whereClauseElements);
            return whereClauseMaker.createWhereClause();
        };
        this.createKeyValuses = () => {
            const keys = `(${this.insertInfo.insertKeys.join(',')})`;
            const values = `VALUES(${this.addSingleQuoteForValues()})`;
            return `${keys} ${values}`;
        };
        this.addSingleQuoteForValues = () => {
            const addSingleQuoteValues = this.insertInfo.insertValues.map((value) => {
                return "'" + value + "'";
            });
            return addSingleQuoteValues.join(',');
        };
        this.outputSQL = () => {
            return `${this.headSQL} ${this.insertInfo.tableName} ${this.createKeyValuses()} ${this.createWhereClause()}`;
        };
        this.headSQL = 'INSERT INTO';
        this.insertInfo = insertInfo;
    }
}
exports.InsertMaker = InsertMaker;
