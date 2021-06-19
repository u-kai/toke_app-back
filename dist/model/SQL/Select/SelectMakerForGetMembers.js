"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetMembers = void 0;
const SelectMakerForSomething_1 = require("model/SQL/Select/SelectMakerForSomething");
class SelectMakerForGetMembers extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super('user_info');
        this.SQLForGetMembers = () => {
            return `SELECT user_name,user_id FROM ${this.tableName} WHERE user_id != ${this.userId}`;
        };
        this.userId = userId;
    }
}
exports.SelectMakerForGetMembers = SelectMakerForGetMembers;
