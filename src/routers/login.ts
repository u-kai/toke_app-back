import * as express from 'express'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'
import { DBReturn } from 'types/backend-return-types/DBReturn'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()

router.post('/', (req: express.Request, res: express.Response) => {
    const userName: string = req.body.userName
    const password: string = req.body.password
    const selectMakerForLogin = new SelectMakerForLogin()
    const sql = selectMakerForLogin.forLogin(userName, password)
    mysqlExecuter.execute(sql).then((data:DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        res.json(backendReturnDataMaker.createData())
    })
})
