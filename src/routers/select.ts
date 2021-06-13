import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/MysqlExecuter'
import { SelectMaker } from 'model/SelectMaker'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const mysqlExecuter = new MysqlExecuter(dbConfig)
    const selectMaker = new SelectMaker(req.body)
    mysqlExecuter.execute(selectMaker.outputSQL()).then((data) => {
        console.log(data)
        res.json({ data: data[0] })
    })
})
