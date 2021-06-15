import {InsertMakerForNewRequest} from "model/SQL/Insert/InsertMakerForNewRequest"



const purpose = "this is purpose"
const date = new Date()
const location = "praza"
const organizer_id = "1"
const describe = "this is descibe"
const brings = "brings" 
const organizer_name = "udo"
const insertNew = new InsertMakerForNewRequest(
    purpose,
    date,
    location,
    organizer_id,
    describe,
    brings,
    organizer_name
)
const sql = insertNew.SQLForNewRequest()

it("test isnert new request",()=>{
    expect(sql).toBe(`INSERT INTO attendance_requests (purpose,date,location,organizer_id,describe,bring,organizer_name) VALUES('${purpose}','${date}','${location}','${organizer_id}','${describe}','${brings}','${organizer_name}')`)
})