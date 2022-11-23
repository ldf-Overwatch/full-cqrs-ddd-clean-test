import { Schema, model, Types } from 'mongoose';
import { UnmarshalledVehicle } from '../../../domain/model/vehicle';

export const vehicleSchema = new Schema<UnmarshalledVehicle>(
  {
    id: { type: String, required: true, index: true },
    type: { type: String, required: true },
    vehiclePlateNumber: { type: String, required: true },
    location: { type: Types.ObjectId, ref: 'Location', required: false },
  },
  { _id: false },
);

export const VehicleRepository = model<UnmarshalledVehicle>('Vehicle', vehicleSchema);
