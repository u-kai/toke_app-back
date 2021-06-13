"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMaker_1 = require("model/SelectMaker");
const selectInfo = {
    tableName: 'test',
    selectDatas: ['kai', 'udo'],
    whereClaseElements: {
        whereKeys: ['user', 'name', 'age'],
        whereValues: ['kai', 'kai', '25'],
        whereOperators: ['AND', 'AND'],
    },
};
const selectMaker = new SelectMaker_1.SelectMaker(selectInfo);
const sql = selectMaker.outputSQL();
console.log(sql);
it('test selectSQL is ok?', () => {
    expect(sql).toBe("SELECT kai,udo FROM test WHERE user = 'kai' AND name = 'kai' AND age = '25'");
});
