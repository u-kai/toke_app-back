import { MysqlExecuter } from '~/model/SQL/MysqlExecuter'
import { DBConfig } from '~/types/DB-types/DBConfig'

const DBInfo: DBConfig = {
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    host: 'localhost',
    database: 'firstwebapp',
}

const mysqlConnection = new MysqlExecuter()
it('test connection', () => {
    mysqlConnection.execute('select * from test').then((data) => {
        console.log(data)
        expect(data !== null).toBe(true)
    })
})
