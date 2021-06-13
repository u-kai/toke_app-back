import { SQLError } from 'type/SQLError'
import { SelectResult } from 'type/SelectResult'
import { BackendReturnDataMaker } from 'model/BackEndReturnDataMaker'
const error: SQLError = {
    code: 'error',
    sqlMessage: 'couse error',
    sqlState: 'error state',
    errno: 41999,
}
const selectResult: SelectResult = [
    [
        { user: 'kai', age: 22 },
        { user: 'takashi', age: 33 },
    ],
    [{ fa: 'dfafasffa' }, { fa: 'dfafasffa' }, { fa: 'dfafasffa' }],
]

const backendReturnMakerCaseError = new BackendReturnDataMaker('SELECT', error)
const data = backendReturnMakerCaseError.createData()

it('error case', () => {
    expect(data).toBe(true)
    expect(data).toBe({ status: 400, results: [{ error: error }] })
})
