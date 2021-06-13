import { SQLError } from 'type/SQLError'
import { BackendSelectResult, SelectResult } from 'type/SelectResult'
import { BackendReturnDataMaker } from 'model/BackEndReturnDataMaker'
import { BackendInsertUpdateDeleteResult } from 'type/InsertUpdateDeleteResult'
const error: SQLError = {
    code: 'error',
    sqlMessage: 'couse error',
    sqlState: 'error state',
    errno: 41999,
}
const selectResult: BackendSelectResult = [
    [
        { user: 'kai', age: 22 },
        { user: 'takashi', age: 33 },
    ],
    [{ fa: 'dfafasffa' }, { fa: 'dfafasffa' }, { fa: 'dfafasffa' }],
]
const otherResutls: BackendInsertUpdateDeleteResult = [
    {
        fieldCount: 2,
        affectedRows: 2,
        info: '',
        insertId: 0,
        serverStatus: 2,
        warningStatus: 2,
        changedRows: 2,
    },
]

const backendReturnMakerCaseError = new BackendReturnDataMaker(error)
const dataCaseError = backendReturnMakerCaseError.createData()

it('error case', () => {
    expect(dataCaseError).toStrictEqual({ status: 400, results: { error: error } })
})
const backendReturnMakerCaseSelect = new BackendReturnDataMaker(selectResult)
const dataCaseSelect = backendReturnMakerCaseSelect.createData()
it('case Select', () => {
    expect(dataCaseSelect).toStrictEqual({ status: 200, results: { select: selectResult[0] } })
})

const backendReturnMakerCaseOther = new BackendReturnDataMaker(otherResutls)
const dataCaseOther = backendReturnMakerCaseOther.createData()
it('case Other', () => {
    expect(dataCaseOther).toStrictEqual({ status: 200, results: { other: otherResutls[0] } })
})
