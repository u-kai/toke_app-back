import { InsertNewAndUpdateSeqSomething } from '~/model/SQL/InsertNewAndUpdateSeqSomething'
import { SelectMakerForSomething } from './Select/SelectMakerForSomething'

const seqTableName = 'seq_group_id'
const seqIdName = 'seq_group_id'
const insertTableName = 'groups'
const insertKeys = ['group_name', 'group_id']
export class InsertNewAndUpdateSeqGroup extends InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId: string[]) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId)
    }
    SQLForConfirmIsNotExist = () => {
        return ''
    }
}
