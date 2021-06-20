import * as express from 'express'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertMakerForCaseIsAttendResponseTrue } from 'model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue'
import { DeleteMakerForChangeAbsent } from 'model/SQL/Delete/DeleteMakerForChangeAbsent'

export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()

router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const attendanceRequestId: string = req.body.attendanceRequestId
    const isAttend: 'true' | 'false' = req.body.isAttend
    const message: string = req.body.message
    const updateMakerForIsAttendResponse = new UpdateMakerForIsAttendResponse(
        userId,
        attendanceRequestId,
        isAttend,
        message
    )
    const updateIsAttendResponseSql = updateMakerForIsAttendResponse.SQLForIsAttendResponse()
    if (isAttend === 'true') {
        const insertMakerForCaseIsAttendResponseTrue = new InsertMakerForCaseIsAttendResponseTrue([
            userId,
            attendanceRequestId,
        ])
        const insertCaseIsAttendTrueSql = insertMakerForCaseIsAttendResponseTrue.SQLForCaseIsAttendResponseTrue()
        const sqls = [updateIsAttendResponseSql, insertCaseIsAttendTrueSql]
        console.log(sqls)
        mysqlExecuter.multiExecutes(sqls).then((data: DBReturn) => {
            const insertAndBackendReturnDataMaker = new BackendReturnDataMaker(data)
            const responseData = insertAndBackendReturnDataMaker.createData()
            res.json(responseData)
        })
    }
    if (isAttend === 'false') {
        const deleteMakerForChangeAbsent = new DeleteMakerForChangeAbsent(userId, attendanceRequestId)
        const deleteSql = deleteMakerForChangeAbsent.SQLForChangeAbsent()
        const sqls = [updateIsAttendResponseSql, deleteSql]
        console.log(sqls)
        mysqlExecuter.multiExecutes(sqls).then((data: DBReturn) => {
            const updateAndDeleteDataMaker = new BackendReturnDataMaker(data)
            const responseData = updateAndDeleteDataMaker.createData()
            res.json(responseData)
        })
    }
})
