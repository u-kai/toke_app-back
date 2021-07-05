import * as express from 'express'
import { BackendReturnDataMaker } from '~/model/BackendReturnDataMaker'
import { DBReturn } from '~/types/backend-return-types/DBReturn'
import { NewGroupRegister } from '~/model/SQL/NewGroupRegister'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const memberIds: string[] = req.body.memberIds
    const groupName: string = req.body.groupName
    const insertValuesInsufficientId = [groupName]
    const newEventRegister = new NewGroupRegister(insertValuesInsufficientId, memberIds)
    newEventRegister.run().then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
