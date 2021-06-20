import {SelectMakerForGetRequestsInfo} from "model/SQL/Select/SelectMakerForGetRequestsInfo"

const userId = "0"
const res = false
const selectMaker = new SelectMakerForGetRequestsInfo()
const sqlForNotResInfos = selectMaker.sql(['1', '2'])
it('test info infos sql', () => {
    expect(sqlForNotResInfos).toBe(
        "SELECT * FROM attendance_requests WHERE attendance_request_id = '1' OR attendance_request_id = '2'"
    )
})