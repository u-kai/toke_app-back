import { InsertNewAndUpdateSeqSomething } from 'model/SQL/InsertNewAndUpdateSeqSomething'
import { SelectMakerForSomething } from './Select/SelectMakerForSomething'

const seqTableName = 'seq_event_id'
const seqIdName = 'seq_event_id'
const insertTableName = 'attendance_requests'
const insertKeys = [
    'purpose',
    'location',
    'start_date',
    'end_date',
    'describes',
    'bring',
    'organizer_id',
    'organizer_name',
    'attendance_request_id',
]
export class InsertNewAndUpdateSeqEvent extends InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId: string[]) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId)
    }
    SQLForConfirmIsNotExist = () => {
        const selectMaker = new SelectMakerForSomething(this.insertTableName)
        const whereKeys = Object.assign([], insertKeys)
        whereKeys.pop()
        const selectInfo = selectMaker.makeSelectInfo(['*'], whereKeys, this.insertValuesInsufficientId, [
            'AND',
            'AND',
            'AND',
            'AND',
            'AND',
            'AND',
            'AND',
        ])
        return selectMaker.outputSQL(selectInfo)
    }
}
