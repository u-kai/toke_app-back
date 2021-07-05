import * as express from 'express'
import { MysqlExecuter } from '~/model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from '~/model/BackendReturnDataMaker'
import { UpdateMakerForIsAttendResponse } from '~/model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from '~/types/backend-return-types/DBReturn'
import { InsertMakerForCaseIsAttendResponseTrue } from '~/model/SQL/Insert/InsertMakerForCaseIsAttendResponseTrue'

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
        mysqlExecuter.multiExecutes(sqls).then((data: DBReturn) => {
            const insertAndBackendReturnDataMaker = new BackendReturnDataMaker(data)
            const responseData = insertAndBackendReturnDataMaker.createData()
            res.json(responseData)
        })
    }
    if (isAttend === 'false') {
        console.log('isattned', updateIsAttendResponseSql)
        mysqlExecuter.execute(updateIsAttendResponseSql).then((data: DBReturn) => {
            const onlyUpdateDataMaker = new BackendReturnDataMaker(data)
            const responseData = onlyUpdateDataMaker.createData()
            console.log("change",responseData)
            res.json(responseData)
        })
    }
})
