import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as select from 'routers/select'
import * as login from 'routers/login'
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
app.use('/select', select.router)
app.use('/login', login.router)
app.post('/', (req: express.Request, res: express.Response) => {
    const data = req.body
    console.log(data)
    res.json(data)
})
app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ data: 'test' })
})
