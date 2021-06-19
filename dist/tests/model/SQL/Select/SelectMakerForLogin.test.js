"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMakerForLogin_1 = require("model/SQL/Select/SelectMakerForLogin");
const forLogin = new SelectMakerForLogin_1.SelectMakerForLogin();
const sql = forLogin.forLogin('k', 'pass');
it('test login select sql', () => {
    expect(sql).toBe("SELECT * FROM user_login WHERE user_name = 'k' AND password = 'pass'");
});
