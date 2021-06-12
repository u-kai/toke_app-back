import { WhereClauseElements } from 'type/WhereClauseElements'
import { WhereClauseMaker } from 'model/WhereClauseMaker'

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
