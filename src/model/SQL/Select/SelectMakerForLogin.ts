import {SelectMakerForSomething} from "model/SQL/Select/SelectMakerForSomething"

export class SelectMakerForLogin extends SelectMakerForSomething{
    constructor(tableName:string){
        super(tableName)
    }
    private makeLoginSelectInfo = (userName:string,password:string) => {
        return this.makeSelectInfo(["*"],["user_name","password"],[userName,password],["AND"])
    }
    forLogin = (userName:string,password:string):string => {
        const selectInfo = this.makeLoginSelectInfo(userName,password)
        return this.outputSQL(selectInfo)
    }
}