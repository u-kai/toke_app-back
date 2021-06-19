import { SQLError } from 'types/backend-return-types/SQLError'

export const causeUnknownError = (e: any): SQLError => {
    return {
        code: '1',
        sqlMessage: `エラーが発生しています．管理者に問い合わせください．${e}`,
        sqlState: '',
        errno: -2000,
    }
}
