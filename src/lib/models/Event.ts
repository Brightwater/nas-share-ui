export class Event {
    ts: string;
    name: string;
    status: string;

    constructor(ts: string, name: string, status: string) {
        
        this.ts = ts;
        this.name = name;
        this.status = status;
    }
}