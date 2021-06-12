import {SelectInfo} from "type/SelectInfo"
export class SelectMaker{
    private headSql:string
    private selectInfo:SelectInfo
    constructor(selectInfo:SelectInfo){
        this.headSql = "SELECT"
        if(selectInfo.selectDatas){
            this.selectInfo = selectInfo
            return
        }
        selectInfo.selectDatas = ["*"]
        this.selectInfo = selectInfo
    }
    private expandSelectDatas = ():string => {
        return this.selectInfo.selectDatas!.join(",")
    }
    private createWhereClause = ():string => {
        const keyValues = this.selectInfo.whereKeys.map((key,i)=>{
            return `${key} = '${this.selectInfo.whereValues[i]}'${this.ajustWhereOperate(i)}`
        })
        return "WHERE " + keyValues.join("")
    }
    private ajustWhereOperate = (index:number):string => {
        if(index > this.selectInfo.whereOperators.length - 1){
            return ""
        }
        return " " + this.selectInfo.whereOperators[index] + " "

    }
    outputSQL = () => {
        return `${this.headSql} ${this.expandSelectDatas()} FROM ${this.selectInfo.tableName} ${this.createWhereClause()}`
    }
}