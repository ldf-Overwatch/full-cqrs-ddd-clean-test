#!/usr/bin/env npx ts-node
import {FleetCreateCommands} from '../src/app/commands/fleet.create.commands';
import {Fleet} from '../src/domain/model/fleet';
import {VehicleCreateCommands} from "../src/app/commands/vehicle.create.commands";
import {Vehicle} from "../src/domain/model/vehicle";
import {fleetGetByIdQueries} from "../src/app/queries/fleet.getById.queries";
import {FleetAddVehicleCommands} from "../src/app/commands/fleet.addVehicle.commands";
import {LocationCreateCommands} from "../src/app/commands/location.create.commands";
import {Location} from "../src/domain/model/location";
import {VehicleAddLocationCommands} from "../src/app/commands/vehicle.addLocation.command";
import {vehicleGetInFleetQueries} from "../src/app/queries/vehicule.getInFleet.queries";

const yargs = require('yargs');

const argv = yargs
    .command('create <userId>', 'create a fleet of an user',
        (yargs: any) => {
            return yargs.positional('userId', {
                describe: 'userId of user'
            })
        }, async (argv: { userId: number; }) => {
        const fleetCreateCommand = new FleetCreateCommands(Fleet.create({userId: argv.userId}))
        const command = await fleetCreateCommand.execute();
        console.log(command.args.id)
    })
    .command('register-vehicle <fleetId> <vehiclePlateNumber>', 'register a vehicle into a fleet',
        (yargs: any) => {
            return yargs.positional('fleetId', {
                describe: 'fleetId of fleet'
            }).positional('vehiclePlateNumber', {
                describe: 'vehiclePlateNumber of vehicule'
            })
        }, async (argv: { fleetId: string; vehiclePlateNumber: string }) => {

            const fleetObject = new fleetGetByIdQueries(argv.fleetId);
            const fleetQuery = await fleetObject.execute();

            if(fleetQuery.args === null) {
                throw new Error('fleet not found');
            }

            const vehicleCreateCommand = new VehicleCreateCommands(Vehicle.create({type: 'car', vehiclePlateNumber: argv.vehiclePlateNumber}))
            const commandVehicleCreate = await vehicleCreateCommand.execute();

            const fleetAddVehicleCommand = new FleetAddVehicleCommands(fleetQuery.args, commandVehicleCreate.args)
            const commandFleetAddVehicle = await fleetAddVehicleCommand.execute()

            console.log(commandFleetAddVehicle.args);

    })
    .command('localize-vehicle <fleetId> <vehiclePlateNumber> lat long [alt]', 'localize a vehicle into a fleet',
        (yargs: any) => {
            return yargs.positional('fleetId', {
                describe: 'fleetId of fleet'
            }).positional('vehiclePlateNumber', {
                describe: 'vehiclePlateNumber of vehicule'
            })
        }, async (argv: { fleetId: string; vehiclePlateNumber: string; lat: number; long: number; alt: number; }) => {

        try {
            const vehicleInFleetObject = new vehicleGetInFleetQueries(argv.fleetId, argv.vehiclePlateNumber);
            const vehicleInFleetQuery = await vehicleInFleetObject.execute();

            const locationCreateCommand = new LocationCreateCommands(Location.create({
                latitude: argv.lat,
                longitude: argv.long,
                elevation: argv.alt
            }))
            const commandLocation = await locationCreateCommand.execute();
            const location = commandLocation.args;

            // @ts-ignore
            const vehicleAddLocationCommand = new VehicleAddLocationCommands(vehicleInFleetQuery.args, location)
            const commandVehicleAddLocation = await vehicleAddLocationCommand.execute()

            console.log(commandVehicleAddLocation);
        }
        catch (e) {
            throw new Error(e)
        }
    })
    .help()
    .alias('help', 'h').argv;
