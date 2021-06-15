import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import {InsertMakerForNewRequest} from "model/SQL/Insert/InsertMakerForNewRequest"
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertMakerForCaseIsAttendResponseTrue } from 'model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue'
import { urlToHttpOptions } from 'http'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const purpose: string = req.body.purpose
    const start_date:string = req.body.start_date
    const end_date:string = req.body.end_date
    const location: string = req.body.location
    const organizer_id:string = req.body.organizer_id
    const organizer_name:string = req.body.organizer_name
    const describe:string = req.body.describe
    const bring:string = req.body.describe
    const insertMakerForNewRequest = new InsertMakerForNewRequest(
        purpose,
        start_date,
        end_date,
        location,
        organizer_id,
        describe,
        bring,
        organizer_name
    )
    const sql = insertMakerForNewRequest.SQLForNewRequest()
    console.log(sql)
    mysqlExecuter.execute(sql).then((data: DBReturn) => {
        const insertBackendReturnDataMaker = new BackendReturnDataMaker(data)
        const insertResponseData = insertBackendReturnDataMaker.createData()
        res.json(insertResponseData)
    })
})