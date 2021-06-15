import {UpdateInfo} from "types/DB-types/UpdateInfo"
import {WhereClauseElements} from "types/DB-types/WhereClauseElements"
import {SQLInfoMaker} from "model/SQL/SQLInfoMaker"
import {UpdateMaker} from "model/SQL/Update/UpdateMaker"
import { WhereOperator } from "types/DB-types/WhereOperator"
export class UpdateMakerForSomething {
    tableName:string
    constructor(tableName:string){
        this.tableName = tableName
    }
    makeUpdateInfo = (
        updateKeys: string[],
        updateValues: string[],
        whereKeys:string[],
        whereValues:string[],
        whereOperators:WhereOperator[],
        tableName?: string,
    ) :UpdateInfo => {
        if(!tableName) {
            tableName = this.tableName
        }
        const updateInfoMaker = new SQLInfoMaker(tableName)
        return updateInfoMaker.makeUpdateInfo(updateKeys,updateValues,whereKeys,whereValues,whereOperators)
    }
    outputSQL = (updateInfo:UpdateInfo) => {
        const updateMaker = new UpdateMaker(updateInfo)
        return updateMaker.outputSQL()
    }
}