import * as express from 'express'
import { MysqlExecuter } from '../model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from '../model/BackendReturnDataMaker'
import { DBReturn } from '../types/backend-return-types/DBReturn'
import { SelectMakerForGetRequests } from '../model/SQL/Select/SelectMakerForGetRequests'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()
const isResponse = false
router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const selectMakerForIds = new SelectMakerForGetRequests(userId, isResponse)
    const sql = selectMakerForIds.SQLForAttendanceRequestsInfos()
    console.log('ids', sql)
    mysqlExecuter.execute(sql).then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
