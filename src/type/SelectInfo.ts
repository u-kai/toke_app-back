import {WhereOperator} from "type/WhereOperator"
export type SelectInfo = {
    tableName:string
    selectDatas?:string[]
    whereKeys:string[]
    whereValues:string[]
    whereOperators:WhereOperator[]
    
}