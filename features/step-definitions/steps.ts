import {Vehicle} from '../../src/domain/model/vehicle'
import { Fleet } from '../../src/domain/model/fleet'
import { Given, When, Then } from '@cucumber/cucumber'
import { Location } from '../../src/domain/model/location';
import { FleetCreateCommands } from '../../src/app/commands/fleet.create.commands';
import { FleetAddVehicleCommands } from '../../src/app/commands/fleet.addVehicle.commands';
import { VehicleAddLocationCommands } from '../../src/app/commands/vehicle.addLocation.command';
import { expect } from 'chai';

Given('my fleet', async function() {
    const fleetCreateCommand = new FleetCreateCommands(Fleet.create({}))
    const command = await fleetCreateCommand.execute();
    this.fleet = command.args;
})

Given('a vehicle', function() {
    this.vehicle = Vehicle.create({type: 'car', displayName: 'tiguan'});
})

Given('a location', function() {
    this.location = Location.create({latitude: 12, longitude: 13, elevation: 100});
})

Given('I have registered this vehicle into my fleet', async function() {
    const fleetAddVehicleCommand = new FleetAddVehicleCommands(this.fleet, this.vehicle)
    const command = await fleetAddVehicleCommand.execute()
    this.fleet = command.args
})

When('I park my vehicle at this location', async function(){
    const vehicleAddLocationCommand = new VehicleAddLocationCommands(this.vehicle, this.location)
    const command = await vehicleAddLocationCommand.execute()
    this.vehicle = command.args
})

Then('the known location of my vehicle should verify this location', function () {
    expect(this.vehicle.location).to.equal(this.location)
});

Given('my vehicle has been parked into this location', async function () {
    const vehicleAddLocationCommand = new VehicleAddLocationCommands(this.vehicle, this.location)
    const command = await vehicleAddLocationCommand.execute()
    this.vehicle = command.args
});

When('I try to park my vehicle at this location', async function () {
    try {
        new VehicleAddLocationCommands(this.vehicle, this.location)
    } catch(e) {
        expect(e).to.be.an('error');
    }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    expect(this.vehicle).to.be.an('error');
});

When('I register this vehicle into my fleet', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('this vehicle should be part of my vehicle fleet', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
