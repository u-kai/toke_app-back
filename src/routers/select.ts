import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/MysqlExecuter'
import { SelectMaker } from 'model/SelectMaker'
import {BackendReturnDataMaker} from "model/BackendReturnDataMaker"
import { kMaxLength } from 'buffer'
import { SelectInfo } from 'type/SelectInfo'
import { SelectResult } from 'type/SelectResult'
import { DBReturn } from 'type/DBReturn'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)
router.post('/', (req: express.Request, res: express.Response) => {
    const selectMaker = new SelectMaker(req.body)
    console.log("sql",selectMaker.outputSQL())
    mysqlExecuter.execute(selectMaker.outputSQL()).then((data) => {
        console.log(data)
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
})

router.post("/loop",(req:express.Request, res:express.Response)=>{
    const selectInfos:SelectInfo[] = req.body
    let results:(SelectResult|"Error")[] = [];
    (async()=>{
        for (let i=0;i<req.body.length;i++){
            const selectMaker = new SelectMaker(selectInfos[i])
            await console.log(selectMaker.outputSQL())
            await mysqlExecuter.execute(selectMaker.outputSQL())
            .then((result:DBReturn)=>{
                const backendReturnDataMaker = new BackendReturnDataMaker(result)
                results = [...results,backendReturnDataMaker.createResults()]
            })
        }
        await console.log(results)
        await res.json({status:202,results:{select:results}})
    })();
    
    // selectInfos.map((selectInfo)=>{
    //     const selectMaker = new SelectMaker(selectInfo)
    //     mysqlExecuter.execute(selectMaker.outputSQL()).then((data)=>{
    //         const backendReturnDataMaker = new BackendReturnDataMaker(data)
    //         results = [...results,]
    //     })
    // })
})