"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InsertMaker_1 = require("~/model/InsertMaker");
const insertInfo = {
    tableName: 'test',
    insertKeys: ['user', 'name', 'age'],
    insertValues: ['kai', 'kai', '25'],
    whereClauseElements: {
        whereKeys: ['user', 'name', 'age'],
        whereValues: ['kai', 'kai', '25'],
        whereOperators: ['AND', 'AND'],
    },
};
const insertMaker = new InsertMaker_1.InsertMaker(insertInfo);
const sql = insertMaker.outputSQL();
it('test insertSQL is ok ?', () => {
    expect(sql).toBe("INSERT INTO test (user,name,age) VALUES('kai','kai','25') WHERE user = 'kai' AND name = 'kai' AND age = '25'");
});
