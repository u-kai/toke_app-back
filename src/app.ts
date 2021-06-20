import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as getSchedules from 'routers/getSchedules'
import * as login from 'routers/login'
import * as isAttendResponse from 'routers/isAttendResponse'
import * as getMembers from 'routers/getMembers'
import * as newUserRegist from 'routers/newUserRegist'
import * as newEventRegist from 'routers/newEventRegist'
import * as newGroupRegist from 'routers/newGroupRegist'
import * as getGroups from "routers/getGroups"
import * as socketIo from 'socket.io'
import * as http from 'http'
const app = express()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())
app.use(bodyParser.json())
app.use('/getSchedules', getSchedules.router)
app.use('/login', login.router)
app.use('/isAttendResponse', isAttendResponse.router)
app.use('/newEventRegist', newEventRegist.router)
app.use('/getMembers', getMembers.router)
app.use("/getGroups",getGroups.router)
app.use('/newUserRegist', newUserRegist.router)
app.use('/newGroupRegist', newGroupRegist.router)
const server = http.createServer(app)
export const io: socketIo.Server = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
// io.on("connection",(socket:socketIo.Socket)=>{
//     socket.on("setName",(name:string)=>{
//         console.log(name)
//         io.emit("chat message",name)
//     })
// })
app.post('/', (req: express.Request, res: express.Response) => {
    const data = req.body
    console.log(data)
    res.json(data)
})
app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ data: 'test' })
})
server.listen(8080, () => console.log('start server'))
