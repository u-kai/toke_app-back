import { SelectMakerForSomething } from '~/model/SQL/Select/SelectMakerForSomething'

export class SelectMakerForLogin extends SelectMakerForSomething {
    constructor() {
        super('users_login')
    }
    private makeLoginSelectInfo = (userName: string, password: string) => {
        return this.makeSelectInfo(['*'], ['name', 'password'], [userName, password], ['AND'])
    }
    forLogin = (userName: string, password: string): string => {
        const selectInfo = this.makeLoginSelectInfo(userName, password)
        return this.outputSQL(selectInfo)
    }
}
