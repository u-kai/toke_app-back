import { WhereClauseElements } from '~/types/DB-types/WhereClauseElements'
export type SelectInfo = {
    tableName: string
    selectDatas?: string[]
    whereClaseElements: WhereClauseElements
}
