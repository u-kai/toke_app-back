"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLInfoMaker = void 0;
class SQLInfoMaker {
    constructor(tableName) {
        this.makeSelectInfo = (selectDatas, whereKeys, whereValues, whereOperators) => {
            return {
                selectDatas: selectDatas,
                tableName: this.tableName,
                whereClaseElements: {
                    whereKeys: whereKeys,
                    whereValues: whereValues,
                    whereOperators: whereOperators,
                },
            };
        };
        this.makeInsertInfo = (insertKeys, insertValues) => {
            return {
                tableName: this.tableName,
                insertKeys: insertKeys,
                insertValues: insertValues,
            };
        };
        this.makeUpdateInfo = (updateKeys, updateValues, whereKeys, whereValues, whereOperators) => {
            return {
                tableName: this.tableName,
                updateKeys: updateKeys,
                updateValues: updateValues,
                whereClauseElements: {
                    whereKeys: whereKeys,
                    whereValues: whereValues,
                    whereOperators: whereOperators,
                },
            };
        };
        this.makeDeleteInfo = (whereKeys, whereValues, whereOperators) => {
            return {
                tableName: this.tableName,
                whereClauseElements: {
                    whereKeys: whereKeys,
                    whereValues: whereValues,
                    whereOperators: whereOperators,
                },
            };
        };
        this.tableName = tableName;
    }
}
exports.SQLInfoMaker = SQLInfoMaker;
