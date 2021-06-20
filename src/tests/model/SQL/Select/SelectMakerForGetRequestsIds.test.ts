import { SelectMakerForGetRequestsIds } from 'model/SQL/Select/SelectMakerForGetRequestsIds'

const userId = '0'
const res = false
const selectMaker = new SelectMakerForGetRequestsIds(userId, res)
const sqlForNotResIds = selectMaker.sql()
it('test info ids sql', () => {
    expect(sqlForNotResIds).toBe(
        "SELECT attendance_request_id FROM user_attendance_requests_info WHERE user_id = '0' AND is_response = 'false'"
    )
})
