import { Message } from './Message';

export interface Event extends Message {
    eventName: string;
    aggregateName: string;
    aggregateId: string;
    version?: number;
}
