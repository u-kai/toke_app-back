import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const attendanceRequestId:string = req.body.attendanceRequestId
    const isAttend: "true"|"false" = req.body.isAttend
    const message:string = req.body.message
    const selectMakerForLogin = new UpdateMakerForIsAttendResponse(userId,attendanceRequestId,isAttend,message)
    const sql = selectMakerForLogin.SQLForIsAttendResponse()
    mysqlExecuter.execute(sql).then((data:DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
})
