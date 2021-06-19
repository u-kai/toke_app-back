import * as express from 'express'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { NewEventRegister } from 'model/SQL/NewEventRegister'
export const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const purpose: string = req.body.purpose
    const start_date: string = req.body.start_date
    const end_date: string = req.body.end_date
    const location: string = req.body.location
    const organizer_id: string = req.body.organizer_id
    const organizer_name: string = req.body.organizer_name
    const describe: string = req.body.describe
    const bring: string = req.body.bring
    const insertValuesInsufficientId = [
        purpose,
        location,
        start_date,
        end_date,
        describe,
        bring,
        organizer_id,
        organizer_name,
    ]
    const memberIds: string[] = req.body.memberIds
    const newEventRegister = new NewEventRegister(insertValuesInsufficientId, memberIds)

    newEventRegister.run().then((results: DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(results)
        res.json(backendReturnDataMaker.createData())
    })
})
