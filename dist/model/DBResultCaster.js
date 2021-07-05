"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBResultCaster = void 0;
const DBResultChecker_1 = require("./DBResultChecker");
class DBResultCaster extends DBResultChecker_1.DBResultChecker {
    constructor(dbReturn) {
        super();
        this.castSelectResult = () => {
            if (this.isSelectResult(this.dbReturn)) {
                const selectData = this.dbReturn;
                return selectData[0];
            }
            return false;
        };
        this.castError = () => {
            if (this.isErrorResult(this.dbReturn) || this.isEmpty(this.dbReturn)) {
                const errorData = this.dbReturn;
                return errorData;
            }
            return false;
        };
        // castEmpty = () => {
        // }
        this.castOtherResult = () => {
            if (this.isOtherResult(this.dbReturn)) {
                const otherData = this.dbReturn;
                return otherData[0];
            }
            return false;
        };
        this.dbReturn = dbReturn;
    }
}
exports.DBResultCaster = DBResultCaster;
