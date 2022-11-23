import { TCommand } from '../core/TCommand'
import {UnmarshalledVehicle} from '../../domain/model/vehicle'
import {IVehicleMethods, VehicleRepository} from "../../infra/database/repository/vehicle";
import {vehicleGetByIdQueries} from "../queries/vehicle.getById.queries";
import {locationGetByIdQueries} from "../queries/location.getById.queries";
import {Query, Document, Types} from "mongoose";
import {UnmarshalledLocation} from "../../domain/model/location";

export class VehicleAddLocationCommands extends TCommand {

    private vehicle: Query<Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, {}, UnmarshalledVehicle>
    private location: Query<Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, {}, UnmarshalledLocation>

    constructor(vehicle: Query<Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, Document<unknown, any, UnmarshalledVehicle> & UnmarshalledVehicle & { _id: Types.ObjectId } & IVehicleMethods, {}, UnmarshalledVehicle>,
                location: Query<Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, {}, UnmarshalledLocation>) {
        super()
        this.vehicle = vehicle
        this.location = location
    }

    public async execute() {

        const vehicleObject = new vehicleGetByIdQueries(this.vehicle);
        const vehicleQuery = await vehicleObject.execute();
        const vehicle = vehicleQuery.args;

        const locationObject = new locationGetByIdQueries(this.location);
        const locationQuery = await locationObject.execute();
        const location = locationQuery.args;

        if((await vehicle)?.location?.id === (await location)?.id) {
            throw new Error('my vehicle is already parked at this location')
        }
        else {

            const newVehicle = await VehicleRepository.findOneAndUpdate(
                {vehiclePlateNumber: (await vehicle).vehiclePlateNumber },
                {$set: {location: (await location)._id}}, {new: true}
            );

            return {
                id: (await newVehicle).id,
                commandName: 'VehicleAddLocation',
                args: (await newVehicle),
            }
        }
    }
}
