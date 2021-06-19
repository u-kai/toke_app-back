import { SQLError } from "types/backend-return-types/SQLError";

export const duplicateEntryError:SQLError = {
    code: '1',
    sqlMessage: 'データが既に存在しています．別の名前，パスワードを設定してください',
    sqlState: '',
    errno: -2000,
}