"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMakerForSomething = void 0;
const DeleteMaker_1 = require("../../../model/SQL/Delete/DeleteMaker");
const SQLInfoMaker_1 = require("../../../model/SQL/SQLInfoMaker");
class DeleteMakerForSomething {
    constructor() {
        this.makeDeleteInfo = (tableName, whereKeys, whereValues, whereOperators) => {
            const deleteInfoMaker = new SQLInfoMaker_1.SQLInfoMaker(tableName);
            return deleteInfoMaker.makeDeleteInfo(whereKeys, whereValues, whereOperators);
        };
        this.outputSQL = (deleteInfo) => {
            const deleteMaker = new DeleteMaker_1.DeleteMaker(deleteInfo);
            return deleteMaker.outputSQL();
        };
    }
}
exports.DeleteMakerForSomething = DeleteMakerForSomething;
