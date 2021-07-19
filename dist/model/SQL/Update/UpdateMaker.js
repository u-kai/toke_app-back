"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaker = void 0;
const WhereClauseMaker_1 = require("../../../model/SQL/WhereClauseMaker");
class UpdateMaker {
    constructor(updateInfo) {
        this.createWhereClause = () => {
            const whereClauseMaker = new WhereClauseMaker_1.WhereClauseMaker(this.whereClauseElements);
            return whereClauseMaker.createWhereClause();
        };
        this.createkeyValues = () => {
            const keyValues = this.updateInfo.updateKeys.map((key, i) => {
                return `${key} = '${this.updateInfo.updateValues[i]}'`;
            });
            return keyValues.join(',');
        };
        this.outputSQL = () => {
            return `${this.headSQL} ${this.updateInfo.tableName} SET ${this.createkeyValues()} ${this.createWhereClause()}`;
        };
        this.headSQL = 'UPDATE';
        this.updateInfo = updateInfo;
        this.whereClauseElements = updateInfo.whereClauseElements;
    }
}
exports.UpdateMaker = UpdateMaker;
