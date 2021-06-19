import { InsertNewAndUpdateSeqSomething } from 'model/SQL/InsertNewAndUpdateSeqSomething'

const seqTable = 'seq_user_id'
const seqIdName = 'seq_user_id'
const insertTableName = 'user_login'
const insertKeys = ['name', 'password', 'user_id']
const insertValues = ['kai', 'kaitest']
const insertNewTest = new InsertNewAndUpdateSeqSomething(seqTable, seqIdName, insertTableName, insertKeys, insertValues)

const currentId = 1
const SQLForConfirmNotExist = `SELECT * FROM user_login WHERE name = 'kai' AND password = 'kaitest'`
const SQLForInsertNew = `INSERT INTO ${insertTableName} (name,password,user_id) VALUES('kai','kaitest',(SELECT ${seqIdName} FROM ${seqTable}))`
const sqlForUpdateSeq = `UPDATE ${seqTable} SET ${seqIdName} = (${seqIdName}+1)`
it('test confirm not exist', () => {
    expect(insertNewTest.SQLForConfirmIsNotExist()).toBe(SQLForConfirmNotExist)
})
// it('test updateSeq', () => {
//     expect(insertNewTest.SQLForUpdateSeqTable(currentId)).toBe(sqlForUpdateSeq)
// })
// it('test insert new', () => {
//     expect(insertNewTest.SQLForInsertNew(currentId + 1)).toBe(SQLForInsertNew)
// })
