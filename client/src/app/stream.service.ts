import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class StreamService implements OnDestroy {
    public socket;
    public incoming = new BehaviorSubject('assets/image/back1.jpg');
    public outgoing = new BehaviorSubject('assets/image/back2.jpg');
    public weight = new BehaviorSubject(0);

    constructor() {
        this.socket = io(``, { upgrade: true, path: `/stream`, transports: ['websocket']});

        this.socket.on('close', () => {
            console.log('ended');
        });

        this.socket.on('INCOMING', (frame) => this.incoming.next(frame));

        this.socket.on('OUTGOING', (frame) => this.outgoing.next(frame));

        this.socket.on('weight', (weight: number) => this.weight.next(weight));
    }

    getIncoming() {
        return this.incoming;
    }

    getOutgoing() {
        return this.outgoing;
    }

    getWeight() {
        return this.weight;
    }

    ngOnDestroy(): void {
        this.socket.disconnect();
        this.incoming.complete();
        this.outgoing.complete();
        this.weight.complete();
    }
}
