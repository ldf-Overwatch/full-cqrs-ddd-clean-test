import {Schema, model, Types, Model} from 'mongoose';
import {UnmarshalledVehicle, Vehicle} from '../../../domain/model/vehicle';
import {Location} from "../../../domain/model/location";

export interface IVehicleMethods {
}

type VehicleModel = Model<UnmarshalledVehicle, {}, IVehicleMethods>;

export const vehicleSchema = new Schema<UnmarshalledVehicle, VehicleModel, IVehicleMethods>({
    id: { type: String, required: true, index: true },
    type: { type: String, required: true },
    vehiclePlateNumber: { type: String, required: true },
    location : {type:  Types.ObjectId, ref: 'Location', required: false},
}, { _id: false});

export const VehicleRepository = model<UnmarshalledVehicle, VehicleModel>('Vehicle', vehicleSchema);
