import { Schema, model, Types, Model, Document } from 'mongoose';
import { UnmarshalledFleet } from '../../../domain/model/fleet';
import { UnmarshalledVehicle } from '../../../domain/model/vehicle';
import { VehicleRepository } from './vehicle';

export interface IFleetMethods {
  hasVehicleInFleet(
    vehicule: Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId },
  ): Promise<boolean>;
}

// eslint-disable-next-line
type FleetModel = Model<UnmarshalledFleet, {}, IFleetMethods>;

const fleetSchema = new Schema<UnmarshalledFleet, FleetModel, IFleetMethods>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: Number, required: true },
    vehicles: [{ type: Types.ObjectId, ref: 'Vehicle', required: false }],
  },
  { _id: false },
);

fleetSchema.method(
  'hasVehicleInFleet',
  async function hasVehicleInFleet(
    vehicle: Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId },
  ) {
    if (this.vehicles && this.vehicles.length > 0) {
      return (
        this.vehicles.findIndex(async (item: { _id: string }) => {
          const vehicleDatas = await VehicleRepository.findOne({ _id: item._id.toString() });
          return vehicleDatas.id === (await vehicle).id;
        }) > -1
      );
    } else {
      return false;
    }
  },
);

export const FleetRepository = model<UnmarshalledFleet, FleetModel>('Fleet', fleetSchema);
