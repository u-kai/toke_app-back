import {BackendReturnDataCast} from "model/BackendReturnDataCast"
import {DBReturn} from "types/backend-return-types/DBReturn"


const dataCaseSelect:DBReturn = [[{
    "user":"kai",
    "age":18
}]]
const dataCast = new BackendReturnDataCast(dataCaseSelect)
const castSelect = dataCast.castSelect()



it("test select cast",()=>{
    if(castSelect && castSelect)
    expect(castSelect).toStrictEqual([{
        "user":"kai",
        "age":18
    }])
})