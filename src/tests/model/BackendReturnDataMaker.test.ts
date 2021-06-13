import { SQLError } from 'type/SQLError'
import { BackendSelectResult, SelectResult } from 'type/SelectResult'
import { BackendReturnDataMaker } from 'model/BackEndReturnDataMaker'
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

const backendReturnMakerCaseError = new BackendReturnDataMaker(error)
const dataCaseError = backendReturnMakerCaseError.createData()

it('error case', () => {
    expect(dataCaseError).toStrictEqual({ status: 400, results: { error: error } })
})
const backendReturnMakerCaseSelect = new BackendReturnDataMaker(selectResult)
const dataCaseSelect = backendReturnMakerCaseSelect.createData()
it("case Select",()=>{
    expect(dataCaseSelect).toStrictEqual({ status: 200, results: { select :selectResult[0] } })
})