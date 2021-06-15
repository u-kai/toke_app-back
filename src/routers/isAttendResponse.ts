import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const isAttend: string = req.body.isAttend
    const message:string = req.body.message
    const selectMakerForLogin = new SelectMakerForLogin('user_login')
    const sql = selectMakerForLogin.forLogin(userName, password)
    mysqlExecuter.execute(sql).then((data) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
})
