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
exports.NewEventRegister = void 0;
const InsertNewAndUpdateSeqEvent_1 = require("../../model/SQL/InsertNewAndUpdateSeqEvent");
const InsertMakerForRequestMembers_1 = require("../../model/SQL/Insert/InsertMakerForRequestMembers");
const duplicateEntryError_1 = require("../../datas/errors/duplicateEntryError");
const MysqlExecuter_1 = require("../../model/SQL/MysqlExecuter");
const InsertMakerForCaseIsAttendResponseTrue_1 = require("./Insert/InsertMakerForCaseIsAttendResponseTrue");
class NewEventRegister {
    constructor(insertValuesInsufficientId, memberIds) {
        this.SQLForInsertRequestMembers = () => {
            const insertMaker = new InsertMakerForRequestMembers_1.InsertMakerForRequestMembers(this.memberIds);
            return insertMaker.SQLForRequestMembers();
        };
        this.SQLForInsertOrganizerSelf = () => {
            const insertMaker = new InsertMakerForCaseIsAttendResponseTrue_1.InsertMakerForCaseIsAttendResponseTrue([]);
        };
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.insertNewAndUpdateSeqEvent.confirmIsNotExist().then((results) => {
                if (results === false) {
                    return duplicateEntryError_1.duplicateEntryError;
                }
                const mysqlExecuter = new MysqlExecuter_1.MysqlExecuter();
                const sqls = [
                    this.SQLForInsertRequestMembers(),
                    this.insertNewAndUpdateSeqEvent.SQLForInsertNew(),
                    this.insertNewAndUpdateSeqEvent.SQLForUpdateSeqTable(),
                ];
                console.log('sqls', sqls);
                return mysqlExecuter.multiExecutes(sqls);
            });
        });
        this.memberIds = memberIds;
        this.insertNewAndUpdateSeqEvent = new InsertNewAndUpdateSeqEvent_1.InsertNewAndUpdateSeqEvent(insertValuesInsufficientId);
    }
}
exports.NewEventRegister = NewEventRegister;
