import {InsertMakerForRequestMembers} from "model/SQL/Insert/InsertMakerForRequestMembers"


const insertMemberIds = ["1","2"]
const requestId = "4"
const forRequestMembers = new InsertMakerForRequestMembers(insertMemberIds,requestId)
const sql = forRequestMembers.SQLForRequestMembers()

it("test for request members",()=>{
    expect(sql).toBe(`INSERT INTO user_attendance_requests_info (user_id,attendance_request_id,is_attendance,is_response,message) VALUES('1','4','false','false',''),('2','4','false','false','')`)
})