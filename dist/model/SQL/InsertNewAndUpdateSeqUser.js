"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertNewAndUpdateSeqUser = void 0;
const InsertNewAndUpdateSeqSomething_1 = require("../../model/SQL/InsertNewAndUpdateSeqSomething");
const SelectMakerForLogin_1 = require("./Select/SelectMakerForLogin");
const seqTableName = 'seq_user_id';
const seqIdName = 'seq_user_id';
const insertTableName = 'users_login';
const insertKeys = ['name', 'password', 'user_id'];
class InsertNewAndUpdateSeqUser extends InsertNewAndUpdateSeqSomething_1.InsertNewAndUpdateSeqSomething {
    constructor(insertValuesInsufficientId) {
        super(seqTableName, seqIdName, insertTableName, insertKeys, insertValuesInsufficientId);
        this.SQLForConfirmIsNotExist = () => {
            const selectMakerForConfirmIsNotExist = new SelectMakerForLogin_1.SelectMakerForLogin();
            return selectMakerForConfirmIsNotExist.forLogin(this.insertValuesInsufficientId[0], this.insertValuesInsufficientId[1]);
        };
    }
}
exports.InsertNewAndUpdateSeqUser = InsertNewAndUpdateSeqUser;
