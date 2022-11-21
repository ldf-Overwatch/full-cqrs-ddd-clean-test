import { TCommand } from '../core/TCommand'
import { Vehicle }  from '../../domain/model/vehicle'
import { Location } from '../../domain/model/location';
import {VehicleRepository} from "../../infra/database/repository/vehicle";

export class VehicleAddLocationCommands extends TCommand {

    private vehicle:Vehicle

    constructor(vehicle: Vehicle, location: Location) {
        super()
        vehicle.addLocation(location)
        this.vehicle = vehicle
    }

    public async execute() {

        await VehicleRepository.findOneAndUpdate(
            {id: this.vehicle.id },
            {$set: this.vehicle.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: this.id,
            commandName: 'VehicleAddLocation',
            args: this.vehicle,
        }
    }
}
