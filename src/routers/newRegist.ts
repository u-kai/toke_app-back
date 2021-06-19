import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { InsertMakerForNewRequest } from 'model/SQL/Insert/InsertMakerForNewRequest'
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertMakerForRequestMembers } from 'model/SQL/Insert/InsertMakerForRequestMembers'
import { SQLInfoMaker } from 'model/SQL/SQLInfoMaker'
import { SelectMakerForLogin } from 'model/SQL/Select/SelectMakerForLogin'
import { SQLError } from 'types/backend-return-types/SQLError'
import { InsertNewAndUpdateSeqSomething } from 'model/SQL/InsertNewAndUpdateSeqSomething'
import e = require('express')
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const userName: string = req.body.userName
    const password: string = req.body.password
    const testsum = new InsertNewAndUpdateSeqSomething(
        'seq_user_id',
        'seq_user_id',
        'user_login',
        ['name', 'password'],
        [userName, password]
    )
    // testsum.run().then((data:DBReturn)=>{
    //     const backendReturnDataCaster = new BackendReturnDataMaker(data)
    //     res.json(backendReturnDataCaster.createData())
    // })
})
