import { TCommand } from '../core/TCommand'
import { Location }  from '../../domain/model/location'
import {LocationRepository} from "../../infra/database/repository/location";

export class LocationCreateCommands extends TCommand {

    private location:Location

    constructor(location: Location) {
        super()
        this.location = location
    }

    public async execute(){

        const location = await LocationRepository.findOneAndUpdate(
            {latitude: this.location.latitude, longitude: this.location.longitude, elevation: this.location.elevation },
            {$set: this.location.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: location.id,
            commandName: 'LocationCreate',
            args: location,
        }
    }
}
