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

        await VehicleRepository.findOneAndUpdate(
            {id: this.vehicle.id },
            {$set: this.vehicle.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: this.id,
            commandName: 'VehicleCreate',
            args: this.vehicle,
        }
    }
}
