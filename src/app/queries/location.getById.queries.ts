import { IQuery } from '../core/interfaces/IQuery'
import { LocationRepository } from '../../infra/database/repository/location';
import {Query, Document, Types, IfAny} from "mongoose";
import {UnmarshalledLocation} from "../../domain/model/location";

export class locationGetByIdQueries implements IQuery {

    private location: Query<Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, {}, UnmarshalledLocation>

    constructor(location: Query<Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, Document<unknown, any, UnmarshalledLocation> & UnmarshalledLocation & { _id: Types.ObjectId }, {}, UnmarshalledLocation>) {
        this.location = location
    }

    public async execute() {
        const location = await LocationRepository.findOne({id: (await this.location).id});
        return { args: location }
    }
}
