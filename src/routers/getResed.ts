import * as express from 'express'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { SelectMakerForGetRequests } from 'model/SQL/Select/SelectMakerForGetRequests'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()
const isResponse = true
router.post('/count', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const selectMakerForCount = new SelectMakerForGetRequests(userId, isResponse)
    const sql = selectMakerForCount.SQLForAttendanceRequestsCount()
    console.log('count', sql)
    mysqlExecuter.execute(sql).then((count: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(count)
        res.json(backendReturnDataMaker.createData())
    })
})

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

router.post("/responseInfo",(req:express.Request, res:express.Response)=>{
    const userId:string = req.body.userId
    const eventId:string = req.body.eventId 
    const sql = `SELECT message,is_attendance FROM user_attendance_requests_info WHERE user_id = ${userId} AND attendance_request_id = ${eventId}`
    mysqlExecuter.execute(sql).then((results)=>{
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
