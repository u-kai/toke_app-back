import { SelectMaker } from 'model/SQL/Select/SelectMaker'
import { SelectInfo } from 'types/DB-types/SelectInfo'

const selectInfo: SelectInfo = {
    tableName: 'test',
    selectDatas: ['kai', 'udo'],
    whereClaseElements: {
        whereKeys: ['user', 'name', 'age'],
        whereValues: ['kai', 'kai', '25'],
        whereOperators: ['AND', 'AND'],
    },
}
const selectMaker = new SelectMaker(selectInfo)
const sql = selectMaker.outputSQL()
console.log(sql)
it('test selectSQL is ok?', () => {
    expect(sql).toBe("SELECT kai,udo FROM test WHERE user = 'kai' AND name = 'kai' AND age = '25'")
})
