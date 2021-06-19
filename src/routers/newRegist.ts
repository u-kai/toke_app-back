import * as express from 'express'
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
import { InsertNewAndUpdateSeqUser } from 'model/SQL/InsertNewAndUpdateSeqUser'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const userName: string = req.body.userName
    const password: string = req.body.password
    const insertNewAndUpdateSeqUser = new InsertNewAndUpdateSeqUser(
        [userName, password]
    )
    insertNewAndUpdateSeqUser.run()
    .then((results:DBReturn)=>{
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
