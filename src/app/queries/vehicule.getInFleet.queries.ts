import { IQuery } from '../core/interfaces/IQuery';
import { VehicleRepository } from '../../infra/database/repository/vehicle';
import { FleetRepository } from '../../infra/database/repository/fleet';

export class vehicleGetInFleetQueries implements IQuery {
  private fleetId: string;
  private vehiclePlateNumber: string;

  constructor(fleetId: string, vehiclePlateNumber: string) {
    this.fleetId = fleetId;
    this.vehiclePlateNumber = vehiclePlateNumber;
  }

  public async execute() {
    const fleet = await FleetRepository.findOne({ id: this.fleetId });

    if (fleet === null) {
      throw new Error('this fleet not exist');
    }

    const vehicle = await VehicleRepository.findOne({ vehiclePlateNumber: this.vehiclePlateNumber });

    if (await (await fleet).hasVehicleInFleet(vehicle)) {
      return { args: vehicle };
    } else {
      throw new Error('this vehicle is not in this fleet');
    }
  }
}
