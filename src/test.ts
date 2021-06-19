import { MysqlExecuter } from 'model/SQL/MysqlExecuter'

import { DBConfig } from 'types/DB-types/DBConfig'

const DBInfo: DBConfig = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
}
let results = ''
const m = new MysqlExecuter()
const data = m.execute('select * from test').then((data) => {
    console.log(data)
    results = data
})
