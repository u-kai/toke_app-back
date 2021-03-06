import { WhereClauseElements } from '~/types/DB-types/WhereClauseElements'
import { WhereClauseMaker } from '~/model/SQL/WhereClauseMaker'

const whereClauseElements: WhereClauseElements = {
    whereKeys: ['a', 'b', 'c'],
    whereValues: ['d', 'e', 'f'],
    whereOperators: ['AND', 'NOT'],
}

const whereClauseMaker = new WhereClauseMaker(whereClauseElements)
const whereClause = whereClauseMaker.createWhereClause()
it('test whereClause', () => {
    expect(whereClause).toBe("WHERE a = 'd' AND b = 'e' NOT c = 'f'")
})
