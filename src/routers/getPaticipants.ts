import * as express from 'express'
import { MysqlExecuter } from '~/model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from '~/model/BackendReturnDataMaker'
import { DBReturn } from '~/types/backend-return-types/DBReturn'
import { SelectMakerForGetEvents } from '~/model/SQL/Select/SelectMakerForGetEvents'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()

router.post('/', (req: express.Request, res: express.Response) => {
    const attendanceRequestId: string = req.body.attendanceRequestId
    // const selectMakerForEvents = new SelectMakerForGetEvents(userId)
    // const sql = selectMakerForEvents.SQLForEventInfos()
    const sql = `select user_name from users_info where user_id IN (select participant_id from event_participants where attendance_request_id = ${attendanceRequestId})`
    console.log('ids', sql)
    mysqlExecuter.execute(sql).then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
