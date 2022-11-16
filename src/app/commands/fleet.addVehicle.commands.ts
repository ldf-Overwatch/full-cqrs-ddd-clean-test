import { TCommand } from '../core/TCommand'
import { Fleet }  from '../../domain/model/fleet'
import { Vehicle } from '../../domain/model/vehicle';

export class FleetAddVehicleCommands extends TCommand {

    private fleet:Fleet

    constructor(fleet: Fleet, vehicle: Vehicle) {
        super()
        fleet.addVehicle(vehicle)
        this.fleet = fleet
    }

    public async execute(): Promise<{ args: Fleet; commandName: string; id: string }> {
        return {
            id: this.id,
            commandName: 'FleetAddVehicle',
            args: this.fleet,
        }
    }
}
