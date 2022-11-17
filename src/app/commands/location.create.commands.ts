import { TCommand } from '../core/TCommand'
import { Location }  from '../../domain/model/location'

export class LocationCreateCommands extends TCommand {

    private location:Location

    constructor(location: Location) {
        super()
        this.location = location
    }

    public async execute(): Promise<{ args: Location; commandName: string; id: string }> {
        return {
            id: this.id,
            commandName: 'LocationCreate',
            args: this.location,
        }
    }
}
