import { TCommand } from '../core/TCommand'
import { Vehicle }  from '../../domain/model/vehicle'
import {VehicleRepository} from "../../infra/database/repository/vehicle";

export class VehicleCreateCommands extends TCommand {

    private vehicle:Vehicle

    constructor(vehicle: Vehicle) {
        super()
        this.vehicle = vehicle
    }

    public async execute() {

        const vehicle = await VehicleRepository.findOneAndUpdate(
            {vehiclePlateNumber: this.vehicle.vehiclePlateNumber },
            {$set: this.vehicle.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: vehicle.id,
            commandName: 'VehicleCreate',
            args: vehicle,
        }
    }
}
