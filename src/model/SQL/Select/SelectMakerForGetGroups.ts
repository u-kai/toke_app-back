import { SelectMakerForSomething } from '~/model/SQL/Select/SelectMakerForSomething'

const groupsTable = 'groups'
const selectKeys = ['group_id', 'group_name']
const groupsWhereKey = 'group_id'
const userGroupsTable = 'user_groups'
const userGroupsWhereKey = 'user_id'
export class SelectMakerForGetGroups extends SelectMakerForSomething {
    userId: string
    private selectKeys: string[]
    private groupsWhereKey: string
    private userGroupsTable: string
    private userGroupsWhereKey: string
    constructor(userId: string) {
        super(groupsTable)
        this.userId = userId
        this.selectKeys = selectKeys
        this.groupsWhereKey = groupsWhereKey
        this.userGroupsTable = userGroupsTable
        this.userGroupsWhereKey = userGroupsWhereKey
    }
    private createKeys = (): string => {
        return this.selectKeys.join(',')
    }
    private SQLForGetGroupId = (): string => {
        return `SELECT ${this.groupsWhereKey} FROM ${this.userGroupsTable} WHERE ${this.userGroupsWhereKey} = ${this.userId}`
    }
    SQLForGetGroups = () => {
        return `SELECT ${this.createKeys()} FROM ${this.tableName} WHERE ${
            this.groupsWhereKey
        } IN (${this.SQLForGetGroupId()})`
    }
}
