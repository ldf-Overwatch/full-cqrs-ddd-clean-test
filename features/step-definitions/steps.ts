import {Vehicle} from '../../src/domain/model/vehicle'
import { Fleet } from '../../src/domain/model/fleet'
import { Given, When, Then } from '@cucumber/cucumber'
import {Location} from '../../src/domain/model/location';

Given('my fleet', function() {
    this.fleet = Fleet.create({});
})

Given('a vehicle', function() {
    this.vehicle = Vehicle.create({type: 'car', displayName: 'tiguan'});
})

Given('a location', function() {
    this.location = Location.create({latitude: 12, longitude: 13, elevation: 100});
})

Given('I have registered this vehicle into my fleet', function() {
    this.fleet.addVehicle(this.vehicle);
})

When('I park my vehicle at this location', function(){
    this.location2 = Location.create({latitude: 12, longitude: 13, elevation: 150});
    this.vehicule.addLocation(this.location2);
})

Then('the known location of my vehicle should verify this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('my vehicle has been parked into this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I try to park my vehicle at this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I register this vehicle into my fleet', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('this vehicle should be part of my vehicle fleet', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
