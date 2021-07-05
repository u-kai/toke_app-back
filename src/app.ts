import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as getNotRes from '~/routers/getNotRes'
import * as login from '~/routers/login'
import * as newAttendResponseRegist from '~/routers/newAttendResponseRegist'
import * as getMembers from '~/routers/getMembers'
import * as newUserRegist from '~/routers/newUserRegist'
import * as newEventRegist from '~/routers/newEventRegist'
import * as newGroupRegist from '~/routers/newGroupRegist'
import * as getGroups from '~/routers/getGroups'
import * as changResponse from '~/routers/changeResponse'
import * as getResed from "~/routers/getResed"
import * as getEvent from "~/routers/getEvent"
import * as getPaticipants from "~/routers/getPaticipants"
import * as getMyEvents from "~/routers/getMyEvents"
import * as getUserName from "~/routers/getUserName"
import * as getRequests from "~/routers/getRequests"
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
app.use('/getNotRes', getNotRes.router)
app.use('/getResed', getResed.router)
app.use('/login', login.router)
app.use('/newAttendResponseRegist', newAttendResponseRegist.router)
app.use('/newEventRegist', newEventRegist.router)
app.use('/getMembers', getMembers.router)
app.use('/getGroups', getGroups.router)
app.use('/newUserRegist', newUserRegist.router)
app.use('/newGroupRegist', newGroupRegist.router)
app.use('/changeResponse', changResponse.router)
app.use("/getEvent",getEvent.router)
app.use("/getPaticipants",getPaticipants.router)
app.use("/getMyEvents",getMyEvents.router)
app.use("/getUserName",getUserName.router)
app.use("/getRequests",getRequests.router)
const server = http.createServer(app)
export const io: socketIo.Server = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
// io.on("connection",(socket:socketIo.Socket)=>{
//     socket.on("responseEvent",(:string)=>{
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
