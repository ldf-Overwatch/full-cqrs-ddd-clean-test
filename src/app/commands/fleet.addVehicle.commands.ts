import { TCommand } from '../core/TCommand'
import { Fleet }  from '../../domain/model/fleet'
import { Vehicle } from '../../domain/model/vehicle';
import { FleetRepository } from '../../infra/database/repository/fleet';

export class FleetAddVehicleCommands extends TCommand {

    private fleet:Fleet

    constructor(fleet: Fleet, vehicle: Vehicle) {
        super()
        fleet.addVehicle(vehicle)
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
            commandName: 'FleetAddVehicle',
            args: this.fleet,
        }
    }
}
