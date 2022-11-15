import { Message } from './Message';

export interface Command extends Message {
    id: string;
}
