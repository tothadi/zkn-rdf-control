import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { StreamService } from '../stream.service';

@Component({
    selector: 'app-merleg',
    templateUrl: './merleg.component.html',
    styleUrls: ['./merleg.component.css'],
})
export class MerlegComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('str1') str1: ElementRef | null = null;
    @ViewChild('str2') str2: ElementRef | null = null;

    title = 'RDF Mérleg';
    incomingStream = new Subscription();
    outgoingStream = new Subscription();
    weightStream = new Subscription();
    weight = 0;
    incomingSrc = 'assets/image/back1.jpg';
    outgoingSrc = 'assets/image/back2.jpg';
    barstate = 'open';

    constructor(private streamService: StreamService, private auth: AuthService) {}

    openGate() {
        this.barstate = 'open';
        // this.WeightService.openGate();
    }

    closeGate() {
        this.barstate = 'closed';
        // this.WeightService.closeGate();
    }

    signOut() {
        this.auth.logout();
    }

    ngOnInit() {
        this.weightStream = this.streamService.getWeight().subscribe((weight) => {
            this.weight = weight;
        });
    }

    ngAfterViewInit(): void {
        if (this.str1 && this.str2) {
            const image1 = new Image();
            const image2 = new Image();
            const canv1 = this.str1.nativeElement;
            const canv2 = this.str2.nativeElement;
            const ctx1 = canv1.getContext('2d');
            const ctx2 = canv2.getContext('2d');

            ctx1.lineWidth = '4';
            ctx1.strokeStyle = 'green';
            ctx2.lineWidth = '4';
            ctx2.strokeStyle = 'green';

            image1.onload = () => {
                ctx1.drawImage(
                    image1,
                    0,
                    0,
                    image1.width,
                    image1.height,
                    0,
                    0,
                    canv1.width,
                    canv1.height
                );
            };

            image2.onload = () => {
                ctx2.drawImage(
                    image2,
                    0,
                    0,
                    image2.width,
                    image2.height,
                    0,
                    0,
                    canv2.width,
                    canv2.height
                );
            };

            this.incomingStream = this.streamService.getIncoming().subscribe((incoming) => {
                this.incomingSrc = incoming;
                image1.src = incoming;
            });
            this.outgoingStream = this.streamService.getOutgoing().subscribe((outgoing) => {
                this.outgoingSrc = outgoing;
                image2.src = outgoing;
            });
        }
    }

    ngOnDestroy(): void {
        this.incomingStream.unsubscribe();
        this.outgoingStream.unsubscribe();
        this.weightStream.unsubscribe();
    }
}
