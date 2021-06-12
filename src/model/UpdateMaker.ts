import { UpdateInfo } from 'type/UpdateInfo'

export class UpdateMaker {
    private headSQL: string
    private updateInfo: UpdateInfo
    constructor(updateInfo: UpdateInfo) {
        this.headSQL = 'UPDATE'
        this.updateInfo = updateInfo
    }
    outputSQL = () => {
        console.log()
    }
}
