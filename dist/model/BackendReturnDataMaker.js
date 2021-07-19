"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendReturnDataMaker = void 0;
const DBResultChecker_1 = require("../model/DBResultChecker");
class BackendReturnDataMaker {
    constructor(dbReturnData) {
        this.caseError = () => {
            return { status: 400, results: { error: this.dbReturnData } };
        };
        this.caseEmpty = () => {
            const emptyError = {
                code: '0',
                sqlMessage: 'データが見つかりませんでした．',
                sqlState: '',
                errno: -1000,
            };
            return { status: 400, results: { error: emptyError } };
        };
        this.caseSelect = () => {
            const selectInfos = this.dbReturnData;
            if (selectInfos.length === 0) {
                return { status: 400, results: { error: { code: '0', sqlState: '0', errno: 0, sqlMessage: 'not fund' } } };
            }
            const results = selectInfos[0];
            return { status: 200, results: { select: results } };
        };
        this.caseSuccess = () => {
            const successInfos = this.dbReturnData;
            const result = successInfos[0];
            return { status: 200, results: { success: result } };
        };
        this.caseOther = () => {
            const otherInfos = this.dbReturnData;
            const results = otherInfos[0];
            if (results.affectedRows === 0) {
                return this.caseEmpty();
            }
            return { status: 200, results: { other: results } };
        };
        this.createData = () => {
            const checker = new DBResultChecker_1.DBResultChecker();
            if (checker.isEmpty(this.dbReturnData)) {
                return this.caseEmpty();
            }
            if (checker.isErrorResult(this.dbReturnData)) {
                return this.caseError();
            }
            if (checker.isSuccessResult(this.dbReturnData)) {
                return this.caseSuccess();
            }
            if (checker.isSelectResult(this.dbReturnData)) {
                return this.caseSelect();
            }
            if (checker.isOtherResult(this.dbReturnData)) {
                return this.caseOther();
            }
        };
        this.createResults = () => {
            const checker = new DBResultChecker_1.DBResultChecker();
            if (checker.isSelectResult(this.dbReturnData)) {
                return this.dbReturnData[0];
            }
            return 'Error';
        };
        this.dbReturnData = dbReturnData;
    }
}
exports.BackendReturnDataMaker = BackendReturnDataMaker;
