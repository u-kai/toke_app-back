import { DBReturn } from '../types/backend-return-types/DBReturn'

export interface InsertNewAndUpdateSeq {
    seqTableName: string
    seqIdName: string
    insertTableName: string
    insertValuesInsufficientId: string[]
    insertKeys: string[]
    addIdDataToInsertValues: () => string[]
    SQLForConfirmIsNotExist: () => string
    SQLForInsertNew: () => string
    SQLForUpdateSeqTable: () => string
    confirmIsNotExist: () => Promise<boolean>
    run: () => Promise<DBReturn>
}
