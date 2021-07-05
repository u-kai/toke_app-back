import { url } from '~/datas/url'
import * as fetch from 'node-fetch'
import * as request from 'request'
const data: RequestInit = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: 'test' }),
}

const re = () => {
    return request.post(
        {
            uri: url,
            headers: { 'Content-type': 'application/json' },
            json: { data: 'test' },
        },
        (err, req, data) => {
            return data
        }
    )
}
it('', () => {
    expect(re()).toBe({ data: 'test' })
})

// test('the data is peanut butter', () => {
//     return fetch(url,data).then(data => {
//       expect(data).toBe({"data":"test"});
//     });
//   });
