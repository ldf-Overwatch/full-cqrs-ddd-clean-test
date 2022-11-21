import {Entity} from './common/entity'
import {UnmarshalledVehicle, Vehicle} from './vehicle'

export interface UnmarshalledFleet {
    id: string
    userId: number
    vehicles?: UnmarshalledVehicle[]
}

export interface FeedProps {
    id?: string
    userId: number
    rawVehicles?: Vehicle[]
}

export class Fleet extends Entity<FeedProps> {
    private _vehicles: Vehicle[]

    private constructor({ id, ...data }: FeedProps) {
        super(data, id)
    }

    public static create(props: FeedProps): Fleet {
        const instance = new Fleet(props)
        instance.vehicles = instance.props.rawVehicles || []
        return instance
    }

    public unmarshal(): { vehicles: UnmarshalledVehicle[]; id: string; userId: number } {
        return {
            id: this.id,
            userId: this.userId,
            vehicles: this.vehicles.map((item) => {
                return {
                    id: item.id,
                    type: item.type,
                    vehiclePlateNumber: item.vehiclePlateNumber,
                    location: item.location ? {
                        id: item.location.id,
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        elevation: item.location.elevation
                    } : undefined
                }
            })
        }
    }

    get id(): string {
        return this._id
    }

    get userId(): number {
        return this.props.userId
    }

    get vehicles(): Vehicle[] {
        return this._vehicles
    }

    set vehicles(vehicles: UnmarshalledVehicle[]) {
        this._vehicles = vehicles.map((item) => {
            return item instanceof Vehicle ? item : Vehicle.create(item)
        })
    }

    public hasVehicleInFleet(vehicle: Vehicle) {
        if(this.vehicles && this.vehicles.length > 0) {
            return (this.vehicles.findIndex((item) => item.id === vehicle.id) > -1);
        } else {
            return false;
        }

    }

    public addVehicle(vehicle: Vehicle): void {
        if(this.vehicles && this.vehicles.length > 0) {
            if (this.hasVehicleInFleet(vehicle)) {
                throw new Error('this vehicle has already been registered into this fleet')
            } else {
                this.vehicles = [...this.vehicles, vehicle]
            }
        } else {
            this.vehicles = [];
            this.vehicles = [...this.vehicles, vehicle]
        }
    }
}
