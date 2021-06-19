"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBResultCaster_1 = require("model/DBResultCaster");
const dataCaseSelect = [
    [
        {
            user: 'kai',
            age: 18,
        },
    ],
];
const dataCast = new DBResultCaster_1.DBResultCaster(dataCaseSelect);
const castSelect = dataCast.castSelectResult();
it('test select cast', () => {
    if (castSelect && castSelect)
        expect(castSelect).toStrictEqual([
            {
                user: 'kai',
                age: 18,
            },
        ]);
});
