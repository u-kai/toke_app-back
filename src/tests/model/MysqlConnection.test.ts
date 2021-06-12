import { MysqlExecuter } from 'model/MysqlExecuter'
import { DBConfig } from 'type/DBConfig'

const DBInfo: DBConfig = {
    user: 'root',
    password: 'oyyg83019%',
    host: 'localhost',
    database: 'firstwebapp',
}

const mysqlConnection = new MysqlExecuter(DBInfo)
it('test connection',() => {
mysqlConnection.execute("select * from test").then((data)=>{
    console.log(data)
    expect( data!== null).toBe(true)
    })
})


