import {InsertNewAndUpdateSeqSomething} from "model/SQL/InsertNewAndUpdateSeqSomething"



const seqTable = "seq_user_id"
const seqIdName = "seq_user_id"
const insertTableName = "user_login"
const insertKeys = ["name","password","user_id"]
const insertValues = ["kai","kaitest"]
const insertNewTest = new InsertNewAndUpdateSeqSomething(
    seqTable,
    seqIdName,
    insertTableName,
    insertKeys,
    insertValues
)
const sqlForGetCurrentId = `SELECT ${seqIdName} FROM ${seqTable}`
const currentId  = 1
const sqlForUpdateSeq = `UPDATE ${seqTable} SET ${seqIdName} = ${currentId + 1}`
const SQLForInsertNew = `INSERT INTO ${insertTableName} (name,password,user_id) VALUES('kai','kaitest','2')`
it("test select",()=>{
    expect(insertNewTest.SQLForGetCurrentSeqId()).toBe(sqlForGetCurrentId)
})
it("test updateSeq",()=>{
    expect(insertNewTest.SQLForUpdateSeqTable(currentId)).toBe(sqlForUpdateSeq)
})
it("test insert new",()=>{
    expect(insertNewTest.SQLForInsertNew(currentId+1)).toBe(SQLForInsertNew)
})
