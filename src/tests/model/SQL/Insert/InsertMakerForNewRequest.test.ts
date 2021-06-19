import { InsertMakerForNewRequest } from 'model/SQL/Insert/InsertMakerForNewRequest'

const purpose = 'this is purpose'
const start_date = new Date()
const end_date = new Date()
const location = 'praza'
const organizer_id = '1'
const describe = 'this is descibe'
const brings = 'brings'
const organizer_name = 'udo'
const insertNew = new InsertMakerForNewRequest(
    purpose,
    start_date.toString(),
    end_date.toString(),
    location,
    organizer_id,
    describe,
    brings,
    organizer_name
)
const sql = insertNew.SQLForNewRequest()

it('test isnert new request', () => {
    expect(sql).toBe(
        `INSERT INTO attendance_requests (purpose,start_date,end_date,location,organizer_id,describe,bring,organizer_name) VALUES('${purpose}','${start_date}','${end_date}','${location}','${organizer_id}','${describe}','${brings}','${organizer_name}')`
    )
})
