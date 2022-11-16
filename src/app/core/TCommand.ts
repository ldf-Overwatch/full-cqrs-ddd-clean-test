import UniqueEntityID from 'cuid';

import { Command } from './interfaces/Command';

export abstract class TCommand implements Command {
    public id: string;

    constructor(id?: string) {
        this.id = id ? id : UniqueEntityID()
    }
}
