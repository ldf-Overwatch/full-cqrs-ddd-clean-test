import { IQuery } from '../core/interfaces/IQuery'
import {IVehicleMethods, VehicleRepository} from "../../infra/database/repository/vehicle";
import {Query, Document, Types} from "mongoose";
import {UnmarshalledVehicle} from "../../domain/model/vehicle";

export class vehicleGetByIdQueries implements IQuery {

    private vehicle: Query<Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, {}, UnmarshalledVehicle>

    constructor(vehicle: Query<Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, {}, UnmarshalledVehicle>) {
        this.vehicle = vehicle
    }

    public async execute() {
        const vehicle = await VehicleRepository.findOne({id: (await this.vehicle).id}).populate('location');
        return { args: vehicle }
    }
}
