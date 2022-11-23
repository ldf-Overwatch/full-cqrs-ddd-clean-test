import { IQuery } from '../core/interfaces/IQuery'
import {VehicleRepository} from "../../infra/database/repository/vehicle";
import {Query, Document, Types} from "mongoose";
import {UnmarshalledVehicle} from "../../domain/model/vehicle";

export class vehicleGetByIdQueries implements IQuery {

    private vehicle: Query<Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId }, Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId }, UnmarshalledVehicle>

    constructor(vehicle: Query<Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId }, Document<unknown, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId }, UnmarshalledVehicle>) {
        this.vehicle = vehicle
    }

    public async execute() {
        const vehicle = await VehicleRepository.findOne({id: (await this.vehicle).id}).populate('location');
        return { args: vehicle }
    }
}
