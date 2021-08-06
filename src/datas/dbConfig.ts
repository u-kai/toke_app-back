export type DBConfig = {
    user: string
    password: string
    host: string
    database: string
}
export const dbConfig: DBConfig = {
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    host: process.env.MYSQL_HOST!,
    database: 'toke_app',
}
