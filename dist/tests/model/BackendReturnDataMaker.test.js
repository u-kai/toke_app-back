"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BackEndReturnDataMaker_1 = require("model/BackEndReturnDataMaker");
const error = {
    code: 'error',
    sqlMessage: 'couse error',
    sqlState: 'error state',
    errno: 41999,
};
const selectResult = [
    [
        { user: 'kai', age: 22 },
        { user: 'takashi', age: 33 },
    ],
    [{ fa: 'dfafasffa' }, { fa: 'dfafasffa' }, { fa: 'dfafasffa' }],
];
const otherResutls = [
    {
        fieldCount: 2,
        affectedRows: 2,
        info: '',
        insertId: 0,
        serverStatus: 2,
        warningStatus: 2,
        changedRows: 2,
    },
];
const emptyError = {
    code: '0',
    sqlMessage: 'データが見つかりませんでした．',
    sqlState: '',
    errno: -1000,
};
const selectResultEmpty = [[], [{}]];
const success = [[{ success: 'success' }]];
const backendReturnMakerCaseError = new BackEndReturnDataMaker_1.BackendReturnDataMaker(error);
const dataCaseError = backendReturnMakerCaseError.createData();
it('error case', () => {
    expect(dataCaseError).toStrictEqual({ status: 400, results: { error: error } });
});
const backendReturnMakerCaseSelect = new BackEndReturnDataMaker_1.BackendReturnDataMaker(selectResult);
const dataCaseSelect = backendReturnMakerCaseSelect.createData();
it('case Select', () => {
    expect(dataCaseSelect).toStrictEqual({ status: 200, results: { select: selectResult[0] } });
});
const backendReturnMakerCaseSelectEmpty = new BackEndReturnDataMaker_1.BackendReturnDataMaker(selectResultEmpty);
const dataCaseSelectEmpty = backendReturnMakerCaseSelectEmpty.createData();
it('case Select', () => {
    expect(dataCaseSelectEmpty).toStrictEqual({ status: 400, results: { error: emptyError } });
});
const backendReturnMakerCaseOther = new BackEndReturnDataMaker_1.BackendReturnDataMaker(otherResutls);
const dataCaseOther = backendReturnMakerCaseOther.createData();
it('case Other', () => {
    expect(dataCaseOther).toStrictEqual({ status: 200, results: { other: otherResutls[0] } });
});
const backendReturnMakerCaseSuccess = new BackEndReturnDataMaker_1.BackendReturnDataMaker(success);
const dataCaseSuccess = backendReturnMakerCaseSuccess.createData();
it('case success', () => {
    expect(dataCaseSuccess).toStrictEqual({ status: 200, results: { success: success[0] } });
});
