import * as express from 'express'
import { dbConfig } from 'datas/dbConfig'
import { MysqlExecuter } from 'model/SQL/MysqlExecuter'
import { SelectMaker } from 'model/SQL/Select/SelectMaker'
import { BackendReturnDataMaker } from 'model/BackendReturnDataMaker'
import { SelectInfo } from 'types/DB-types/SelectInfo'
import { SelectResult } from 'types/backend-return-types/SelectResult'
import { DBReturn } from 'types/backend-return-types/DBReturn'
export const router = express.Router()
const mysqlExecuter = new MysqlExecuter(dbConfig)
router.post('/', (req: express.Request, res: express.Response) => {
    const selectMaker = new SelectMaker(req.body)
    console.log('sql', selectMaker.outputSQL())
    mysqlExecuter.execute(selectMaker.outputSQL()).then((data) => {
        if (data[0].length === 0) {
            data[0] = [{ error: 'empty' }]
        }
        const backendReturnDataMaker = new BackendReturnDataMaker(data)
        console.log(backendReturnDataMaker.createData())
        res.json(backendReturnDataMaker.createData())
    })
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
