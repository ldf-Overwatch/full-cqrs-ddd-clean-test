import { Schema, model } from 'mongoose';
import { UnmarshalledLocation } from '../../../domain/model/location';

export const locationSchema = new Schema<UnmarshalledLocation>({
  id: { type: String, required: true, index: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  elevation: { type: Number, required: true },
});

export const LocationRepository = model<UnmarshalledLocation>('Location', locationSchema);
