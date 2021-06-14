import { WhereOperator } from 'types/DB-types/WhereOperator'
export type WhereClauseElements = {
    whereKeys: string[]
    whereValues: string[]
    whereOperators: WhereOperator[]
}
