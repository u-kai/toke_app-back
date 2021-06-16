import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { SelectMakerForGetMembers } from 'model/SQL/Select/SelectMakerForGetMembers'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const userId:string = req.body.userId
    const selectMaker = new SelectMakerForGetMembers(userId)
    const sql = selectMaker.SQLForGetMembers()
    console.log("getmembers sql",sql)
    mysqlExecuter.execute(sql).then((data: DBReturn) => {
        const selectBackendReturnDataMaker = new BackendReturnDataMaker(data)
        const selectResponseData = selectBackendReturnDataMaker.createData()
        res.json(selectResponseData)
    })
})