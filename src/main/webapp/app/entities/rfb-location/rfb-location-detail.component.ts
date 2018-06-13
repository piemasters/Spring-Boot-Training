import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RfbLocation } from './rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
    selector: 'jhi-rfb-location-detail',
    templateUrl: './rfb-location-detail.component.html'
})
export class RfbLocationDetailComponent implements OnInit, OnDestroy {

    rfbLocation: RfbLocation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rfbLocationService: RfbLocationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRfbLocations();
    }

    load(id) {
        this.rfbLocationService.find(id)
            .subscribe((rfbLocationResponse: HttpResponse<RfbLocation>) => {
                this.rfbLocation = rfbLocationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRfbLocations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rfbLocationListModification',
            (response) => this.load(this.rfbLocation.id)
        );
    }
}
