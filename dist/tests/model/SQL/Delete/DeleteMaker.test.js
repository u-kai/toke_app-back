"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteMaker_1 = require("~/model/SQL/Delete/DeleteMaker");
const tableName = 'test';
const whereKeys = ['user', 'age'];
const whereValues = ['kai', '25'];
const whereOperators = ['AND'];
const deleteInfo = {
    tableName: tableName,
    whereClauseElements: {
        whereKeys: whereKeys,
        whereValues: whereValues,
        whereOperators: whereOperators,
    },
};
const deleteMaker = new DeleteMaker_1.DeleteMaker(deleteInfo);
const sql = deleteMaker.outputSQL();
it('test outputSQL', () => {
    expect(sql).toBe(`DELETE FROM ${tableName} WHERE user = 'kai' AND age = '25'`);
});
