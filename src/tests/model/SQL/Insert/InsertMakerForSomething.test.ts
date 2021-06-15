import { InsertMakerForSomething } from 'model/SQL/Insert/InsertMakerForSomething'

const tableName = 'test'
const insertKeys = ['user', 'age']
const insertValues = ['kai', '25']
// const whereKeys = ["user","age"]
// const whereValues = ["udo","18"]
// const whereOperators = ["AND"]

const insertMaker = new InsertMakerForSomething()
const insertInfo = insertMaker.makeInsertInfo(tableName, insertKeys, insertValues)
it('test insert maker info', () => {
    expect(insertInfo).toStrictEqual({
        tableName: tableName,
        insertKeys: insertKeys,
        insertValues: insertValues,
    })
})

const sql = insertMaker.outputSQL(insertInfo)
it('test sql insert', () => {
    expect(sql).toStrictEqual("INSERT INTO test (user,age) VALUES('kai','25')")
})
