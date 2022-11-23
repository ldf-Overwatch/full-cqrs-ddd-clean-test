import { Entity } from './common/entity';
import { UnmarshalledLocation, Location } from './location';

export interface UnmarshalledVehicle {
  id?: string;
  type: string;
  vehiclePlateNumber: string;
  location?: UnmarshalledLocation;
}

export class Vehicle extends Entity<UnmarshalledVehicle> {
  private _location: Location;

  private constructor(props: UnmarshalledVehicle) {
    const { ...data } = props;
    super(data);
  }

  public static create(props: UnmarshalledVehicle): Vehicle {
    return new Vehicle(props);
  }

  public unmarshal() {
    return {
      id: this.id,
      type: this.type,
      vehiclePlateNumber: this.vehiclePlateNumber,
      location: this.location
        ? {
            id: this.location.id,
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            elevation: this.location.elevation,
          }
        : undefined,
    };
  }

  get id(): string {
    return this._id;
  }

  get type(): string {
    return this.props.type;
  }

  get vehiclePlateNumber(): string {
    return this.props.vehiclePlateNumber;
  }

  set location(location: Location) {
    this._location = location instanceof Location ? location : Location.create(location);
  }

  get location(): Location {
    return this._location;
  }

  public addLocation(location: Location): void {
    if (this.location && Object.is(this.location, location)) {
      throw new Error('my vehicle is already parked at this location');
    } else {
      this.location = location;
    }
  }
}
