"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewGroupRegister = void 0;
const InsertNewAndUpdateSeqGroup_1 = require("../../model/SQL/InsertNewAndUpdateSeqGroup");
const MysqlExecuter_1 = require("../../model/SQL/MysqlExecuter");
class NewGroupRegister {
    constructor(insertValuesInsufficientId, memberIds) {
        this.createKeys = () => {
            return '(user_id,group_id)';
        };
        this.createValues = () => {
            const seqId = this.insertNewAndUpdateSeqGroup.seqIdName;
            const seqTableName = this.insertNewAndUpdateSeqGroup.seqTableName;
            const values = this.memberIds.map((id) => `('${id}',(SELECT ${seqId} FROM ${seqTableName}))`);
            return values.join(',');
        };
        this.SQLForInsertuserGroups = () => {
            return `INSERT INTO ${this.userGroupsTable} ${this.createKeys()} VALUES${this.createValues()}`;
        };
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
            const sqls = [
                this.SQLForInsertuserGroups(),
                this.insertNewAndUpdateSeqGroup.SQLForInsertNew(),
                this.insertNewAndUpdateSeqGroup.SQLForUpdateSeqTable(),
            ];
            console.log('sqls', sqls);
            return mysqlExecuter.multiExecutes(sqls);
        });
        this.insertNewAndUpdateSeqGroup = new InsertNewAndUpdateSeqGroup_1.InsertNewAndUpdateSeqGroup(insertValuesInsufficientId);
        this.memberIds = memberIds;
        this.userGroupsTable = 'user_groups';
    }
}
exports.NewGroupRegister = NewGroupRegister;
