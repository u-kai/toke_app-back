import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { InsertMakerForNewRequest } from 'model/SQL/Insert/InsertMakerForNewRequest'
import { UpdateMakerForIsAttendResponse } from 'model/SQL/Update/UpdateMakerForisAttendResponse'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { InsertMakerForRequestMembers } from 'model/SQL/Insert/InsertMakerForRequestMembers'
import { SQLInfoMaker } from 'model/SQL/SQLInfoMaker'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/', (req: express.Request, res: express.Response) => {
    const purpose: string = req.body.purpose
    const start_date: string = req.body.start_date
    const end_date: string = req.body.end_date
    const location: string = req.body.location
    const organizer_id: string = req.body.organizer_id
    const organizer_name: string = req.body.organizer_name
    const describe: string = req.body.describe
    const bring: string = req.body.describe
    const memberIds: string[] = req.body.memberIds
    const insertMakerForNewRequest = new InsertMakerForNewRequest(
        purpose,
        start_date,
        end_date,
        location,
        organizer_id,
        describe,
        bring,
        organizer_name,
        '13'
    )
    const sqlForNewRequest = insertMakerForNewRequest.SQLForNewRequest()
    const insertMakerForRequestMembers = new InsertMakerForRequestMembers(memberIds, '13')
    const sqlForRequestMembers = insertMakerForRequestMembers.SQLForRequestMembers()
    console.log(sqlForRequestMembers)
    console.log(sqlForNewRequest)
    mysqlExecuter.multiExecutes([sqlForNewRequest, sqlForRequestMembers]).then((data: DBReturn) => {
        console.log('reutrnData', data)
        const insertBackendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log('json data', insertBackendReturnDataMaker.createData())
        res.json(insertBackendReturnDataMaker.createData())
    })
    // const sqlForNewRequest = insertMakerForNewRequest.SQLForNewRequest()
    // const insertMakerForRequestMembers = new InsertMakerForRequestMembers(memberIds,"test")
    // const sqlForRequestMembers = insertMakerForRequestMembers.SQLForRequestMembers()
    // mysqlExecuter.execute(sqlForNewRequest).then((insertNewRequestResult: DBReturn) => {
    //     const insertBackendReturnDataMaker = new BackendReturnDataMaker(insertNewRequestResult)
    //     const newRequestResponseData = insertBackendReturnDataMaker.createData()
    //     if(newRequestResponseData?.status === 400){
    //         res.json(newRequestResponseData)
    //     }else{
    //         mysqlExecuter.execute(sqlForRequestMembers).then((insertRequestMembers)=>{
    //             const insertBackendReturnDataMaker = new BackendReturnDataMaker(insertRequestMembers)
    //             const requestMembersResponseData = insertBackendReturnDataMaker.createData()
    //             if(requestMembersResponseData?.status === 400){
    //                 //rolback
    //                 res.json(requestMembersResponseData)
    //             }else{
    //                 res.json(requestMembersResponseData)
    //             }
    //         })
    //     }
    // })
})
