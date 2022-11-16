import { TCommand } from '../core/TCommand'
import { Vehicle }  from '../../domain/model/vehicle'
import { Location } from '../../domain/model/location';

export class VehicleAddLocationCommands extends TCommand {

    private vehicle:Vehicle

    constructor(vehicle: Vehicle, location: Location) {
        super()
        vehicle.addLocation(location)
        this.vehicle = vehicle
    }

    public async execute(): Promise<{ args: Vehicle; commandName: string; id: string }> {
        return {
            id: this.id,
            commandName: 'FleetAddLocation',
            args: this.vehicle,
        }
    }
}
