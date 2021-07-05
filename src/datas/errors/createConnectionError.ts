import { SQLError } from '~/types/backend-return-types/SQLError'
export const createConnectionError: SQLError = {
    code: '1',
    sqlMessage: 'データベース接続でエラーが発生しています．管理者に報告してください',
    sqlState: '',
    errno: -2000,
}
