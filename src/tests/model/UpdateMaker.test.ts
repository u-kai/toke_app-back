import { UpdateMaker } from 'model/UpdateMaker'
import { UpdateInfo } from 'type/UpdateInfo'

const updateInfo: UpdateInfo = {
    tableName: 'test',
    updateKeys: ['user', 'age'],
    updateValues: ['u-kai', '18'],
    whereClauseElements: { whereKeys: ['user', 'name'], whereValues: ['kai', 'udo'], whereOperators: ['AND'] },
}

const updateMaker = new UpdateMaker(updateInfo)
const sql = updateMaker.outputSQL()
console.log(sql)
it('test outputSQL is ok?', () => {
    expect(sql).toBe("UPDATE test SET user = 'u-kai', age = '18' WHERE user = `kai` AND name = `udo`")
})
