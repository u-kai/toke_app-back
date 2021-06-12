import {MysqlExecuter} from "model/MysqlExecuter"

import { DBConfig } from 'type/DBConfig'

const DBInfo: DBConfig = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
}
let results = ""
const m = new MysqlExecuter(DBInfo)
const data = m.execute('select * from test').then((data)=>{
    console.log(data)
    results = data})

