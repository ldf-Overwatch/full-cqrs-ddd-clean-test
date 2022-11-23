import UniqueEntityID from 'cuid';

import { Command } from './interfaces/Command';
import { run } from '../../infra/database/mongo';

run().catch((err) => console.log(err));

export abstract class TCommand implements Command {
  public id: string;

  constructor(id?: string) {
    this.id = id ? id : UniqueEntityID();
  }
}
