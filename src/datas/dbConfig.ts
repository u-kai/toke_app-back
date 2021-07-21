export type DBConfig = {
    user: string
    password: string
    host: string
    database: string
}
export const dbConfig: DBConfig = {
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    host: 'localhost',
    database: 'toke_app',
}
