"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMakerForSomething = void 0;
const SQLInfoMaker_1 = require("../../../model/SQL/SQLInfoMaker");
const UpdateMaker_1 = require("../../../model/SQL/Update/UpdateMaker");
class UpdateMakerForSomething {
    constructor() {
        this.makeUpdateInfo = (tableName, updateKeys, updateValues, whereKeys, whereValues, whereOperators) => {
            const updateInfoMaker = new SQLInfoMaker_1.SQLInfoMaker(tableName);
            return updateInfoMaker.makeUpdateInfo(updateKeys, updateValues, whereKeys, whereValues, whereOperators);
        };
        this.outputSQL = (updateInfo) => {
            const updateMaker = new UpdateMaker_1.UpdateMaker(updateInfo);
            return updateMaker.outputSQL();
        };
    }
}
exports.UpdateMakerForSomething = UpdateMakerForSomething;
