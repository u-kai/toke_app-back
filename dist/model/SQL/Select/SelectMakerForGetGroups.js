"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForGetGroups = void 0;
const SelectMakerForSomething_1 = require("~/model/SQL/Select/SelectMakerForSomething");
const groupsTable = 'groups';
const selectKeys = ['group_id', 'group_name'];
const groupsWhereKey = 'group_id';
const userGroupsTable = 'user_groups';
const userGroupsWhereKey = 'user_id';
class SelectMakerForGetGroups extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor(userId) {
        super(groupsTable);
        this.createKeys = () => {
            return this.selectKeys.join(',');
        };
        this.SQLForGetGroupId = () => {
            return `SELECT ${this.groupsWhereKey} FROM ${this.userGroupsTable} WHERE ${this.userGroupsWhereKey} = ${this.userId}`;
        };
        this.SQLForGetGroups = () => {
            return `SELECT ${this.createKeys()} FROM ${this.tableName} WHERE ${this.groupsWhereKey} IN (${this.SQLForGetGroupId()})`;
        };
        this.userId = userId;
        this.selectKeys = selectKeys;
        this.groupsWhereKey = groupsWhereKey;
        this.userGroupsTable = userGroupsTable;
        this.userGroupsWhereKey = userGroupsWhereKey;
    }
}
exports.SelectMakerForGetGroups = SelectMakerForGetGroups;
