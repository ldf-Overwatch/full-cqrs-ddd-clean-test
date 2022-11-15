import { Event } from './Event';

export interface EventStore<T = any> {
    saveEvents(aggregateId: string, eventHistory: Event[], version: number): void;
    getEventsForAggregate(aggregateId: string): Promise<Event[]>;
}
