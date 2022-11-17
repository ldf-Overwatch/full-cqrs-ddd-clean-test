import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { Vehicle } from '../../src/domain/model/vehicle'
import { Fleet } from '../../src/domain/model/fleet'
import { Location } from '../../src/domain/model/location'
import { FleetCreateCommands } from '../../src/app/commands/fleet.create.commands'
import { FleetAddVehicleCommands } from '../../src/app/commands/fleet.addVehicle.commands'
import { VehicleAddLocationCommands } from '../../src/app/commands/vehicle.addLocation.command'
import { VehicleCreateCommands } from '../../src/app/commands/vehicle.create.commands'
import { LocationCreateCommands } from '../../src/app/commands/location.create.commands'
import {fleetHasVehicleQueries} from "../../src/app/queries/fleet.hasVehicle.queries";

Given('my fleet', async function() {
    const fleetCreateCommand = new FleetCreateCommands(Fleet.create({userId: 1}))
    const command = await fleetCreateCommand.execute();
    this.fleet = command.args;
})

Given('a vehicle', async function() {
    const vehicleCreateCommand = new VehicleCreateCommands(Vehicle.create({type: 'car', vehiclePlateNumber: 'FR-251-SR'}))
    const command = await vehicleCreateCommand.execute();
    this.vehicle = command.args;
})

Given('a location', async function() {
    const locationCreateCommand = new LocationCreateCommands(Location.create({latitude: 12, longitude: 13, elevation: 100}))
    const command = await locationCreateCommand.execute();
    this.location = command.args;
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
        this.error = e;
    }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    expect(this.error).to.be.an('error')
    expect(this.error.message).to.equal('my vehicle is already parked at this location')
});

When('I register this vehicle into my fleet', async function () {
    const fleetAddVehicleCommand = new FleetAddVehicleCommands(this.fleet, this.vehicle)
    const command = await fleetAddVehicleCommand.execute()
    this.fleet = command.args
});

Then('this vehicle should be part of my vehicle fleet', async function () {
   this.hasVehicleInFleet = new fleetHasVehicleQueries(this.fleet.hasVehicleInFleet(this.vehicle));
   expect(await this.hasVehicleInFleet.execute()).to.be.true
});

When('I try to register this vehicle into my fleet', function () {
    try {
        new FleetAddVehicleCommands(this.fleet, this.vehicle)
    } catch (e) {
        this.error = e;
    }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    expect(this.error).to.be.an('error')
    expect(this.error.message).to.equal('this vehicle has already been registered into this fleet')
});

Given('the fleet of another user', async function () {
    const fleetCreateCommand = new FleetCreateCommands(Fleet.create({userId: 2}))
    const command = await fleetCreateCommand.execute();
    this.fleetOtherUser = command.args;
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
    const fleetAddVehicleCommand = new FleetAddVehicleCommands(this.fleetOtherUser, this.vehicle)
    const command = await fleetAddVehicleCommand.execute()
    this.fleetOtherUser = command.args
});
