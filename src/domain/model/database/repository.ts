import { Fleet } from '../fleet'
import { Location } from '../location'
import { Vehicle } from '../vehicle';

export interface FleetRepository {
    getById(id: string): Promise<Fleet>
    create(fleet: Fleet): Promise<Fleet>
    update(fleet: Fleet): Promise<Fleet>
}

export interface LocationRepository {
    findAll(): Promise<Location[]>
    getById(id: string): Promise<Location>
    insert(item: Location): Promise<Location>
}

export interface VehicleRepository {
    getById(id: string): Promise<Vehicle>
    create(vehicle: Vehicle): Promise<Vehicle>
    update(vehicle: Vehicle): Promise<Vehicle>
}
