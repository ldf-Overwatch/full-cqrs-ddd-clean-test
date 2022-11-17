import { TCommand } from '../core/TCommand'
import { Vehicle }  from '../../domain/model/vehicle'

export class VehicleCreateCommands extends TCommand {

    private vehicle:Vehicle

    constructor(vehicle: Vehicle) {
        super()
        this.vehicle = vehicle
    }

    public async execute(): Promise<{ args: Vehicle; commandName: string; id: string }> {
        return {
            id: this.id,
            commandName: 'VehicleCreate',
            args: this.vehicle,
        }
    }
}
