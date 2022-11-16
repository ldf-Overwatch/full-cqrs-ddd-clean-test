import { TCommand } from '../core/TCommand'
import { Fleet }  from '../../domain/model/fleet'

export class FleetCreateCommands extends TCommand {

    private fleet:Fleet

    constructor(fleet: Fleet) {
        super()
        this.fleet = fleet
    }

    public async execute(): Promise<{ args: Fleet; commandName: string; id: string }> {
        return {
            id: this.id,
            commandName: 'FleetCreate',
            args: this.fleet,
        }
    }
}
