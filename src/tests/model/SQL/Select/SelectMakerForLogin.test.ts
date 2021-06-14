import {SelectMakerForLogin} from "model/SQL/Select/SelectMakerForLogin"

const forLogin = new SelectMakerForLogin("user_login")
const sql = forLogin.forLogin("k","pass")
it("test login select sql",()=>{
    expect(sql).toBe("SELECT * FROM user_login WHERE user_name = 'k' AND password = 'pass'")
})