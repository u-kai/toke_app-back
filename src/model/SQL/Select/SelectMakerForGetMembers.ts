import { SelectMakerForSomething } from 'model/SQL/Select/SelectMakerForSomething'

export class SelectMakerForGetMembers extends SelectMakerForSomething {
    userId: string
    constructor(userId: string) {
        super('user_info')
        this.userId = userId
    }
    SQLForGetMembers = () => {
        return `SELECT user_name,user_id FROM ${this.tableName} WHERE user_id != ${this.userId}`
    }
}
