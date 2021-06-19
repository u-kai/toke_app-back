import { DBInsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import { DBSelectResult } from './SelectResult'
import { SQLError } from './SQLError'

export type DBReturn = SQLError | DBSelectResult | DBInsertUpdateDeleteResult
