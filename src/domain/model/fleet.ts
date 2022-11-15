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

    public unmarshal(): UnmarshalledFeed {
        return {
            id: this.id,
            vehicles: this.vehicles.map((item) => ({
                vehicle: item.vehicle.unmarshal()
            }))
        }
    }

    get id(): string {
        return this._id
    }

    get vehicles(): FeedVehicle[] {
        return this._vehicles
    }

    set vehicles(vehicles: FeedVehicle[] | UnmarshalledFeedVehicle[]) {
        this._vehicles = vehicles.map((item) => ({
            vehicle: item.vehicle instanceof Vehicle ? item.vehicle : Vehicle.create(item.vehicle)
        }))
    }

    public addVehicle(vehicle: Vehicle): void {

        const index = this.vehicles.findIndex((item) => item.vehicle.type === vehicle.type)

        if (index > -1) {
            const vehicle = {
                ...this.vehicles[index]
            }

            this.vehicles = [
                ...this.vehicles.slice(0, index),
                vehicle,
                ...this.vehicles.slice(index + 1),
            ]
        } else {
            this.vehicles = [...this.vehicles, { vehicle }]
        }
    }

    public removeVehicle(vehicleId: string): void {
        this.vehicles = this.vehicles.filter(
            (item) => item.vehicle.id !== vehicleId,
        )
    }

    public emptyVehicules(): void {
        this.vehicles = []
    }
}
