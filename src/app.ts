import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as select from 'routers/schedule'
import * as login from 'routers/login'
import * as isAttendResponse from 'routers/isAttendResponse'
import * as getMembers from 'routers/getMembers'
import * as newUserRegist from 'routers/newUserRegist'
import * as newEventRegist from 'routers/newEventRegist'
const app = express()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())
app.use(bodyParser.json())
const server = app.listen(8080, function () {
    console.log('start server')
})
app.use('/schedule', select.router)
app.use('/login', login.router)
app.use('/isAttendResponse', isAttendResponse.router)
app.use('/newEventRegist', newEventRegist.router)
app.use('/getMembers', getMembers.router)
app.use('/newUserRegist', newUserRegist.router)
app.post('/', (req: express.Request, res: express.Response) => {
    const data = req.body
    console.log(data)
    res.json(data)
})
app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ data: 'test' })
})
