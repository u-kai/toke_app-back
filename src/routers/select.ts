import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/MysqlExecuter'
import { SelectMaker } from 'model/SelectMaker'
import {BackendReturnDataMaker} from "model/BackendReturnDataMaker"
import { kMaxLength } from 'buffer'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const mysqlExecuter = new MysqlExecuter(dbConfig)
    const selectMaker = new SelectMaker(req.body)
    mysqlExecuter.execute(selectMaker.outputSQL()).then((data) => {
        console.log(data)
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
})
