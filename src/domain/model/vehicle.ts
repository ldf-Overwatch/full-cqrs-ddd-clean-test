import {Entity} from './common/entity'
import {UnmarshalledLocation, Location} from './location';

export interface UnmarshalledVehicle {
    id?: string
    type: string
    displayName: string
    location?: UnmarshalledLocation
}

export class Vehicle extends Entity<UnmarshalledVehicle> {

    private _location: Location | UnmarshalledLocation

    private constructor(props: UnmarshalledVehicle) {
        const { id, ...data } = props
        super(data, id)
    }

    public static create(props: UnmarshalledVehicle): Vehicle {
        return new Vehicle(props)
    }

    public unmarshal(): UnmarshalledVehicle {
        return {
            id: this.id,
            type: this.type,
            displayName: this.displayName,
            location: this.location
        }
    }

    get id(): string {
        return this._id
    }

    get type(): string {
        return this.props.type
    }

    get displayName(): string {
        return this.props.displayName
    }

    set location(location: Location | UnmarshalledLocation)  {
        this._location = location instanceof Location ? location : Location.create(location)
    }

    get location():Location | UnmarshalledLocation {
        return this._location
    }

    public addLocation(location: Location): void {
        this.location = location;
    }

    public removeLocation(locationId: string): void {
        if (locationId !== this.location.id) {
            return;
        }
        this.location = null
    }
}
