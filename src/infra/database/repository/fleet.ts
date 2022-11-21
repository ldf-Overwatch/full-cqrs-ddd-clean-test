import { Schema, model } from 'mongoose';
import { UnmarshalledFleet } from '../../../domain/model/fleet';

const fleetSchema = new Schema<UnmarshalledFleet>({
    id: { type: String, required: true, unique:true, index: true },
    userId: { type: Number, required: true },
    vehicles: [
        {
        _id: false,
        id: { type: String, required: true, index: true },
        type: { type: String, required: true },
        vehiclePlateNumber: { type: String, required: true },
        location : {
            _id: false,
            id: { type: String, required: true, index: true },
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
            elevation: { type: Number, required: true },
        }
    }]
}, {_id: false});

export const FleetRepository = model<UnmarshalledFleet>('Fleet', fleetSchema);
