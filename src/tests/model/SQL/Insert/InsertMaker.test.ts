import { InsertMaker } from '~/model/SQL/Insert/InsertMaker'
import { InsertInfo } from '~/types/DB-types/InsertInfo'

const insertInfo: InsertInfo = {
    tableName: 'test',
    insertKeys: ['user', 'name', 'age'],
    insertValues: ['kai', 'kai', '25'],
}

const insertMaker = new InsertMaker(insertInfo)
const sql = insertMaker.outputSQL()
it('test insertSQL is ok ?', () => {
    expect(sql).toBe(
        "INSERT INTO test (user,name,age) VALUES('kai','kai','25') WHERE user = 'kai' AND name = 'kai' AND age = '25'"
    )
})
