import { Event } from './interfaces/Event';

export type EVENT_METADATA_TYPES = 'eventName' | 'aggregateName' | 'aggregateId' | 'version';

export const EVENT_METADATA = ['eventName', 'aggregateName', 'aggregateId', 'version'];

export abstract class TEvent implements Event {
    public abstract eventName: string;
    public abstract aggregateName: string;
    public aggregateId: string;
    public version: number;

    constructor(aggregateId: string) {
        this.aggregateId = aggregateId;
    }
}
