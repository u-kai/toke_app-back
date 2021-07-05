"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertNewAndUpdateSeqEvent = void 0;
const InsertNewAndUpdateSeqSomething_1 = require("model/SQL/InsertNewAndUpdateSeqSomething");
const SelectMakerForSomething_1 = require("./Select/SelectMakerForSomething");
const seqTableName = 'seq_event_id';
const seqIdName = 'seq_event_id';
const insertTableName = 'attendance_requests';
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
];
class InsertNewAndUpdateSeqEvent extends InsertNewAndUpdateSeqSomething_1.InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId);
        this.SQLForConfirmIsNotExist = () => {
            const selectMaker = new SelectMakerForSomething_1.SelectMakerForSomething(this.insertTableName);
            const whereKeys = Object.assign([], insertKeys);
            whereKeys.pop();
            const selectInfo = selectMaker.makeSelectInfo(['*'], whereKeys, this.insertValuesInsufficientId, [
                'AND',
                'AND',
                'AND',
                'AND',
                'AND',
                'AND',
                'AND',
            ]);
            return selectMaker.outputSQL(selectInfo);
        };
    }
}
exports.InsertNewAndUpdateSeqEvent = InsertNewAndUpdateSeqEvent;
