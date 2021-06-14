import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { SelectMaker } from 'model/SQL/Select/SelectMaker'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectResult } from 'types/backend-return-types/SelectResult'
import { DBReturn } from 'types/backend-return-types/DBReturn'
import { SelectMakerForSchedule } from 'model/SQL/Select/SelectMakerForSchedule'
import { BackendReturnDataCaster } from 'model/BackendReturnDataCaster'
import e = require('express')
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)

router.post('/count', (req: express.Request, res: express.Response) => {
    const user_id:string = req.body.user_id
    const selectMakerForCount = new SelectMakerForSchedule(user_id)
    const sql = selectMakerForCount.SQLForAttendanceRequestsCount()
    
    mysqlExecuter.execute(sql).then((count:DBReturn) => {
        const backendReturnDataMaker = new BackendReturnDataMaker(count)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
})

router.post("/ids", (req:express.Request, res:express.Response)=>{
    const user_id:string = req.body.user_id
    const selectMakerForIds = new SelectMakerForSchedule(user_id)
    const sql = selectMakerForIds.SQLForAttendanceRequestsIds()

    mysqlExecuter.execute(sql).then((results:DBReturn)=>{
        const backendReturnDataCaster = new BackendReturnDataCaster(results)
        const selectData = backendReturnDataCaster.castSelect()
        if(selectData){
            console.log("selectData",selectData)
            const ids = selectData.map((select)=>{
                const id = select.attendance_request_id?.toString()
                if(id!==undefined){
                    return id
                }else{
                    return "error"
                }
            })
            const selectMakerForInfos = new SelectMakerForSchedule(user_id)
            const sql = selectMakerForInfos.SQLForAttendanceRequestsInfos(ids)
            console.log(sql)
            mysqlExecuter.execute(sql).then((results:DBReturn)=>{
                const backendReturnDataMaker = new BackendReturnDataMaker(results)
                console.log("22222222222222",backendReturnDataMaker.createData())
                res.json(backendReturnDataMaker.createData())
            })
        }
    }
    )
})

router.post('/loop', (req: express.Request, res: express.Response) => {
    const selectInfos: SelectInfo[] = req.body
    let results: (SelectResult | 'Error')[] = []
    ;(async () => {
        for (let i = 0; i < req.body.length; i++) {
            const selectMaker = new SelectMaker(selectInfos[i])
            await console.log(selectMaker.outputSQL())
            await mysqlExecuter.execute(selectMaker.outputSQL()).then((result: DBReturn) => {
                const backendReturnDataMaker = new BackendReturnDataMaker(result)
                results = [...results, backendReturnDataMaker.createResults()]
            })
        }
        await console.log(results)
        await res.json({ status: 202, results: { select: results } })
    })()
})
