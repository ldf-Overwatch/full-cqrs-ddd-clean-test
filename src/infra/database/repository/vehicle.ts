import { Schema, model } from 'mongoose';
import { UnmarshalledVehicle } from '../../../domain/model/vehicle';

export const vehicleSchema = new Schema<UnmarshalledVehicle>({
    id: { type: String, required: true, index: true },
    type: { type: String, required: true },
    vehiclePlateNumber: { type: String, required: true },
    location : {
        _id: false,
        id: { type: String, required: true, index: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        elevation: { type: Number, required: true },
    },
}, { _id: false });

export const VehicleRepository = model<UnmarshalledVehicle>('Vehicle', vehicleSchema);
