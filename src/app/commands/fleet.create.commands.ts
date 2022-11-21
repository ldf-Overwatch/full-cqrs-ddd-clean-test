import { TCommand } from '../core/TCommand'
import { Fleet }  from '../../domain/model/fleet'
import {FleetRepository} from "../../infra/database/repository/fleet";

export class FleetCreateCommands extends TCommand {

    private fleet:Fleet

    constructor(fleet: Fleet) {
        super()
        this.fleet = fleet
    }

    public async execute() {

        await FleetRepository.findOneAndUpdate(
            {id: this.fleet.id },
            {$set: this.fleet.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: this.id,
            commandName: 'FleetCreate',
            args: this.fleet,
        }
    }
}
