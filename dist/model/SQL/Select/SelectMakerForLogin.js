"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMakerForLogin = void 0;
const SelectMakerForSomething_1 = require("~/model/SQL/Select/SelectMakerForSomething");
class SelectMakerForLogin extends SelectMakerForSomething_1.SelectMakerForSomething {
    constructor() {
        super('users_login');
        this.makeLoginSelectInfo = (userName, password) => {
            return this.makeSelectInfo(['*'], ['name', 'password'], [userName, password], ['AND']);
        };
        this.forLogin = (userName, password) => {
            const selectInfo = this.makeLoginSelectInfo(userName, password);
            return this.outputSQL(selectInfo);
        };
    }
}
exports.SelectMakerForLogin = SelectMakerForLogin;
