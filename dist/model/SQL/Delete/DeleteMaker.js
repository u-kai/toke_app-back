"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMaker = void 0;
const WhereClauseMaker_1 = require("model/SQL/WhereClauseMaker");
class DeleteMaker {
    constructor(deleteInfo) {
        this.createWhereClause = () => {
            const whereClauseMaker = new WhereClauseMaker_1.WhereClauseMaker(this.deleteInfo.whereClauseElements);
            return whereClauseMaker.createWhereClause();
        };
        this.outputSQL = () => {
            return `${this.headSQL} ${this.deleteInfo.tableName} ${this.createWhereClause()}`;
        };
        this.headSQL = 'DELETE FROM';
        this.deleteInfo = deleteInfo;
    }
}
exports.DeleteMaker = DeleteMaker;
