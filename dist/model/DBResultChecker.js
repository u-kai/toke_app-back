"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBResultChecker = void 0;
class DBResultChecker {
    constructor() {
        this.isSelectResult = (dbData) => {
            try {
                if (dbData[0].length === undefined) {
                    return false;
                }
            }
            catch (e) {
                console.log(e);
                return false;
            }
            return dbData[0][0] !== undefined && dbData[0].length !== 0;
        };
        this.isSuccessResult = (dbData) => {
            if (this.isSelectResult(dbData)) {
                return dbData[0][0]['success'] !== undefined && dbData[0][0]['success'] === 'success';
            }
            return false;
        };
        this.isEmpty = (dbData) => {
            try {
                return dbData[0].length === 0;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        };
        this.isErrorResult = (dbData) => {
            return (dbData.code !== undefined &&
                dbData.sqlMessage !== undefined &&
                dbData.errno !== undefined &&
                dbData.sqlState !== undefined);
        };
        this.isOtherResult = (dbData) => {
            const otherResutls = dbData[0];
            return (otherResutls.fieldCount !== undefined &&
                otherResutls.affectedRows !== undefined &&
                otherResutls.info !== undefined &&
                otherResutls.insertId !== undefined &&
                otherResutls.serverStatus !== undefined &&
                otherResutls.warningStatus !== undefined &&
                otherResutls.changedRows !== undefined);
        };
    }
}
exports.DBResultChecker = DBResultChecker;
