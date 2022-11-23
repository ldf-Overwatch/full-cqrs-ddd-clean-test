import {run} from '../../../infra/database/mongo';

run().catch(err => console.log(err));

export interface IQuery {}
