"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WhereClauseMaker_1 = require("~/model/SQL/WhereClauseMaker");
const whereClauseElements = {
    whereKeys: ['a', 'b', 'c'],
    whereValues: ['d', 'e', 'f'],
    whereOperators: ['AND', 'NOT'],
};
const whereClauseMaker = new WhereClauseMaker_1.WhereClauseMaker(whereClauseElements);
const whereClause = whereClauseMaker.createWhereClause();
it('test whereClause', () => {
    expect(whereClause).toBe("WHERE a = 'd' AND b = 'e' NOT c = 'f'");
});
