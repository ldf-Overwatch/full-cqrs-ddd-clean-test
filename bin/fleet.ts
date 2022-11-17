#!/usr/bin/env npx ts-node
import {FleetCreateCommands} from '../src/app/commands/fleet.create.commands';
import {Fleet} from '../src/domain/model/fleet';

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
        console.log(command.args.id);
    })
    .command('register-vehicle <fleetId> <vehiclePlateNumber>', 'register a vehicle into a fleet',
        (yargs: any) => {
            return yargs.positional('fleetId', {
                describe: 'fleetId of fleet'
            }).positional('vehiclePlateNumber', {
                describe: 'vehiclePlateNumber of vehicule'
            })
        }, async (argv: { fleetId: string; vehiclePlateNumber: string }) => {
            console.log(argv);
    })
    .command('localize-vehicle <fleetId> <vehiclePlateNumber> lat long [alt]', 'localize a vehicle into a fleet',
        (yargs: any) => {
            return yargs.positional('fleetId', {
                describe: 'fleetId of fleet'
            }).positional('vehiclePlateNumber', {
                describe: 'vehiclePlateNumber of vehicule'
            })
        }, async (argv: { fleetId: string; vehiclePlateNumber: string }) => {
            console.log(argv);
    })
    .help()
    .alias('help', 'h').argv;
