"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertNewAndUpdateSeqGroup = void 0;
const InsertNewAndUpdateSeqSomething_1 = require("~/model/SQL/InsertNewAndUpdateSeqSomething");
const seqTableName = 'seq_group_id';
const seqIdName = 'seq_group_id';
const insertTableName = 'groups';
const insertKeys = ['group_name', 'group_id'];
class InsertNewAndUpdateSeqGroup extends InsertNewAndUpdateSeqSomething_1.InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId);
        this.SQLForConfirmIsNotExist = () => {
            return '';
        };
    }
}
exports.InsertNewAndUpdateSeqGroup = InsertNewAndUpdateSeqGroup;
