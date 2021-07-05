"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMakerForGetGroups_1 = require("~/model/SQL/Select/SelectMakerForGetGroups");
const userId = '1';
const expectSql = 'SELECT group_id,group_name FROM groups WHERE group_id IN (SELECT group_id FROM user_groups WHERE user_id = 1)';
const selectMaker = new SelectMakerForGetGroups_1.SelectMakerForGetGroups(userId);
const sql = selectMaker.SQLForGetGroups();
it('test for get groups sql', () => {
    expect(sql).toBe(expectSql);
});
