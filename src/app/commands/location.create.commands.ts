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

        await LocationRepository.findOneAndUpdate(
            {id: this.location.id },
            {$set: this.location.unmarshal()},
            {upsert: true, new: true}
        );

        return {
            id: this.location.id,
            commandName: 'LocationCreate',
            args: this.location,
        }
    }
}
