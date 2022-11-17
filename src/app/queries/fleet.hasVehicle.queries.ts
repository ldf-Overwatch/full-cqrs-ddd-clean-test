import { Query } from '../core/interfaces/Query'

export class fleetHasVehicleQueries implements Query {

    private boolean:Boolean

    constructor(boolean: Boolean) {
        this.boolean = boolean
    }

    public async execute() {
        return this.boolean;
    }
}
