import * as express from 'express'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertMakerForCaseIsAttendResponseTrue } from 'model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue'
import { DBResultCaster } from 'model/DBResultCaster'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()

router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const attendanceRequestId: string = req.body.attendanceRequestId
    const isAttend: 'true' | 'false' = req.body.isAttend
    const message: string = req.body.message
    const selectMakerForLogin = new UpdateMakerForIsAttendResponse(userId, attendanceRequestId, isAttend, message)
    const sql = selectMakerForLogin.SQLForIsAttendResponse()
    mysqlExecuter.execute(sql).then((data: DBReturn) => {
        const updateBackendReturnDataMaker = new BackendReturnDataMaker(data)
        const updateResponseData = updateBackendReturnDataMaker.createData()
        if (isAttend === 'true') {
            const caseIsAttend = new InsertMakerForCaseIsAttendResponseTrue([userId, attendanceRequestId])
            const caseIsAttendSQL = caseIsAttend.SQLForCaseIsAttendResponseTrue()
            mysqlExecuter.execute(caseIsAttendSQL).then((data: DBReturn) => {
                const caster = new DBResultCaster(data)
                const insertBackendReturnDataMaker = new BackendReturnDataMaker(data)
                const insertResponseData = insertBackendReturnDataMaker.createData()
                if (insertResponseData?.status === 400) {
                    res.json(insertResponseData)
                } else {
                    res.json(updateResponseData)
                }
            })
        } else {
            res.json(updateResponseData)
        }
    })
})
