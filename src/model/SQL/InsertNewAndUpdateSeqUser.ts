import { InsertNewAndUpdateSeqSomething } from 'model/SQL/InsertNewAndUpdateSeqSomething'
import { SelectMakerForLogin } from './Select/SelectMakerForLogin'

const seqTableName = 'seq_user_id'
const seqIdName = 'seq_user_id'
const insertTableName = 'users_login'
const insertKeys = ['name', 'password', 'user_id']
export class InsertNewAndUpdateSeqUser extends InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId: string[]) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId)
    }
    SQLForConfirmIsNotExist = () => {
        const selectMakerForConfirmIsNotExist = new SelectMakerForLogin()
        return selectMakerForConfirmIsNotExist.forLogin(
            this.insertValuesInsufficientId[0],
            this.insertValuesInsufficientId[1]
        )
    }
}
