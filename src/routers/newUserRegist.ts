import * as express from 'express'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertNewAndUpdateSeqUser } from 'model/SQL/InsertNewAndUpdateSeqUser'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const userName: string = req.body.userName
    const password: string = req.body.password
    const insertNewAndUpdateSeqUser = new InsertNewAndUpdateSeqUser([userName, password])
    insertNewAndUpdateSeqUser.run().then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
