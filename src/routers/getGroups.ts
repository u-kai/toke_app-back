import * as express from 'express'
import { MysqlExecuter } from '../model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from '../model/BackendReturnDataMaker'
import { DBReturn } from '../types/backend-return-types/DBReturn'
import { SelectMakerForGetGroups } from '../model/SQL/Select/SelectMakerForGetGroups'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter()

router.post('/', (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId
    const selectMaker = new SelectMakerForGetGroups(userId)
    const sql = selectMaker.SQLForGetGroups()
    console.log('getGroups', sql)
    mysqlExecuter.execute(sql).then((data: DBReturn) => {
        const selectBackendReturnDataMaker = new BackendReturnDataMaker(data)
        const selectResponseData = selectBackendReturnDataMaker.createData()
        res.json(selectResponseData)
    })
})
