import { InsertNewAndUpdateSeqUser } from '~/model/SQL/InsertNewAndUpdateSeqUser'

const seqTable = 'seq_user_id'
const seqIdName = 'seq_user_id'
const insertTableName = 'users_login'
const insertKeys = ['name', 'password', 'user_id']
const insertValues = ['kai', 'kaitest']
const insertNewTest = new InsertNewAndUpdateSeqUser(insertValues)

const currentId = 1
const SQLForConfirmNotExist = `SELECT * FROM users_login WHERE name = 'kai' AND password = 'kaitest'`
const SQLForInsertNew = `INSERT INTO ${insertTableName} (name,password,user_id) VALUES('kai','kaitest',(SELECT ${seqIdName} FROM ${seqTable}))`
const sqlForUpdateSeq = `UPDATE ${seqTable} SET ${seqIdName} = (${seqIdName} + 1)`
it('test confirm not exist', () => {
    expect(insertNewTest.SQLForConfirmIsNotExist()).toBe(SQLForConfirmNotExist)
})
it('test insert new', () => {
    expect(insertNewTest.SQLForInsertNew()).toBe(SQLForInsertNew)
})
it('test updateSeq', () => {
    expect(insertNewTest.SQLForUpdateSeqTable()).toBe(sqlForUpdateSeq)
})
