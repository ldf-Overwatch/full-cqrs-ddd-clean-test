import { IQuery } from '../core/interfaces/IQuery'

export class fleetHasVehicleQueries implements IQuery {

    private boolean:boolean

    constructor(boolean: boolean) {
        this.boolean = boolean
    }

    public async execute() {
        return this.boolean;
    }
}
