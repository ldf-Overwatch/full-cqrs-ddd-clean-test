import { IQuery } from '../core/interfaces/IQuery'

export class fleetHasVehicleQueries implements IQuery {

    private boolean:Boolean

    constructor(boolean: Boolean) {
        this.boolean = boolean
    }

    public async execute() {
        return this.boolean;
    }
}
