import { TCommand } from '../core/TCommand';
import { UnmarshalledFleet } from '../../domain/model/fleet';
import { UnmarshalledVehicle } from '../../domain/model/vehicle';
import { FleetRepository, IFleetMethods } from '../../infra/database/repository/fleet';
import { Document, Types } from 'mongoose';

export class FleetAddVehicleCommands extends TCommand {
  private fleet: Document<unknown, UnmarshalledFleet> & UnmarshalledFleet & { _id: Types.ObjectId } & IFleetMethods;
  private vehicle: Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId };

  constructor(
    fleet: Document<unknown, UnmarshalledFleet> & UnmarshalledFleet & { _id: Types.ObjectId } & IFleetMethods,
    vehicle: Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId },
  ) {
    super();
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  public async execute() {
    if (!(await (await this.fleet).hasVehicleInFleet(this.vehicle))) {
      const saveFleet = await FleetRepository.findOneAndUpdate(
        { id: (await this.fleet).id },
        { $push: { vehicles: this.vehicle } },
        { new: true },
      );

      return {
        id: saveFleet.id,
        commandName: 'FleetAddVehicle',
        args: saveFleet,
      };
    } else {
      throw new Error('this vehicle has already been registered into this fleet');
    }
  }
}
