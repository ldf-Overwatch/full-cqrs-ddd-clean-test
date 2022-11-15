export class EventDescriptor {
    constructor(
        public readonly aggregateId: string,
        public readonly aggregateName: string,
        public readonly eventName: string,
        public readonly version: number
    ) {}
}
