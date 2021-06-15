import {DeleteMaker} from "model/SQL/Delete/DeleteMaker"
import { DeleteInfo } from "types/DB-types/DeleteInfo"
import {WhereOperator} from "types/DB-types/WhereOperator"

const tableName = "test"
const whereKeys = ["user","age"]
const whereValues = ["kai","25"]
const whereOperators:WhereOperator[] = ["AND"]
const deleteInfo:DeleteInfo = {
    tableName:tableName,
    whereClauseElements:{
        whereKeys:whereKeys,
        whereValues:whereValues,
        whereOperators:whereOperators
    }
}
const deleteMaker = new DeleteMaker(deleteInfo)
const sql = deleteMaker.outputSQL()
it("test outputSQL",()=>{
    expect(sql).toBe(`DELETE FROM ${tableName} WHERE user = 'kai' AND age = '25'`)
})