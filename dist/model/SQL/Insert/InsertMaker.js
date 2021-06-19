"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertMaker = void 0;
class InsertMaker {
    constructor(insertInfo) {
        this.createKeyValuses = (sqlStatementIndex) => {
            const keys = `(${this.insertInfo.insertKeys.join(',')})`;
            const values = `VALUES(${this.addSingleQuoteForValues(sqlStatementIndex)})`;
            return `${keys} ${values}`;
        };
        this.addSingleQuoteForValues = (sqlStatementIndex) => {
            const addSingleQuoteValues = this.insertInfo.insertValues.map((value, i) => {
                if (sqlStatementIndex === i) {
                    return value;
                }
                return "'" + value + "'";
            });
            return addSingleQuoteValues.join(',');
        };
        this.outputSQL = (sqlStatementIndex) => {
            return `${this.headSQL} ${this.insertInfo.tableName} ${this.createKeyValuses(sqlStatementIndex)}`;
        };
        this.headSQL = 'INSERT INTO';
        this.insertInfo = insertInfo;
    }
}
exports.InsertMaker = InsertMaker;
