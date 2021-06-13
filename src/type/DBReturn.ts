import { InsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import { SelectResult } from './SelectResult'
import { SQLError } from './SQLError'

export type DBReturn = SQLError | SelectResult | InsertUpdateDeleteResult
