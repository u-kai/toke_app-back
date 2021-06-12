import {SelectMaker} from "model/SelectMaker"
import {SelectInfo} from "type/SelectInfo"

const selectInfo:SelectInfo = {
    tableName:"test",
    whereKeys:["user","name","age"],
    whereValues:["kai","kai","25"],
    whereOperators:["AND","AND"]
}
const selectMaker = new SelectMaker(selectInfo)
const sql = selectMaker.outputSQL()
console.log(sql)
it("test selectSQL is ok?",()=>{
    expect(sql).toBe("SELECT * FROM test WHERE user = 'kai' AND name = 'kai' AND age = '25'")
})