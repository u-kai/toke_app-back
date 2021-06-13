"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("datas/url");
const request = require("request");
const data = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "data": "test" })
};
const re = () => {
    return request.post({
        uri: url_1.url,
        headers: { "Content-type": "application/json" },
        json: { "data": "test" }
    }, (err, req, data) => {
        return data;
    });
};
it("", () => {
    expect(re()).toBe({ "data": "test" });
});
// test('the data is peanut butter', () => {
//     return fetch(url,data).then(data => {
//       expect(data).toBe({"data":"test"});
//     });
//   });
