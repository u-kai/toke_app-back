import {DBReturn} from "types/backend-return-types/DBReturn"
export interface InsertNewAndUpdateSeq{
    seqTableName: string
    seqIdName: string
    insertTableName: string
    insertValues: string[]
    insertKeys: string[]
    addIdDataToInsertValues:()=>string[]
    SQLForConfirmIsNotExist:()=>string
    SQLForInsertNew:()=>string
    SQLForUpdateSeqTable:()=>string
    run:()=>DBReturn
}