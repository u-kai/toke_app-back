import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'

const forLogin = new SelectMakerForLogin()
const sql = forLogin.forLogin('k', 'pass')
it('test login select sql', () => {
    expect(sql).toBe("SELECT * FROM users_login WHERE user_name = 'k' AND password = 'pass'")
})
