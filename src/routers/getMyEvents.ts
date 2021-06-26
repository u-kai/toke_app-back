import * as express from 'express'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { SelectMakerForGetRequests } from 'model/SQL/Select/SelectMakerForGetRequests'
import { SelectMakerForGetMyEventInfo } from 'model/SQL/Select/SelectMakerForGetEventsByEventIds'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()
router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const selectMakerForIds = new SelectMakerForGetMyEventInfo(userId)
    const sql = selectMakerForIds.SQLForGetMyEventInfo()
    console.log('getMyEvents', sql)
    mysqlExecuter.execute(sql).then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})