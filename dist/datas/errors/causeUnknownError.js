"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.causeUnknownError = void 0;
const causeUnknownError = (e) => {
    return {
        code: '1',
        sqlMessage: `エラーが発生しています．管理者に問い合わせください．${e}`,
        sqlState: '',
        errno: -2000,
    };
};
exports.causeUnknownError = causeUnknownError;
