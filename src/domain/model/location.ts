import { Entity } from './common/entity';

export interface UnmarshalledLocation {
  id?: string;
  latitude: number;
  longitude: number;
  elevation: number;
}

export class Location extends Entity<UnmarshalledLocation> {
  private constructor(props: UnmarshalledLocation) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: UnmarshalledLocation): Location {
    return new Location(props);
  }

  public unmarshal(): UnmarshalledLocation {
    return {
      id: this.id,
      latitude: this.latitude,
      longitude: this.longitude,
      elevation: this.elevation,
    };
  }

  get id(): string {
    return this._id;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  get elevation(): number {
    return this.props.elevation;
  }
}
