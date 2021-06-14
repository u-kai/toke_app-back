import { WhereClauseElements } from 'types/DB-types/WhereClauseElements'
export type InsertInfo = {
    tableName: string
    insertKeys: string[]
    insertValues: string[]
    whereClauseElements: WhereClauseElements
}
