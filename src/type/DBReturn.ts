import { BackendInsertUpdateDeleteResult } from './InsertUpdateDeleteResult'
import { BackendSelectResult } from './SelectResult'
import { SQLError } from './SQLError'

export type DBReturn = SQLError | BackendSelectResult | BackendInsertUpdateDeleteResult
