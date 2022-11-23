import { IQuery } from '../core/interfaces/IQuery';
import { FleetRepository } from '../../infra/database/repository/fleet';

export class fleetGetByIdQueries implements IQuery {
  private fleetId: string;

  constructor(fleetId: string) {
    this.fleetId = fleetId;
  }

  public async execute() {
    const fleet = await FleetRepository.findOne({ id: this.fleetId }).populate({
      path: 'vehicles',
      populate: {
        path: 'location',
        model: 'Location',
      },
    });

    return { args: fleet };
  }
}
