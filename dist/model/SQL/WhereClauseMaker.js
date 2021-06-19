"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereClauseMaker = void 0;
class WhereClauseMaker {
    constructor(whereClauseElements) {
        this.createWhereClause = () => {
            const keyValues = this.whereClauseElements.whereKeys.map((key, i) => {
                return `${key} = '${this.whereClauseElements.whereValues[i]}'${this.ajustWhereOperate(i)}`;
            });
            return this.headSQL + ' ' + keyValues.join('');
        };
        this.ajustWhereOperate = (index) => {
            if (index > this.whereClauseElements.whereOperators.length - 1) {
                return '';
            }
            return ' ' + this.whereClauseElements.whereOperators[index] + ' ';
        };
        this.headSQL = 'WHERE';
        this.whereClauseElements = whereClauseElements;
    }
}
exports.WhereClauseMaker = WhereClauseMaker;
