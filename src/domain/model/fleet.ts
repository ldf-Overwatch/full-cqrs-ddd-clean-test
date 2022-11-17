import {Entity} from './common/entity'
import {UnmarshalledVehicle, Vehicle} from './vehicle'

export interface FeedVehicle {
    vehicle: Vehicle
}

export interface UnmarshalledFeedVehicle {
    vehicle: UnmarshalledVehicle
}

export interface UnmarshalledFeed {
    id: string
    vehicles: UnmarshalledFeedVehicle[]
}

export interface FeedProps {
    id?: string
    userId: number
    rawVehicles?: UnmarshalledFeedVehicle[]
}

export class Fleet extends Entity<FeedProps> {
    private _vehicles: FeedVehicle[]

    private constructor({ id, ...data }: FeedProps) {
        super(data, id)
    }

    public static create(props: FeedProps): Fleet {
        const instance = new Fleet(props)
        instance.vehicles = instance.props.rawVehicles || []
        return instance
    }

    public unmarshal(): { vehicles: { vehicle: UnmarshalledVehicle }[]; id: string; userId: number } {
        return {
            id: this.id,
            userId: this.userId,
            vehicles: this.vehicles.map((item) => ({
                vehicle: item.vehicle.unmarshal()
            }))
        }
    }

    get id(): string {
        return this._id
    }

    get userId(): number {
        return this.props.userId
    }

    get vehicles(): FeedVehicle[] {
        return this._vehicles
    }

    set vehicles(vehicles: FeedVehicle[] | UnmarshalledFeedVehicle[]) {
        this._vehicles = vehicles.map((item) => ({
            vehicle: item.vehicle instanceof Vehicle ? item.vehicle : Vehicle.create(item.vehicle)
        }))
    }

    public hasVehicleInFleet(vehicle: Vehicle) {
        return (this.vehicles.findIndex((item) => item.vehicle.id === vehicle.id) > -1);
    }

    public addVehicle(vehicle: Vehicle): void {
        if (this.hasVehicleInFleet(vehicle)) {
            throw new Error('this vehicle has already been registered into this fleet')
        } else {
            this.vehicles = [...this.vehicles, { vehicle }]
        }
    }
}
